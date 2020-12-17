import React from "react";
import FilmPoster from "./FilmPoster";
import Fave from "./Fave";

function FilmRow(props) {
  return (
    <div
      className="film-row"
      onClick={() => props.handleDetailsClick(props.film.title)}
    >
      <FilmPoster film={props.film} />
      <div className="film-summary">
        <h1>{props.film.title}</h1>
        <p>{new Date(props.film.release_date).getFullYear()}</p>
        <br />
        <p>Vote Average: {props.film.vote_average}</p>
      </div>
      <Fave
        onFaveToggle={() => props.onFaveToggle(props.film)}
        isFave={props.isFave}
        film={props.film}
      />
    </div>
  );
}

export default FilmRow;
