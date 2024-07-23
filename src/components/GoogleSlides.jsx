import React from 'react';

const GoogleSlides = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Google Slides</h2>
            <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vT9n-dSeZ_Gv75NiRIoIDpScgCyJvCnyLMLaZ01aElfxXXamDsWa0YqpmfE4GSPWg_Dz7O-NrZ6Gglj/embed?start=false&loop=false&delayms=3000"
                frameBorder="0"
                width="255"
                height="300"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default GoogleSlides;
