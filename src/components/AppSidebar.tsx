import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* import images */
import StatisticsIcon from "../../src/assets/images/svg/statistics.svg";
import StatisticsHoverIcon from "../../src/assets/images/svg/statistics-h.svg";
import FavouriteIcon from "../../src/assets/images/svg/heart.svg";
import FavouriteHoverIcon from "../../src/assets/images/svg/heart-h.svg";
import SettingIcon from "../../src/assets/images/svg/setting.svg";
import SettingHoverIcon from "../../src/assets/images/svg/setting-h.svg";

const AppSidebar = () => {
  const location = useLocation();
  const [activeList, setActiveList] = useState("");

  useEffect(() => {
    ["favourites"].includes(location?.pathname?.split("/")[1])
      ? setActiveList("favourites")
      : setActiveList("statistics");
  }, [location]);

  return (
    <>
      <aside className="app-sidebar">
        <ul className="sidebar-menu">
          <li>
            <Link
              to={"/statistics"}
              className={`menu-link ${
                activeList === "statistics" ? "active" : ""
              }`}
            >
              <i className="icon-wrap stats">
                <img src={StatisticsIcon} alt="" className="normal-img" />
                <img src={StatisticsHoverIcon} alt="" className="hover-img" />
              </i>
            </Link>
          </li>
          <li>
            <Link
              to={"/favourites"}
              className={`menu-link ${
                activeList === "favourites" ? "active" : ""
              }`}
            >
              <i className="icon-wrap fav">
                <img src={FavouriteIcon} alt="" className="normal-img" />
                <img src={FavouriteHoverIcon} alt="" className="hover-img" />
              </i>
            </Link>
          </li>
          <li>
            <div className="menu-link">
              <i className="icon-wrap setting">
                <img src={SettingIcon} alt="" className="normal-img" />
                <img src={SettingHoverIcon} alt="" className="hover-img" />
              </i>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default AppSidebar;
