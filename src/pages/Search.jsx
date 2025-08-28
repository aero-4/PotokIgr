import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CONFIG } from '../../config.js';
import Lenta from "../components/Lenta.jsx";
import Loader from "../components/Loader.jsx";

export default function Search() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!q && !q.trim().length <= 0) {
            setGames([]);
            return;
        }
        setLoading(true);
        fetch(`${CONFIG.API_URL}/games/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: q, limit: 40, offset: 0 }),
        })
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [q]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <div>
            {!loading && games.length === 0 && <p>Ничего не найдено</p>}

            <Lenta games={games}/>
        </div>
    );
}
