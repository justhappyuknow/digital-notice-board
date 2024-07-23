import React, { useEffect } from 'react';

const Music = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.dataset.useServiceCore = '';
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <div className="elfsight-app-0d9aa21d-2779-4326-9e00-7539b3d0f73b " data-elfsight-app-lazy></div>
        </>
    );
};

export default Music;
