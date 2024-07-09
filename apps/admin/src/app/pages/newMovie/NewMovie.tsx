import { useContext, useState, useEffect } from 'react';
import './newMovie.css';
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  chronologicalOrder: string;
  length: string;
  img: string;
  imgTitle: string;
  imgSm: string;
  trailer: string;
  video: string;
  movieIdPage: string; 
}

export default function NewMovie() {
  const [movie, setMovie] = useState<Partial<Movie>>({});
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/list/8207011?api_key=db7a63f80e96ea48c7fb6da56df9190d');
        setMoviesList(response.data.items);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSelect = (e: any) => {
    const selectedMovie = moviesList.find((m: Movie) => m.id === parseInt(e.target.value));
    if (selectedMovie) {
      setMovie({
        title: selectedMovie.title,
        overview: selectedMovie.overview,
        release_date: selectedMovie.release_date,
        chronologicalOrder: '',
        length: '',
        img: `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`,
        imgTitle: '',
        imgSm: '',
        trailer: '',
        video: '',
        movieIdPage: selectedMovie.id.toString(), 
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createMovie(movie, dispatch);
    navigate('/movies');
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="inputsSection">
          <div className="addProductItem">
            <label>Select Movie</label>
            <select onChange={handleSelect}>
              <option value="">Select a movie</option>
              {moviesList.map((movie: Movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="title"
              name="title"
              value={movie.title || ''}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              type="text"
              placeholder="description"
              name="overview"
              value={movie.overview || ''}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              name="release_date"
              value={movie.release_date ? movie.release_date.split('-')[0] : ''}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Chronological Order</label>
            <input
              type="text"
              placeholder="Chronological Order"
              name="chronologicalOrder"
              value={movie.chronologicalOrder || ''}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Length</label>
            <input
              type="text"
              placeholder="length"
              name="length"
              value={movie.length || ''}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Movie ID Page</label>
            <input
              type="text"
              placeholder="Movie ID Page"
              name="movieIdPage"
              value={movie.movieIdPage || ''}
              onChange={handleChange}
            />
          </div>
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className="imageSection">
          <label>Selected Movie Poster</label>
          {movie.img ? (
            <img src={movie.img} alt="Selected Movie Poster" />
          ) : (
            <div className="imagePlaceholder">Image Preview</div>
          )}
        </div>
      </form>
    </div>
  );
}