import { useContext, useEffect, useState } from 'react';
import './newShow.css';
import { createShow, getShows } from '../../context/showContext/apiCalls';
import { ShowContext } from '../../context/showContext/ShowContext';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../../context/movieContext/apiCalls';

export default function NewShow() {
  const [show, setShow] = useState<any>(null);
  const navigate = useNavigate();
  const { dispatch: showDispatch } = useContext(ShowContext);
  const { movies, dispatch: movieDispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(movieDispatch);
  }, [movieDispatch]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setShow({ ...show, [e.target.name]: value });
  };

  const handleSelect = (e: any) => {
    const value = Array.from(e.target.selectedOptions, (option: any) => option.value);
    setShow({ ...show, [e.target.name]: value.join() });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newShow = await createShow(show, showDispatch);
    console.log('New show created:', newShow);
    navigate('/shows');
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Show</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Date and Time</label>
            <input
              type="datetime-local"
              placeholder="dateAndTIme"
              name="dateAndTIme"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              type="number"
              placeholder="0"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Ticket Amount</label>
            <input
              type="number"
              placeholder="0"
              name="ticketAmount"
              onChange={handleChange}
            />
          </div>

        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Movie</label>
            <select
              multiple
              name="movieId"
              onChange={handleSelect}
              style={{ height: '280px' }}
            >
              {movies.map((movie: any) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}