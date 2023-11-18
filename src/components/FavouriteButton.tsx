import React, { FC, useContext } from "react";

/* import images */
import FavouriteIcon from "../assets/images/svg/heart.svg";
import FavouriteIconActive from "../assets/images/svg/heart-fill.svg";
import { BooksDataContext } from "../context/BooksDataContext";
import { setStorageData } from "../services/general";

interface Props {
  id: number;
  fav: boolean;
  disable?: boolean;
}

const FavouriteButton: FC<Props> = ({ fav, id, disable = false }) => {
  const { data, setData } = useContext(BooksDataContext);

  const handleFavouriteButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    let dataVal = data?.map((dataItem) => {
      return dataItem?.id === id
        ? { ...dataItem, fav: dataItem?.fav === true ? false : true }
        : { ...dataItem };
    });
    setData(dataVal);
    setStorageData("data", JSON.stringify(dataVal));
  };

  return (
    <i
      className={`favourite-btn ${disable ? "disable" : ""}`}
      onClick={(e: React.MouseEvent<HTMLElement>) =>
        handleFavouriteButtonClick(e)
      }
    >
      <img src={!fav ? FavouriteIcon : FavouriteIconActive} alt="" />
    </i>
  );
};

export default FavouriteButton;
