import React from 'react';
import ThemeSwitcher from "./ThemeSwitcher.jsx";

function UserMenu({sub}) {
    return (
        <div className="flex flex-row gap-1 items-center">
            <h1>{sub}</h1>
            <a className="small_buttons"
               href="/logout">Выйти
            </a>
        </div>
    );
}

export default UserMenu;
