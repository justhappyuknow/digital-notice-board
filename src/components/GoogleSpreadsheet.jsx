import React from 'react';

const GoogleSpreadsheet = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Google Spreadsheet</h2>
            <iframe
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp5X38JL0Qy0oQC3BAEFAwbi86KsDFeeFd3Eoqs1a_kX3E1O_D0_PygotcJ3cl-_SVQIw_IjFiaxCC/pubhtml"
                frameBorder="0"
                width="100%"
                height="300"
                className="rounded-lg"
                allowFullScreen
            ></iframe>

        </div>
    );
};

export default GoogleSpreadsheet;
