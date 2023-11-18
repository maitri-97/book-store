import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

/* import images */

import ActiveRating from "../assets/images/svg/star-fill.svg";
import Rating from "../assets/images/svg/star.svg";

interface Props {
  rating?: number;
  editable?: boolean;
  setRatings?: Dispatch<SetStateAction<any>>;
}

const AppRatings: FC<Props> = ({
  rating = 0,
  editable = false,
  setRatings = () => {},
}) => {
  const [activeRating, setActiveRating] = useState<number>(0);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  const handleOnClick = (e: React.MouseEvent<HTMLElement>, item = 0) => {
    if (editable === true) {
      setActiveRating(item + 1);
      setRatings(item + 1);
    }
  };

  return (
    <>
      <div className={`app-ratings ${editable ? "editable" : ""}`}>
        {Array?.from(Array(activeRating).keys())?.map((item, idx) => {
          return (
            <i className="rating-icon" onClick={(e) => handleOnClick(e, item)} key={idx}>
              <img src={ActiveRating} alt="" />
            </i>
          );
        })}
        {Array?.from(Array(5 - activeRating).keys())?.map((item, idx) => {
          return (
            <i
              className="rating-icon"
              onClick={(e) => handleOnClick(e, activeRating + item)}
              key={idx}
            >
              <img src={Rating} alt="" />
            </i>
          );
        })}
      </div>
    </>
  );
};

export default AppRatings;
