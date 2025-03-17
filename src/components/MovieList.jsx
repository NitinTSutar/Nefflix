import React, { useRef } from "react";
import MovieCart from "./MovieCart";

const MovieList = ({ title, movies }) => {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

    return (
        movies && (
            <div className="pl-6 relative">
                <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
                <div className="flex items-center">
                    <button
                        className="absolute left-0 z-10 bg-black/50 text-white p-2 rounded-full"
                        onClick={scrollLeft}
                    >
                        {'<'}
                    </button>
                    <div
                        className="flex overflow-x-scroll no-scrollbar"
                        ref={scrollContainerRef}
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        <div className="flex gap-6" >
                            {movies.map((movie) => (
                                <MovieCart
                                    key={movie.id}
                                    posterPath={movie.poster_path}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        className="absolute right-0 z-10 bg-black/50 text-white p-2 rounded-full"
                        onClick={scrollRight}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        )
    );
};

export default MovieList;
