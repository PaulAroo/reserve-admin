export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone",
    sortable: false,
    width: 150,
  },

  {
    field: "country",
    headerName: "Country",
    width: 130,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "featured",
    headerName: "Featured",
    width: 70,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 70,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
