import React, { Component } from "react";
import FilmRow from "./FilmRow";

class FilmListing extends Component {
  state = {
    filt: "all"
  };

  handleFilterClick = (filter) => {
    //console.log(`Setting filter to ${filter}`);
    this.setState({
      filt: filter
    });
  };

  render() {
    const tempFilms =
      this.state.filt === "faves" ? this.props.faves : this.props.films;
    const displayFilms = tempFilms.map((film) => {
      return (
        <FilmRow
          film={film}
          onFaveToggle={() => this.props.onFaveToggle(film)}
          isFave={this.props.faves.includes(film)}
          key={film.id}
          handleDetailsClick={() => this.props.handleDetailsClick(film)}
        />
      );
    });

    return (
      <div className="film-list">
        <h1 className="section-title">NOW PLAYING</h1>
        <div className="film-list-filters">
          <div
            className={`film-list-filter ${
              this.state.filt === "all" ? "is-active" : ""
            }`}
            onClick={() => this.handleFilterClick("all")}
          >
            ALL
            <span className="section-count">{this.props.films.length}</span>
          </div>
          <div
            className={`film-list-filter ${
              this.state.filt === "faves" ? "is-active" : ""
            }`}
            onClick={() => this.handleFilterClick("faves")}
          >
            FAVES
            <span className="section-count">{this.props.faves.length}</span>
          </div>
        </div>
        {displayFilms}
      </div>
    );
  }
}

export default FilmListing;
