import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      data: ""
    };

    // this.removeMovie = this.removeMovie.bind(this);
  }
  componentDidMount() {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}&region=ru`
    )
      .then(response => {
        console.log("response", response);
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        console.log("page", data.page);

        this.setState({
          movies: data.results,
          data: data
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.page !== this.state.page
    ) {
      fetch(
        `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}&region=ru`
      )
        .then(response => {
          console.log("response", response);
          return response.json();
        })
        .then(data => {
          console.log("data", data);
          console.log("page", data.page);

          this.setState({
            movies: data.results,
            data: data
          });
        });
    }
  }

  updatePage = value => {
    this.setState({
      page: value
    });
  };

  // previousPage = () => {
  //   const reducePageNumber = this.state.page;
  //   this.setState({
  //     page: reducePageNumber - 1
  //   });
  //   this.componentDidMount();
  // };

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(item => {
      return item.id !== movie.id;
    });
    this.setState({
      movies: updateMovies
    });
    this.removeMovieFromWillWatch(movie);
  };

  addMovieToWillWatch = movie => {
    // console.log(movie);
    // this.state.moviesWillWatch.push(movie);
    // const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    // updateMoviesWillWatch.push(movie);

    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };
  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(item => {
      return item.id !== movie.id;
    });

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

  render() {
    // console.log("App this", this.state.movies[1].title);
    // console.log(this.updatePage);
    console.log(this.state.page);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 mb-4">
            <MovieTabs
              sort_by={this.state.sort_by}
              updateSortBy={this.updateSortBy}
              page={this.state.page}
              updatePage={this.updatePage}
              data={this.state.data}
            />
          </div>
          <MovieList
            movies={this.state.movies}
            appThis={this}
            addMovieToWillWatch={this.addMovieToWillWatch}
            removeMovieFromWillWatch={this.removeMovieFromWillWatch}
            removeMovie={this.removeMovie}
          />
          <div className="col-4 col-sm-3 mt-4">
            <h4>
              Will Watch: {this.state.moviesWillWatch.length}
              <br /> movies
            </h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p> {movie.title} </p>
                    <p> {movie.vote_average} </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class MovieList extends React.Component {
  render() {
    const {
      movies,
      appThis,
      removeMovieFromWillWatch,
      removeMovie,
      addMovieToWillWatch
    } = this.props;
    // console.log("MovieList movies", movies, removeMovie);
    return (
      <div className="col-8 col-sm-9">
        <div className="row">
          {movies.map(movie => {
            return (
              <div
                className="offset-1 col-10 offset-sm-0 col-sm-6 mt-4"
                key={movie.id}
              >
                <MovieItem
                  movie={movie}
                  removeMovie={removeMovie}
                  appThis={appThis}
                  addMovieToWillWatch={addMovieToWillWatch}
                  removeMovieFromWillWatch={removeMovieFromWillWatch}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// function App() {
//   return <div>Hello React !</div>;
// }

export default App;
