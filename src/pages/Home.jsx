import React, {useCallback, useEffect, useState} from 'react';
import {CONFIG} from "../../config.js";
import {useParams} from "react-router-dom";
import Lenta from "../components/Lenta.jsx";
import Loader from "../components/Loader.jsx";

function Home() {
    const {cat} = useParams()
    const [games, setGames] = useState([])
    const [offset, setOffset] = useState(0)
    const limit = 40;
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const fetchGames = useCallback(async () => {
        if (!hasMore || loading) return
        setLoading(true)
        try {
            let url = ""
            const body = {'limit': limit, 'offset': offset};
            if (cat) {
                body["cat"] = cat
                url = "/games/cat"
            }
            else {
                url = "/games/last"
            }
            const r = await fetch(CONFIG.API_URL + url,
                {method: "POST", headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)}
            )

            const data = await r.json()
            if (data.length < limit) {
                setHasMore(false)
            }
            setGames(prev => [...prev, ...data])
            setOffset(prev => prev + data.length)

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        fetchGames()
    }, [])

    useEffect(() => {
        function onScroll() {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore) {
                fetchGames()
            }
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)

    }, [fetchGames, hasMore])

    // if (loading) {
    //     return <Loader/>;
    // }

    return (
        <Lenta games={games}/>
    );
}

export default Home;