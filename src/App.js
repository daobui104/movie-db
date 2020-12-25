import React, { Component } from "react";
import "./styles.css";
import FilmDetails from "./FilmDetails";
import FilmListing from "./FilmListing";
import TMDB from "./TMDB";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      films: [],
      faves: [],
      current: {},
      cast: []
    };
  }

  componentDidMount() {
    let page = 1;
    let totalPages = 1;

    for (page = 1; page <= totalPages; page++) {
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB.api_key}&page=${page}`
      )
        .then((response) => {
          return response.json();
        })
        .then((now) => {
          console.log(now);
          this.setState({
            films: [...this.state.films, ...now.results]
          });
          if (totalPages === 1) {
            totalPages = now.total_pages;
          }
          console.log("during: " + totalPages);
        })
        .catch((ex) => {
          console.log(ex);
        });

      console.log("after - page: " + page);
      console.log("after - totalPages: " + totalPages);
    }
    console.log("final: " + totalPages);
  }

  getEnMovies(films) {
    for (let i = 0; i < films.length; i++) {
      if (films[i].original_language !== "en") {
        films.splice(i, 1);
      }
    }
    return films;
  }

  handleFaveToggle = (film) => {
    //const faves = this.state.faves.slice();
    const faves = [...this.state.faves];
    const filmIndex = faves.indexOf(film);
    if (filmIndex >= 0) {
      faves.splice(filmIndex, 1);
    } else {
      faves.push(film);
    }
    this.setState({ faves });
  };

  handleDetailsClick = (film) => {
    //console.log(`Fetching details for ${film.title}`);
    const movieUrl = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    const castUrl = `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${TMDB.api_key}`;
    fetch(movieUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ current: data });
      });

    fetch(castUrl)
      .then((response) => {
        return response.json();
      })
      .then((actor) => {
        this.setState({ cast: actor.cast });
      });
  };
  render() {
    return (
      <div className="film-library">
        <FilmListing
          films={this.getEnMovies(this.state.films)}
          faves={this.state.faves}
          onFaveToggle={this.handleFaveToggle}
          handleDetailsClick={this.handleDetailsClick}
        />
        <FilmDetails film={this.state.current} cast={this.state.cast} />
      </div>
    );
  }
}

export default App;
