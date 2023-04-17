import React, { useState } from 'react';
import './pagesStyle.css';
import Newcamera from '../selfie/Newcamera';

function Pages() {
  const [activePage, setActivePage] = useState('page1'); // Set default active page
  
  const handleButtonClick = (page) => {
    setActivePage(page); // Update active page state
  }
  
  return (
    <>
      <div className='main'>
        <div className="sidebar">
          <button variant="primary" className={activePage === 'page1' ? 'active' : 'normal'} onClick={() => handleButtonClick('page1')}>
           1
          </button>
          <button variant="primary" className={activePage === 'page2' ? 'active' : 'normal'} onClick={() => handleButtonClick('page2')}>
           2
          </button>
          <button variant="primary" className={activePage === 'page3' ? 'active' : 'normal'} onClick={() => handleButtonClick('page3')}>
           3
          </button>
          <button variant="primary" className={activePage === 'page4' ? 'active' : 'normal'} onClick={() => handleButtonClick('page4')}>
           4
          </button>
          <button variant="primary" className={activePage === 'page5' ? 'active' : 'normal'} onClick={() => handleButtonClick('page5')}>
           5
          </button>
        </div>

        <div className="main-content">
          { activePage === 'page1' && <h1>Page 1</h1> }
          { activePage === 'page2' && <Newcamera /> }
          { activePage === 'page3' && <h1>Page 3</h1> }
          { activePage === 'page4' && <h1>Page 4</h1> }
          { activePage === 'page5' && <h1>Page 5</h1>}
        </div>
      </div>
    </>
  );
}

export default Pages;
