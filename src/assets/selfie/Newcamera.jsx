import React, {useRef, useState} from "react";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from '@tensorflow-models/coco-ssd';
import * as facemesh from '@tensorflow-models/facemesh';
import './cameraStyle.css';

const Newcamera = () => {

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [isPerson, setIsPerson] = useState(false);
    const [borderColor, setBorderColor] = useState('white');
    const [photoClicked, setPhotoClicked] = useState(false);
    const [testPredict, setTestPredict] = useState(0);
    const [testRatio, setTestRatio] = useState(0);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleButtonClick = async () => {
      setIsCameraOpen(true);

      tf.ready().then(() => {
        cocossd.load().then((model) => {
          const video = videoRef.current;
  
          navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video.play();
              detectObjects(model, video);
            };
          }).catch((err)=>{console.log(`Error accessing camera: ${err}`);});
        });
      });
    };

    const handleCaptureClick = () => {
        setIsCameraOpen(false);
        setBorderColor('red');
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL();
        setImageData(imageData);
    };

    const detectObjects = async (model, video) => {
        if(video.pause)setIsPerson(false);
        const predictions = await model.detect(video);
         // Detect if user is looking at the camera
         const faceLandmarksPredictions = await facemesh.load({ maxFaces: 1 }).then((model1) => {
          return model1.estimateFaces(video);
        });

        let pictureClicked = false;

        predictions.forEach((prediction) => {
          console.log(prediction.class, prediction.score.toFixed(2), faceLandmarksPredictions);
          if(prediction.class == 'person' && prediction.score >= 0.88 && faceLandmarksPredictions.length > 0){
            setIsPerson(true);
            setTestPredict(prediction.score.toFixed(2));
            const leftEye = faceLandmarksPredictions[0].annotations.leftEyeUpper0;
            const rightEye = faceLandmarksPredictions[0].annotations.rightEyeUpper0;
    
            const horizontalEyeDistance = Math.abs(leftEye[0][0] - rightEye[0][0]);
            const verticalEyeDistance = Math.abs(leftEye[3][1] - leftEye[0][1]);
    
            const aspectRatio = horizontalEyeDistance / (100*verticalEyeDistance);
            console.log(aspectRatio);
            setTestRatio(aspectRatio);
            if (aspectRatio >= 0.20 && aspectRatio <= 0.34) {
              setBorderColor('green');
              setPhotoClicked(true);
              handleCaptureClick();
              pictureClicked = true;
              console.log('Looking at camera', pictureClicked);
            } else {
              setBorderColor('red');
              console.log('Not looking at camera');
            }
          }
          else{
            setIsPerson(false); 
            setBorderColor('red');
          }
        });
        if(pictureClicked)return;
        else{requestAnimationFrame(() => detectObjects(model, video));}
    };
   
    return (
      <div>
        <button className="selfie-button" hidden={isCameraOpen || photoClicked} onClick={handleButtonClick}>Open Camera</button>
        <div hidden={!isCameraOpen} style={{ position: 'relative' }}>
          <video ref={videoRef}
          className={borderColor === 'green' ? 'video-frame-green' :'video-frame-red'}
          />
          {/* <button 
            disabled={!isPerson}
            className="capture-button"
            onClick={handleCaptureClick}>Capture Photo</button> */}
        </div>
        {/* {testPredict} + {testRatio} */}
        <canvas ref={canvasRef} style={{ display:'none' }} />
        {imageData && <img src={imageData} alt="Captured photo" />}
      </div>
    );
}

export default Newcamera;