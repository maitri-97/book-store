import React, { FC } from "react";

/*import images */
import BookIcon from "../assets/images/svg/book.svg";
import BookTitleWithAuthor from "./BookTitleWithAuthor";
import AppRatings from "./AppRatings";
import BookPrice from "./BookPrice";
import FavouriteButton from "./FavouriteButton";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  title: string;
  author: string;
  price: number;
  id: number;
  fav: boolean;
  rating: number;
  list_name_encoded: string;
}

const CustomRowCard: FC<Props> = ({
  title,
  author,
  price,
  fav,
  id,
  rating,
  list_name_encoded,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="custom-row-card cursor-pointer"
        onClick={() =>
          navigate(`/book-details/${id}`, { state: { list_name_encoded } })
        }
      >
        <div className="book-icon-title">
          <i className="book-icon">
            <img src={BookIcon} alt="" />
          </i>
          <BookTitleWithAuthor title={title} author={author} />
        </div>
        <AppRatings rating={rating} />
        <BookPrice price={price} />
        <div className="card-actions-wrap">
          <Link
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
              e.stopPropagation()
            }
            to={`/edit-book-details/${id}`}
            className="card-action"
            title="Edit"
          >
            Edit
          </Link>
          {/* <span
            className="card-action"
            title="Delete"
            onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
              e.stopPropagation()
            }
          >
            Delete
          </span> */}
        </div>
        <FavouriteButton fav={fav} id={id} />
      </div>
    </>
  );
};

export default CustomRowCard;
