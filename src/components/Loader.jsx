import React from 'react';

const Loader = () => {
  return (
    <>
      <style>
        {`
            .luxora-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(6px);
                z-index: 9999;
            }

            .luxora-text {
                font-size: 3rem;
                font-weight: 700;
                text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: luxPulse 1.3s infinite ease-in-out;
            }
            @keyframes luxPulse {
                0% { opacity: 0.4; transform: scale(0.95); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: 0.4; transform: scale(0.95); }
            }
            `}

      </style>
      <div className='luxora-overlay d-flex justify-content-center align-items-center text-primary'>
        <h1 className='luxora-text'>Luxora</h1>
      </div>
    </>
  );
};

export default Loader;
