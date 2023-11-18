import React from "react";

/* import images */

import Logo from "../assets/images/svg/logo.svg";
import ProfileImg from "../assets/images/profile-img.png";

const AppHeader = () => {
  return (
    <>
      <header className="app-header">
        <div className="profile-img-block">
          <i className="profile-img-wrap">
            <img src={ProfileImg} alt="" />
          </i>
        </div>
        <div className="menu-wrap">
          <div className="logo-block">
            <span className="logo-wrap">
              Book <span>Store</span>
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
