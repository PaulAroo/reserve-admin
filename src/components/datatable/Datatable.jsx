import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "../../axios/index";
import useFetch from "../../customHooks/useFetch";

function Datatable({ columns }) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [userList, setUserList] = useState([]);

  const { data, loading, err } = useFetch(`/${path}`);

  useEffect(() => {
    setUserList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setUserList(userList.filter((item) => item._id !== id));
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
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={userList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default Datatable;
