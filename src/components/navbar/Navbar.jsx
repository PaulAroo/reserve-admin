import "./navbar.scss";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useEffect } from "react";

function Navbar() {
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const [isFullscreenEnabled, setIsFullScreenEnabled] = useState(false);

  const { darkMode, dispatch } = useContext(DarkModeContext);

  const requestFullScreen = () => {
    const isInFullscreen = !!document.fullscreenElement;
    isInFullscreen
      ? document.exitFullscreen()
      : document.body.requestFullscreen();

    setIsFullScreenEnabled((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className={`search ${searchInputFocus ? "b-shadow" : ""}`}>
          <input
            onFocus={() => setSearchInputFocus(true)}
            onBlur={() => setSearchInputFocus(false)}
            type="text"
            placeholder="Search..."
          />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
            {darkMode ? (
              <LightModeIcon className="icon" />
            ) : (
              <DarkModeOutlinedIcon className="icon" />
            )}
          </div>
          <div onClick={requestFullScreen} className="item">
            {isFullscreenEnabled ? (
              <FullscreenExitOutlinedIcon className="icon" />
            ) : (
              <FullscreenIcon className="icon" />
            )}
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://i.ibb.co/xGWh0Ry/profile.jpg"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
