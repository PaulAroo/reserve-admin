import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../customHooks/useFetch";
import { roomColumns } from "../../datatablesource";
import "./roomlisting.scss";

function RoomListing() {
  const [roomList, setRoomList] = useState([]);
  const { data, loading, err } = useFetch("/rooms");

  useEffect(() => {
    setRoomList(data);
  }, [data]);

  const handleDelete = async (roomId, hotelId) => {
    try {
      await axios.delete(`/rooms/${roomId}/${hotelId}`);
      setRoomList(roomList.filter((item) => item._id !== roomId));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      cellClassName: "actionCol",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <button className="viewButton">View</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id, params.row.hotelId)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="roomlist">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Rooms
            <Link to={"/rooms/new"} className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={roomList}
            columns={roomColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomListing;
