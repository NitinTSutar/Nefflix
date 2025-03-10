import React from "react";
import MovieCart from "./MovieCart";

const MovieList = ({ title, movies }) => {

    return (
        movies && (<div className="pl-6">
            <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
            <div className="flex overflow-x-scroll no-scrollbar">
                <div className="flex gap-6 ">
                    {movies.map((movie) => (
                        <MovieCart
                            key={movie.id}
                            posterPath={movie.poster_path}
                        />
                    ))}
                </div>
            </div>
        </div>)
    );
};

export default MovieList;
