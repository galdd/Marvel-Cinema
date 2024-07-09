import { useDispatch, useSelector } from 'react-redux';
import { signoutUser, userSelector, clearState } from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './shows.scss';
import Moment from 'moment';
import PageHeader from '../../components/page-header/PageHeader';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router';
import { AppDispatch } from '../../redux/store';

const movies = gql`
  {
    Movies {
      id
      title
      desc
      img
      year
      chronologicalOrder
      length  
    }
  }
`;

const shows = gql`
  {
    Shows {
      id
      dateAndTIme
      price
      movieId
      ticketAmount
      isSoldOut
    }
  }
`;

const Shows = () => {
  const dispatch: AppDispatch = useDispatch();
  const onLogOut = async () => {
    await dispatch(signoutUser());
  };

  const [listShows, setListShows] = useState([]);
  const [listMovies, setListMovies] = useState([]);
  const [movie, setMovie] = useState<any>(null);

  const { movieid } = useParams();
  const navigate = useNavigate();

  const { data: showsData, error: showsError } = useQuery(shows);
  const { data: moviesData, error: moviesError } = useQuery(movies);

  useEffect(() => {
    const getShows = async () => {
      if (showsError) {
        console.error('Error fetching shows:', showsError.message);
      } else if (showsData && showsData.Shows) {
        console.log('Shows data:', showsData.Shows);
        setListShows(showsData.Shows);
      }
    };
    getShows();
  }, [showsData, showsError]);

  useEffect(() => {
    const getMovies = async () => {
      if (moviesError) {
        console.error('Error fetching movies:', moviesError.message);
      } else if (moviesData && moviesData.Movies) {
        console.log('Movies data:', moviesData.Movies);
        setListMovies(moviesData.Movies);
        setMovie(moviesData.Movies[0]?.id);
      }
    };
    getMovies();
  }, [moviesData, moviesError]);

  const handleSelect = (e: any) => {
    setMovie(e.target.value);
  };

  const handleShowSelect = (showId: string) => {
    navigate(`/seats/${showId}`, { state: { movieIdPage: movie } });
  };

  return (
    <>
      <PageHeader></PageHeader>
      <div className="shows">
        <div className="list-dropdown">
          <div className="show-item">
            <label>Choose a Movie</label>
            <select name="movieId" onChange={handleSelect}>
              {listMovies.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="show-item ">
            <label>Choose a Show</label>
            {listShows
              .filter((show: any) => show.movieId === movie)
              .map((item: any, I: any) => (
                <div key={I} className="flex-row-around show-border">
                  {Moment(item.dateAndTIme).format('H:mma MMMM do, yyyy ')}
                  <div>
                    <button
                      className="btn-shows"
                      onClick={() => handleShowSelect(item.id)}
                    >
                      Buy ticket
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shows;