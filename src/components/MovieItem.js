import React from "react";

class MovieItem extends React.Component {
  constructor() {
    super();

    this.state = {
      willWatch: false
    };
  }
  render() {
    const {
      movie,
      removeMovie,
      addMovieToWillWatch,
      removeMovieFromWillWatch
    } = this.props;

    

    // console.log("appThis", appThis, "single movie", movie);
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
            movie.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {movie.vote_average}</p>
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3">
            {/* {this.state.showInfo ? (
              <button
                type="button"
                className="btn btn-primary btn-sm mr-4"
                onClick={() => {
                  this.setState({
                    showInfo: !this.state.showInfo
                  });
                }}
              >
                Hide
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-sm mr-4"
                onClick={() => {
                  this.setState({
                    showInfo: !this.state.showInfo
                  });
                }}
              >
                Show
              </button>
            )} */}

            {this.state.willWatch ? (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.setState({
                    willWatch: false
                  });
                  removeMovieFromWillWatch(movie);
                }}
              >
                Remove Watch
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => {
                  this.setState({
                    willWatch: true
                  });
                  addMovieToWillWatch(movie);
                }}
              >
                Add Watch
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger btn-sm mx-2"
              //   onClick={ () => {console.log(this)} }
              onClick={() => removeMovie(movie)}
              //   onClick={removeMovie(this, movie) }
            >
              <span className="material-icons">delete_forever</span>
            </button>
          </div>
          {/* {this.state.showInfo ? (
            <p className="mt-3" style={{ color: "grey" }}>
              {movie.overview}
            </p>
          ) : null} */}
        </div>
      </div>
    );
  }
}

export default MovieItem;
