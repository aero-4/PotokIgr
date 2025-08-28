import React, {useEffect, useState} from 'react';
import {CONFIG} from "../../config.js";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import likePng from "../assets/like.png";
import dislikePng from "../assets/dislike.png";
import sendPng from "../assets/send.png"

function getFormattedNow() {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

function Comments({game}) {
    const [error, setError] = useState("")
    const [textComm, setTextComm] = useState("")
    const [comms, setComms] = useState([])

    let sub = null;
    if (Cookies.get('access_token')) {
        sub = jwtDecode(Cookies.get('access_token')).sub
    }

    async function newCommentHandler() {
        setError("")

        if (textComm.trim().length < 5) {
            setError("Напишите комментарий больше 5 символов")
            return
        }
        try {
            const date = getFormattedNow()
            const res = await fetch(`${CONFIG.API_URL}/comments/new`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, credentials: 'include',
                body: JSON.stringify({'user': sub, 'game_id': game.id, "text": textComm, "value": 0, "date": date}),
            });
            const data = await res.json();

            if (data.detail === "Not authorization") {
                setError("Вы не авторизованы. Чтобы пиcать комментарии нужно авторизоваться")
                return;
            } else if (res.status === 401 && data.detail === "Access token expired") {
                setError('Перезайдите из аккаунта')
                return
            } else if (res.status === 400) {
                setError('Не спамьте пожалуйста')
                return
            }

            setComms(prev => [{
                'id': data.comm.id,
                'user': sub, 'text': textComm, "value": 0, "date": date
            }, ...prev])

        } catch (err) {
            console.error('Network or parsing error:', err);
            setError('Неизвестная ошибка')
        }
    }


    async function likeHandler(act, comm) {
        setError("")
        try {
            const newValue = act === "plus"
                ? comm.value + 1
                : comm.value - 1;
            const res = await fetch(`${CONFIG.API_URL}/comments/like`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, credentials: 'include',
                body: JSON.stringify({'id': comm.id, "value": newValue}),
            });
            const data = await res.json();

            if (data.detail === "Not authorization") {
                setError("Вы не авторизованы.")
                return;
            } else if (res.status === 401 && data.detail === "Access token expired") {
                setError('Перезайдите из аккаунта')
                return
            }

            if (data.msg === "ok") {
                setComms(prev =>
                    prev.map(c =>
                        c.id === comm.id
                            ? {...c, value: newValue}
                            : c
                    )
                );
            }


        } catch (err) {
            console.error('Network or parsing error:', err);
            setError('Неизвестная ошибка')
        }
    }

    useEffect(() => {
        let isMount = false

        async function lastCommentsHandler() {

            try {
                const res = await fetch(`${CONFIG.API_URL}/comments/last`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'game_id': game.id}),
                });

                const data = await res.json();
                setComms(data)

            } catch (err) {
                console.error('Network or parsing error:', err);
            }
        }

        lastCommentsHandler()

        return () => {
            isMount = true
        }
    }, []);


    return (
        <div className="flex flex-col gap-2 bg-white/4 p-2">
            <h1 className="text-2xl">Комментарии</h1>
            {error && <span className="text-red-600">{error}</span>}

            <div className="flex flex-col">
                <div className="flex flex-row gap-3">
                    <textarea className="w-full h-30 p-4 rounded" onChange={(e) => setTextComm(e.target.value)}></textarea>
                    <button className="small_buttons text-sm" onClick={newCommentHandler}>
                        Отправить
                    </button>
                </div>


                <div className="flex flex-col gap-5 p-3">
                    {comms.length === 0 && (<span className="text-center text-xl text-gray-300">Оставьте первый комментарий!</span>)}
                    {comms
                        .map((comm, idx) => (
                            <div key={idx} className="flex flex-row gap-2 p-3 bg-black/10">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm">{comm.user}</p>
                                    <h1 className="whitespace-pre-wrap break-all w-full">{comm.text}</h1>
                                    <div className="flex flex-row gap-3 justify-start items-center ">
                                        <button id={comm.id} className="small_buttons rounded-full"
                                                onClick={() => likeHandler("plus", comm)}>
                                            <img src={likePng} alt="like" className="w-4 h-4"/>
                                        </button>
                                        <p className={comm.value <= 0 ? 'text-red-400' : 'text-green-400'}>{comm.value}</p>

                                        <button id={comm.id} className="small_buttons rounded-full"
                                                onClick={() => likeHandler("minus", comm)}>
                                            <img src={dislikePng} alt="dislike" className="w-4 h-4"/>
                                        </button>
                                    </div>

                                </div>
                                <p className="ml-auto">{comm.date}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Comments;