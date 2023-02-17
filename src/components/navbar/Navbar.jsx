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

import { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

function Navbar() {
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const [isFullscreenEnabled, setIsFullScreenEnabled] = useState(false);

  const { darkMode, dispatch } = useContext(DarkModeContext);

  const requestFullScreen = () => {
    !!document.fullscreenElement
      ? document.exitFullscreen()
      : document.body.requestFullscreen();
  };

  useEffect(() => {
    document.onfullscreenchange = () => {
      setIsFullScreenEnabled(!!document.fullscreenElement);
    };
    return () => (document.onfullscreenchange = undefined);
  }, []);

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
              <LightModeIcon titleAccess="light" className="icon" />
            ) : (
              <DarkModeOutlinedIcon titleAccess="dark" className="icon" />
            )}
          </div>
          <div onClick={requestFullScreen} className="item">
            {isFullscreenEnabled ? (
              <FullscreenExitOutlinedIcon
                titleAccess="exit fullscreen"
                className="icon"
              />
            ) : (
              <FullscreenIcon titleAccess="fullscreen" className="icon" />
            )}
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon
              titleAccess="notifications"
              className="icon"
            />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon
              titleAccess="messages"
              className="icon"
            />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item" title="profile">
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
