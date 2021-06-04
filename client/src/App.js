import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
import { BrowserRouter, BrowserRouter as Router, Link, Route } from "react-router-dom";

import SavedList from './Movies/SavedList';

function Home(props){
  return(
    <div>Home</div>
  )
}

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          console.log(response.data)
          setMovieList(response.data)
          setSaved(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <div>
      <SavedList list={[movieList]} />
        <Link to ="/">Home</Link>
        <Link to ='/movies/:id'>About</Link>
        <Route  exact path="/" render={() => <MovieList movies={movieList}/>} />
        <Route path="/about" component ={<Movie props={saved.id}/>} />

      <div>Replace this Div with your Routes</div>
    </div>
  );
}
