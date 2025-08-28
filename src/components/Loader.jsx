import React from 'react';

function Loader() {
    return (
        <div className="flex items-center justify-center w-full h-full mx-auto my-auto">
            <div className="w-8 h-8 border-4 border-t-transparent border-gray-300 border-solid rounded-full animate-spin transition ease-linear"></div>
        </div>
    );
}

export default Loader;