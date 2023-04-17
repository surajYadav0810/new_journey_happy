import React, { useRef, useState } from "react"
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from '@tensorflow-models/coco-ssd';

const Camera = () => {

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [imageData, setImageData] = useState(null);
    // const [prediction, setPrediction] = useState(null);
    const [isPerson, setIsPerson] = useState(false);
    const [borderColor, setBorderColor] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleButtonClick = async () => {
        setIsCameraOpen(true);
    //   try {
    //     // Get access to the camera
    //     const video = videoRef.current;
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
    //     // Attach the stream to the video element
    //     video.srcObject = stream;
    //     video.play();
    //   } catch (error) {
    //     console.error(error);
    //   }

      tf.ready().then(() => {
        cocossd.load().then((model) => {
          const video = videoRef.current;
  
          navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video.play();
              detectObjects(model, video);
            };
          });
        });
      });
    };

    const handleCaptureClick = () => {
        setIsCameraOpen(false);
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
        const imageData = canvasRef.current.toDataURL();
        setImageData(imageData);

        // const decodeAndPredict = async () => {
        //     const image = new Image();
        //     image.src = imageData;
        //     await image.decode();
          
        //     const loadedModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

        //     const tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
        //     const prediction = await loadedModel.predict(tensor).data();
        //     console.log(prediction[0]);
        //     setPrediction(prediction[0] > 0.5 ? 'Live person' : 'Object');
        // }
        // decodeAndPredict();
    };

    const detectObjects = async (model, video) => {
        if(video.pause)setIsPerson(false);
        const predictions = await model.detect(video);

        predictions.forEach((prediction) => {
          console.log(prediction.class, prediction.score.toFixed(2));
          if(prediction.class == 'person' && prediction.score >= 0.85){
            setIsPerson(true);
            setBorderColor('green');
          }
          else{
            setIsPerson(false); 
            setBorderColor('red');
          }
        });
        requestAnimationFrame(() => detectObjects(model, video));
    };
   
    return (
      <div>
        <button hidden={isCameraOpen} onClick={handleButtonClick}>Open Camera</button>
        <div hidden={!isCameraOpen} style={{ position: 'relative' }}>
          <video ref={videoRef}
           style={{
            borderRadius:'50%',
            border: `3px solid ${borderColor}`,
            boxShadow: `0px 0px 15px ${borderColor}`,
            width: '500px',
            height: '500px',
            objectFit: 'cover'
            }} />
          <button 
            disabled={!isPerson}
            style={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '10px',
                borderRadius: '40%',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.2)',
            }} 
            onClick={handleCaptureClick}>Capture Photo</button>
        </div>
        <canvas ref={canvasRef} style={{ display:'none' }}></canvas>
        {imageData && <img src={imageData} alt="Captured photo" />}
        {/* {prediction && <p>Prediction: {prediction}</p>} */}
      </div>
    );
}

export default Camera;