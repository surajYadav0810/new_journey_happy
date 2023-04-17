
// import React, { useState } from 'react';
// import './home3.scss'

// function Home3() {
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [showCheckIcon, setShowCheckIcon] = useState(false);
  
//   function handleArrowClick() {
//     const arrowIcon = document.querySelector('.material-icons');
    
//     if (arrowIcon.textContent === 'check') {
//       return;
//     }
    
//     setIsAnimating(true);

//     const activeStep = document.querySelector('.step.active');
//     activeStep.classList.add('sliding-out');

//     const nextStep = activeStep.nextElementSibling;
//     nextStep.classList.add('sliding-in');

//     nextStep.addEventListener('animationend', () => {
//       activeStep.classList.remove('active', 'sliding-out');
//       activeStep.classList.add('previous');
//       nextStep.classList.remove('next', 'sliding-in');
//       nextStep.classList.add('active');

//       setIsAnimating(false);

//       if (!nextStep.nextElementSibling) {
//         setShowCheckIcon(true);
//       } else {
//         nextStep.nextElementSibling.classList.add('next');
//       }
//     });
//   }
  
//   return (
//     <div className="vertical-form-container">
//       <div className="vertical-form">
//         <div className="step active">
//           <div className="title">Let's start</div>
//           <div className="content">
//             ...by saying that you're awesome
//           </div>
//         </div>
//         <div className="step step-2 next">
//           <div className="title">Inspirational lorem</div>
//           <div className="content">
//             ..is more than just ipsum
//           </div>
//         </div>
//         <div className="step step-3">
//           <div className="title">It's done</div>
//           <div className="content">Have a fantastic day</div>
//           <div></div>
//         </div>
//         <i className={`material-icons ${isAnimating ? 'animating' : ''}`} onClick={handleArrowClick}>
//           {showCheckIcon ? 'check' : 'arrow_downward'}
//         </i>
//       </div>
//     </div>
//   );
// }

// export default Home3;




import React, { useState } from 'react';
import './home3.scss'
import Newcamera from '../selfie/Newcamera';
import LoanDetails from '../tnc/Loandetails';

function Home3() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const steps = [
    {
      id: 1,
      title: "Let's start",
      content: "...by saying that you're awesome",
      className: "step active"
    },
    {
      id: 2,
      title: "Click Selfie",
      content: <Newcamera/>,
      className: "step step-2 next"
    },
    {
      id: 3,
      title: "",
      content: "",
      className: "step step-3",
      tnc:{


        content: <LoanDetails/>
        



      }
    },
    {
      id: 4,
      title: "It's done",
      content: "Have a fantastic day",
      className: "step step-3"
    }
  ];

  function handleArrowClick() {
    if (showCheckIcon) {
      return;
    }

    setIsAnimating(true);

    const activeStep = document.querySelector('.step.active');
    activeStep.classList.add('sliding-out');

    const nextStep = activeStep.nextElementSibling;
    nextStep.classList.add('sliding-in');

    nextStep.addEventListener('animationend', () => {
      activeStep.classList.remove('active', 'sliding-out');
      activeStep.classList.add('previous');
      nextStep.classList.remove('next', 'sliding-in');
      nextStep.classList.add('active');

      setIsAnimating(false);

      if (!nextStep.nextElementSibling) {
        setShowCheckIcon(true);
      } else {
        nextStep.nextElementSibling.classList.add('next');
      }
    });
  }

  return (
    <div className="vertical-form-container">
      <div className="vertical-form">
        {steps.map(step => (
          <div key={step.id} className={step.className}>
            <div className="title">{step.title}</div>
            <div className="content">{step.content}</div>
            <div>{step.tnc? <div className='tnc-page'>
                  <div className='amount-approved'>
                    {step.tnc.content}
                  </div>
            </div>:<></>}</div>
          </div>
        ))}
        <i
          className={`material-icons ${isAnimating ? 'animating' : ''}`}
          onClick={handleArrowClick}
        >
          {showCheckIcon ? 'check' : 'arrow_downward'}
        </i>
      </div>
    </div>
  );
}

export default Home3;
