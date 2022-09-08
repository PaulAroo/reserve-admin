import "./newhotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import { hotelInputs } from "../../formSource";

import useFetch from "../../customHooks/useFetch";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function NewHotel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [hotelInfo, setHotelInfo] = useState({
    featured: false,
  });

  const imagesAreSelected = !!files.length;

  // const { data, loading } = useFetch("/rooms");

  const handleRoomSelection = (e, newValue) => {
    const rooms = newValue.map((room) => room._id);
    setHotelInfo((prev) => ({ ...prev, rooms }));
  };

  const handleChange = (e) => {
    setHotelInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imgList = await Promise.all(
        files.map(async (file) => {
          const imgData = new FormData();
          imgData.append("file", file);
          imgData.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/starthrills/image/upload",
            imgData
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHotel = {
        ...hotelInfo,
        photos: imgList,
      };

      const res = await axiosInstance.post("/hotels", newHotel);
      navigate("/hotels");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  // const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div className="newHotel">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {imagesAreSelected ? (
              <div className="imgWrapper">
                {files.map((file, index) => (
                  <img src={URL.createObjectURL(file)} key={index} alt="" />
                ))}
              </div>
            ) : (
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
                style={{ margin: "0 auto" }}
              />
            )}
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label className="imgLabel" htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  required
                  multiple
                  accept="image/*"
                  type="file"
                  id="file"
                  onChange={(e) => setFiles(Object.values(e.target.files))}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    id={input.id}
                    name={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="form_featured">
                <FormLabel id="featured">Featured</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="featured"
                  name="featured"
                  value={hotelInfo.featured}
                  defaultValue={hotelInfo.featured}
                  onChange={handleChange}
                  className="mui_rad"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio required />}
                    label="Yes"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio required />}
                    label="No"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </div>
              {/* <div className="roomChoices">
                <Autocomplete
                  limitTags={2}
                  multiple
                  id="rooms"
                  openOnFocus
                  options={data}
                  disableCloseOnSelect
                  className="mui_autocomplete"
                  onChange={handleRoomSelection}
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 4 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField fullWidth {...params} label="Rooms" />
                  )}
                />
              </div> */}
              <button
                disabled={!imagesAreSelected}
                className="subbtn"
                type="submit"
              >
                {loading ? "submitting" : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewHotel;
