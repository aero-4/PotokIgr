import React from 'react';
import downloadPng from "../assets/download.png";

function Torrents({game}) {
    const handleDownload = (e) => {
        e.preventDefault()
        window.open(game.torrent[0].magnet, '_blank', 'noopener,noreferrer')
    };


    return (
        <div className="text-xl flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-3">
                <button onClick={handleDownload}
                        className="big_buttons bg-green-600">{`Скачать игру`}
                </button>
                <button className="big_buttons bg-blue-600 hover:bg-blue-600/90"
                        onClick={() => document.location.href = "https://www.utorrent.com/"}>Скачать Torrent
                </button>
            </div>

            {game.torrent.map((item) => (
                <div className="flex flex-row gap-2 text-sm items-center w-full h-full bg-green-400/10 rounded-lg shadow p-3" key={item.id}>
                    <img src={downloadPng} alt="" className="w-4"/>
                    <div>
                        <p className="whitespace-pre-wrap">{item.name}</p>
                        <p>{item.file_size} | Раздают: {item.seeders}</p>
                    </div>
                    <div className="ml-auto">
                        <button className="small_buttons text-sm flex flex-row"
                                onClick={() => document.location.href = item.magnet}>
                            Скачать
                        </button>
                    </div>

                </div>
            ))}

        </div>
    );
}

export default Torrents;