import React, { useState } from 'react';
import noImageJpg from "../assets/no-image.jpg";
import nextPng from "../assets/next.png";

function SimilarGames({ simGames }) {
    const [start, setStart] = useState(0);
    const length = 5;
    const visible = simGames.slice(start, start + length);

    function prev() {
        setStart(s => Math.max(s - 1, 0));
    }

    function next() {
        setStart(s => Math.min(s + 1, simGames.length - length));
    }

    return (
        <div className="relative flex flex-col gap-4 items-center duration-500">
            <h1 className="text-2xl">Похожие игры:</h1>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 overflow-hidden justify-center">
                {visible.map(game => (
                    <a
                        href={`/games/${game.slug}`}
                        key={game.id}
                        className="flex flex-col gap-2 my-2 hover:opacity-90"
                    >
                        <img
                            src={game.background_image || noImageJpg}
                            className="object-cover rounded-xl w-50 h-50"
                            loading="lazy"
                        />
                        <h1 className="text-sm text-center w-full">{game.title}</h1>
                    </a>
                ))}
            </div>

            <div className="flex flex-row gap-1 justify-center">
                <button
                    onClick={prev}
                    disabled={start === 0}
                    className="small_buttons disabled:opacity-50"
                >
                    <img src={nextPng} alt="Prev" className="rotate-180 w-4"/>
                </button>
                <button
                    onClick={next}
                    disabled={start >= simGames.length - length}
                    className="small_buttons disabled:opacity-50"
                >
                    <img src={nextPng} alt="Next" className="w-4"/>
                </button>

            </div>
        </div>
    );
}

export default SimilarGames;
