import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function MovieDetailsLink(movie) {
    const { isAuthenticated } = useContext(AuthContext);
    const link = "/movies/" + movie.id;

    return (
        <>
            <style type="text/css">
                {`
                    .movie-link {
                        text-decoration: initial !important;
                    }
                `}
            </style>
            {isAuthenticated ?
                (<a className="movie-link" href={link} title={movie.title}>{movie.title} ({movie.year})</a>)
                : (<span>{movie.title} ({movie.year})</span>)
            }
        </>
    );
}

export default MovieDetailsLink;
