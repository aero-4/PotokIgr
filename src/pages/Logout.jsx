import React from 'react';
import {CONFIG} from "../../config.js";
import Cookies from "js-cookie";

function Logout() {

    async function handleLogout() {
        try {
            const r = await fetch(CONFIG.API_URL + "/auth/logout", {
                method: "POST", headers: {'Content-Type': 'application/json'}, credentials: "include"
            })
            Object.keys(Cookies.get()).forEach((name) => {
                Cookies.remove(name, { path: '/' });
            });
            document.location.href = "/"
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="justify-center mx-auto items-center">
            <h1 className="text-xl">Вы действительно хотите Выйти?</h1>
            <div className="flex flex-row gap-4 mx-auto items-center">
                <a className="small_buttons" href="/">Отмена</a>
                <button className="small_buttons text-red-500" onClick={handleLogout}>Выйти</button>
            </div>

        </div>
    );
}

export default Logout;