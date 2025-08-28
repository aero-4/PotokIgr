import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CONFIG} from '../../config.js';
import Comments from "../widgets/Comments.jsx";
import Torrents from "../components/Torrents.jsx";
import noImageJpg from "../assets/no-image.jpg";
import Loader from "../components/Loader.jsx";
import BigPhotoCarusel from "../widgets/BigPhotoCarusel.jsx";
import downloadPng from "../assets/download.png";
import SimilarGames from "../components/SimilarGames.jsx";

export default function Game() {
    const {plug} = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(null)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchGame() {
            setLoading(true);
            try {
                const response = await fetch(`${CONFIG.API_URL}/games/game/${plug}`, {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                const data = await response.json();
                setGame(data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err);
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchGame();

        return () => controller.abort();
    }, [plug]);

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Ошибка: {error}</div>;
    }

    if (!game) {
        return <div className="p-4">Игра не найдена.</div>;
    }


    return (
        <div className="flex flex-col gap-6 my-6 shadow-xl rounded p-2">
            <div className="text-left flex flex-col md:flex-row gap-6">
                <img
                    className="w-full md:w-1/3 rounded shadow"
                    src={game.background_image || noImageJpg}
                    alt={game.title}
                />
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-medium">{game.title}</h2>
                    <p className="text-gray-400">Дата выхода: {game.release_date}</p>
                    <p className="text-gray-400">Жанр: {game.genre}</p>
                    <p className="text-gray-400">Платформа: {game.platform}</p>
                    <p className="text-gray-400">Оценка: {game.metacritic}</p>
                </div>

            </div>
            <h1 className="whitespace-pre-wrap w-auto text-left text-sm md:text-2sm">{game.description}</h1>

            <div className="w-full flex flex-row gap-4 overflow-x-scroll items-center">

                {game.screens.map((g, ind) => (
                    <img src={g} alt="screen" className="w-80"
                         onClick={() =>
                             setModal(<BigPhotoCarusel photos={game.screens} ind={ind} onClose={() => setModal(false)}/>
                             )}/>
                ))}
            </div>

            {game.torrent && game.torrent.length > 0 ? (
                <Torrents game={game}/>
            ) : (
                <a className="text-center text-xl p-1 justify-center
                              items-center text-red-300 my-auto mx-auto" href="/">
                    Репак еще не загружен либо не взломан :(
                </a>
            )}

            <SimilarGames simGames={game.similar_games}/>
            <Comments game={game}/>

            {modal && modal}
        </div>
    );
}
