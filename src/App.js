import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
// Render: componentWillMount() -> render() -> componentDidMount()
// Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  /*
  componentWillMount() {
    console.log('will mount')
  }

  componentDidMount(){
    console.log('did mount');
  }*/
  
  state ={
 
  }

  componentDidMount(){
   
    this._getMovies();
   
  }
//react 와 내 자체의 기능에 차이를 두기위해 _를 사용
  _renderMovies = ()  =>  {
   const movies = this.state.movies.map( (movie ) => {
      console.log(movie)
      return <Movie 
      title ={movie.title_english}
      poster = {movie.medium_cover_image} 
      genres = {movie.genres}  
      synopsis = {movie.synopsis}
      key={movie.id} />
     })
     return movies
  }
//async function
   _getMovies = async () => {
   const movies = await this._callApi();
   this.setState({
     movies
   })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log('err',err))
  }

  render() {
   // console.log('did render');
   const { movies } = this.state;

    return (
      <div className={movies ? "App" : "App--loading"}>
          {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
