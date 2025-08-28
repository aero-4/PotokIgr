import React from 'react';
import noImageJpg from "../assets/no-image.jpg"


function Lenta({games}) {
    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 items-center
        mx-auto my-auto justify-center">
            {games.map(game => (
                <a href={"/games/" + game.slug}
                   key={game.id}
                   className="my-6 hover:opacity-90">

                    <img src={game.background_image || noImageJpg}
                         className="object-cover rounded w-200 h-55"
                         alt={game.title}
                         loading="lazy"
                    />

                    <h1 className="text-xl text-center">{game.title}</h1>
                </a>
            ))}
        </div>
    );
}

export default Lenta;