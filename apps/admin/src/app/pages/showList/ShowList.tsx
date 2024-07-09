import './showList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ShowContext } from '../../context/showContext/ShowContext';
import { deleteShow, getShows } from '../../context/showContext/apiCalls';
import { useNavigate } from 'react-router-dom';

export default function ShowList() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [remove, setRemove] = useState(false);
  const { shows, dispatch } = useContext<any>(ShowContext);

  useEffect(() => {
    getShows(dispatch);
  }, [dispatch, remove]);

  const handleDelete = (id: any) => {
    deleteShow(id, dispatch);
    setRemove(!remove);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'dateAndTIme', headerName: 'Date and Time', width: 250 },
    { field: 'ticketAmount', headerName: 'Ticket Amount', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Link
              to={{ pathname: '/shows/' + params.row.id }}
              state={{ show: params.row }}
            >
              <button className="productShowEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productShowDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const rows = shows.map((show: any) => ({
    id: show.id,
    dateAndTIme: show.dateAndTIme,
    ticketAmount: show.ticketAmount,
    price: show.price,
  }));

  console.log('Shows data:', rows);

  return (
    <div className="productShow">
      <div className="productTitleContainer product">
        <h1 className="productTitle">Show List</h1>
        <Link to="/newShow">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        pagination
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
}