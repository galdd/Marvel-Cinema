import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../redux/userSlice';
import { gql, useQuery } from '@apollo/client';
import './order.scss';
import Moment from 'moment';
import QRCode from 'qrcode.react';
import { Modal, Box } from '@mui/material';
import { AppDispatch } from '../../redux/store';
import PageHeader from '../../components/page-header/PageHeader';

interface Movie {
  id: string;
  title: string;
  desc: string | null;
  img: string;
  chronologicalOrder: number | null;
  length: number | null;
  year: number | null;
  movieIdPage: string; // Add this field
}

interface Show {
  id: string;
  dateAndTIme: string;
  price: number;
  movieId: string;
  movie: Movie;
  ticketAmount: number;
  isSoldOut: boolean | null;
}

interface Ticket {
  id: string;
  showId: string;
  seatId: number;
  isTaken: boolean;
  show: Show;
}

interface Order {
  id: string;
  userId: string;
  ticketId: string;
  status: string;
  ticket: Ticket;
}

const query = gql`
  {
    orders {
      id
      userId
      ticketId
      status
      ticket {
        id
        showId
        seatId
        isTaken
        show {
          id
          dateAndTIme
          price
          movieId
          movie {
            id
            title
            desc
            img
            chronologicalOrder
            length
            year
            movieIdPage
          }
          ticketAmount
          isSoldOut
        }
      }
    }
  }
`;

const Order = () => {
  const dispatch: AppDispatch = useDispatch();
  const onLogOut = async () => {
    await dispatch(signoutUser());
  };

  const [lists, setLists] = useState<Order[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);

  const { data, loading, error } = useQuery(query);

  useEffect(() => {
    if (data) {
      console.log('Fetched Orders:', data.orders);
      setLists(data.orders);
    }
  }, [data]);

  const handleQrClick = (orderId: string) => {
    setSelectedQrCode(orderId);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedQrCode(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching orders:', error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <PageHeader />
      <div className="order">
        <div className="menu-list">
          <div className="menu-head selected">
            <a>Summary</a>
          </div>
          <div className="menu-head">
            <a>Profile</a>
          </div>
        </div>
        <div className="list-container">
          {lists && lists.length > 0 ? (
            lists.map((item, i) => (
              <div key={i} className="list-card">
                <div className="list-label">{item.ticket.show.movie.title}</div>
                <img
                  src={item.ticket.show.movie.img}
                  alt={item.ticket.show.movie.title}
                />
                <div className="list-details">
                  <div className="list-name">Marvel Movies</div>
                  <button
                    className="list-callback"
                    onClick={() =>
                      window.location.href = `http://localhost:4200/movie/${item.ticket.show.movie.movieIdPage}`
                    }
                  >
                    Movie Page
                  </button>
                  <div className="list-landmark">
                    {item.ticket.show.movie.desc}
                  </div>
                  <div className="list-location">
                    Chronological Order:{' '}
                    <span className="section-sub3">
                      {item.ticket.show.movie.chronologicalOrder}
                    </span>
                  </div>
                  <div className="list-location">
                    Ticket Id:{' '}
                    <span className="section-sub3">{item.ticket.id}</span>
                  </div>
                  <div className="list-bottom">
                    <div className="list-bottom-section">
                      <span className="section-title">Date-Time</span>
                      <span className="section-sub1">
                        {Moment(item.ticket.show.dateAndTIme).format('H:mma')}
                      </span>
                      <span className="section-sub2">
                        {Moment(item.ticket.show.dateAndTIme).format(
                          'MMMM Do, YYYY ',
                        )}
                      </span>
                    </div>
                    <div className="list-bottom-section">
                      <span className="section-title">Price</span>
                      <span className="section-sub1">
                        {item.ticket.show.price}$
                      </span>
                      <span className="section-sub2"></span>
                    </div>
                    <div className="list-bottom-section">
                      <span className="section-title">Seat</span>
                      <span className="section-sub1">{item.ticket.seatId}</span>
                      <span className="section-sub2"></span>
                    </div>
                    <div className="list-bottom-section">
                      <span className="section-title">Qr Code</span>
                      <div className="qr-code" onClick={() => handleQrClick(item.id)}>
                        <QRCode value={item.id} size={64} />
                      </div>
                      <span className="section-sub2"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
        <Modal open={modalOpen} onClose={handleClose}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 1,
                boxShadow: 3,
              }}
            >
              {selectedQrCode && <QRCode value={selectedQrCode} size={256} />}
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Order;