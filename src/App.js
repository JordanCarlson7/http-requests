import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // could also be async and await to replace .then's.
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://http-requests-tutorial-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_data,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
   const response = await fetch(
      "https://http-requests-tutorial-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); const data = await response.json();
    console.log(data)
  }
  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;


  /* SINGLE RANDOM ACTIVITY CALL */
  // const singleRandomHandler = useCallback(async () => {
  //   try {
  //     const response = await fetch(singleRandom);
  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await response.json();

  //     const transformedData = {
  //       activity: data.activity,
  //       type: data.type,
  //       participants: data.participants,
  //       price: data.price,
  //       link: data.link,
  //       key: data.key,
  //       accessibility: data.accessibility,
  //     };
  //     activities.push(transformedData);
  //     setActivities(activities);
      
  //     console.log(activities);
  //   } catch (error) {}
  // }, []);

  // /* MULTI RANDOM ACTIVITY CALL */
  // const multiRandomHandler = () => {
  //   for (let i = 0; i < 40; i++) {
  //     singleRandomHandler();
  //   }
  // };

  // useEffect(() => {
  //   singleRandomHandler();
  // }, [singleRandomHandler, activities]);

  // let [activities, setActivities] = useState([{
  //   activity: "Patronize a local independent restaurant",
  //   type: "recreational",
  //   participants: 1,
  //   price: 0.2,
  //   link: "",
  //   key: "5319204",
  //   accessibility: 0.1,
  // }]);

