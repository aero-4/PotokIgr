
import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import logo from "../assets/logo.png"
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import UserMenu from "../components/UserMenu.jsx";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import UpButton from "../buttons/Up.jsx";

export default function Layout() {
    const [searchValue, setSearchValue] = useState("")
    let sub = null;

    if (Cookies.get('access_token')) {
        sub = jwtDecode(Cookies.get('access_token')).sub
    }
    function onChangeHandler(event) {
        setSearchValue(event.target.value);
    }

    function onKeyDownHandler(event) {
        if (event.key !== 'Enter') return;

        const trimmed = searchValue.trim();
        if (!trimmed) return;

        window.location.href = `/search?q=${encodeURIComponent(trimmed)}`;
    }
    
    function checkSearchValue(e) {
        if (!searchValue.trim().length <= 0) {
            alert('Вы ничего не ввели')
            return
        }

        window.document.location.href = `/search?q=${searchValue}`
    }

    return (
        <div className="px-2
                        sm:px-5
                        md:px-10
                        lg:px-30
                        xl:px-80
                        2xl:px-100">
            <div className="flex flex-row p-2">
                <a href="/" className="flex flex-row items-center">
                    <img src={logo} alt="" className="w-8 h-8"/>
                    <h1 className="text-3xl">ПотокИгр</h1>
                </a>
            </div>

            <div className="flex flex-row gap-2 bg-green-700/10 p-2">
                <div className="flex flex-row w-full max-w-xl gap-2 items-center">
                    <input type="text" className="input"
                           placeholder="Найти игру"
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}/>
                    <button className="small_buttons items-center flex"
                            onClick={checkSearchValue}>
                        Поиск
                    </button>
                </div>
                {!sub ? (<a className="small_buttons ml-auto" href="/login">Вход</a>)
                      : (<a className="small_buttons ml-auto" href="/logout">Выйти</a>)}
            </div>

            <div className="flex flex-row gap-3 flex-wrap mt-1.5 text-black text-center">
                <a href="/cat/New" className="category">Новые</a>
                <a href="/cat/Action" className="category">Аркады</a>
                <a href="/cat/Platformer" className="category">Платформер</a>
                <a href="/cat/Adventure" className="category">Приключения</a>
                <a href="/cat/Shooter" className="category">Шутеры</a>
                <a href="/cat/Indie" className="category">Инди</a>
                <a href="/cat/Massively Multiplayer" className="category">Мультиплеер</a>
                <a href="/cat/Strategy" className="category">Стратегия</a>
                <a href="/cat/RPG" className="category">РПГ</a>
                <a href="/cat/Casual" className="category">Казуальные</a>
            </div>

            <div className="flex flex-col min-h-screen">
                <main className="flex-1 overflow-auto">
                    <Outlet/>
                </main>
                <div className="mx-auto text-center flex flex-col gap-4 text-sm">
                    <h1>Скачать любые игры бесплатно</h1>

                    <div className="flex gap-2">
                        <a href="https://t.me/aerodevs">Telegram</a>
                        <span>All Rights Reserved @2025</span>
                    </div>
                </div>

                <ThemeSwitcher/>
                <UpButton/>
            </div>


        </div>
    );
}

