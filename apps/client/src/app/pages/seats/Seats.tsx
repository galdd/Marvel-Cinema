import { useDispatch } from 'react-redux';
import { signoutUser } from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import './seats.scss';
import Moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../redux/store';
import PageHeader from '../../components/page-header/PageHeader';

interface Ticket {
  id: string;
  showId: string;
  seatId: number;
  isTaken: boolean;
  isChecked?: boolean;
}

const query = gql`
  query Tickets($showId: ID!) {
    Tickets(showId: $showId) {
      id
      showId
      seatId
      isTaken
    }
  }
`;

const mutation = gql`
  mutation CreateOrder($ticketId: String!, $movieIdPage: String!) {
    createOrder(ticketId: $ticketId, movieIdPage: $movieIdPage) {
      id
      userId
      status
      ticketId
      movieIdPage
    }
  }
`;

const Seats = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { showid } = useParams<{ showid: string }>();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { data, loading, error } = useQuery(query, {
    variables: { showId: showid },
  });

  const [addOrder, { data: orderData, loading: orderLoading, error: orderError }] =
    useMutation(mutation);

  useEffect(() => {
    if (data && data.Tickets) {
      const ticketsWithCheck = data.Tickets.map((ticket: Ticket) => ({
        ...ticket,
        isChecked: false,
      }));
      setTickets(ticketsWithCheck);
    }
  }, [data]);

  useEffect(() => {
    if (orderData) {
      navigate('/order');
    }
  }, [orderData, navigate]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === id && !ticket.isTaken) {
        ticket.isChecked = !ticket.isChecked;
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  const handleSubmit = async () => {
    const selectedTickets = tickets.filter((ticket) => ticket.isChecked).map((ticket) => ticket.id);
    const movieIdPage = 'someMovieId'; // אתה יכול להחליף את זה במידע המדויק
    if (selectedTickets.length > 0) {
      await addOrder({ variables: { ticketId: selectedTickets.join(','), movieIdPage } });
    } else {
      alert("Please select at least one ticket to proceed.");
    }
  };

  const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    arr.length > size
      ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
      : [arr];

  return (
    <>
      <PageHeader />
      <div className="seats">
        <div className="seats-up">
          <div className="movie-container">
            <p className="text">
              You have selected <span id="count">{tickets.filter((ticket) => ticket.isChecked).length}</span> seats for a price of $
              <span id="total">{tickets.filter((ticket) => ticket.isChecked).length * 10}</span>
            </p>
          </div>

          <ul className="showcase">
            <li>
              <div className="seat"></div>
              <small>N/A</small>
            </li>
            <li>
              <div className="seat selected"></div>
              <small>Selected</small>
            </li>
            <li>
              <div className="seat occupied"></div>
              <small>Occupied</small>
            </li>
          </ul>

          <div className="seats-container">
            <div className="screen"></div>
            {chunkArray(tickets, 8).map((ticketsSlice, i) => (
              <div key={i} className="row">
                <span
                  style={{
                    textAlign: 'center',
                    marginTop: '7px',
                    marginRight: '7px',
                    marginLeft: '-14px',
                  }}
                >
                  {i + 1}
                </span>
                {ticketsSlice.map((ticket, y) => (
                  <div
                    onClick={(e) => handleClick(e, ticket.id)}
                    key={`${i}-${y}`}
                    className={`seat ${ticket.isTaken ? 'occupied' : ''} ${ticket.isChecked ? 'selected' : ''}`}
                  >
                    <div style={{ textAlign: 'center', color: 'black' }}>
                      {y + 1}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="btn-shows" onClick={handleSubmit}>
            Buy tickets
          </button>
        </div>
      </div>
    </>
  );
};

export default Seats;