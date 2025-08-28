import React, {useState} from 'react';
import closePng from '../assets/close.png';
import nextPng from "../assets/next.png";
function BigPhotoCarusel({photos, ind = 0, onClose}) {
    const [index, setIndex] = useState(ind);

    function rightPhoto() {
        if (index < photos.length - 1) {
            setIndex(index + 1);
        }
    }

    function leftPhoto() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
            <button className="small_buttons absolute top-4 right-4 z-10" onClick={onClose}>
                <img src={closePng} alt="Close"/>
            </button>
            <button className="small_buttons absolute left-4 z-10" onClick={leftPhoto}>
                <img src={nextPng} alt="Left" className="rotate-180 w-4"/>
            </button>
            <button className="small_buttons absolute right-4 z-10" onClick={rightPhoto}>
                <img src={nextPng} alt="Right" className="w-4"/>
            </button>
            <div className="flex justify-center items-center w-full h-full">
                {photos.length > 0 && (
                    <img
                        src={photos[index]}
                        alt={`Photo ${index}`}
                        className="max-w-full max-h-full"
                        onClick={onClose}
                    />
                )}
            </div>
        </div>
    );
}

export default BigPhotoCarusel;
