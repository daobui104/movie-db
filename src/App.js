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
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB.api_key}&language=en-US&page=1`
    )
      .then((response) => {
        return response.json();
      })
      .then((top) => {
        //console.log(top);
        this.setState({
          films: top.results
        });
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  handleFaveToggle = (film) => {
    //const faves = this.state.faves.slice();
    const faves = [...this.state.faves];
    const filmIndex = faves.indexOf(film);
    if (filmIndex >= 0) {
      console.log(`removing ${film.title}`);
      faves.splice(filmIndex, 1);
    } else {
      faves.push(film);
      console.log(`adding ${film.title}`);
    }
    this.setState({ faves });
  };

  handleDetailsClick = (film) => {
    //console.log(`Fetching details for ${film.title}`);
    const url1 = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    const url2 = `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${TMDB.api_key}`;
    fetch(url1)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data); // Take a look at what you get back.
        this.setState({ current: data });
      });

    fetch(url2)
      .then((response) => {
        return response.json();
      })
      .then((actor) => {
        //console.log(actor.cast[0].name); // Take a look at what you get back.
        this.setState({ cast: actor.cast });
      });
  };
  render() {
    return (
      <div className="film-library">
        <FilmListing
          films={this.state.films}
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
