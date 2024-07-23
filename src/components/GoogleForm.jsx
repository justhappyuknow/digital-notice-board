import React from 'react';

const GoogleForm = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Google Form</h2>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdBpIRHFCRan09-Iit6twz56nqPr1QxineUj-Urx_18PkV4cA/viewform?embedded=true"
                width="270"
                height="300"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
            >
                Loading…
            </iframe>
        </div>
    );
};

export default GoogleForm;
