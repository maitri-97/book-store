import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import FavouriteButton from "../../../../components/FavouriteButton";
import { BookDetailsDataType } from "../../../../types";
import { BooksDataContext } from "../../../../context/BooksDataContext";
import BookTitleWithAuthor from "../../../../components/BookTitleWithAuthor";
import AppRatings from "../../../../components/AppRatings";
import StatisticsSection from "../statistics/components/StatisticsSection";

const BookDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { list_name_encoded } = location.state;
  const [bookDetailsData, setBookDetailsData] = useState<BookDetailsDataType>();
  const [booksFromSameAuthor, setBooksFromSameAuthor] =
    useState<BookDetailsDataType[]>();
  const [booksFromSameSeller, setBooksFromSameSeller] =
    useState<BookDetailsDataType[]>();
  const { data } = useContext(BooksDataContext);

  useEffect(() => {
    let targetBookData = data?.find((dataItem) => dataItem?.id === Number(id));
    setBookDetailsData(targetBookData);
    let books_by_category: BookDetailsDataType[] = data?.filter(
      (dataItem) => dataItem?.author === targetBookData?.author
    );
    setBooksFromSameAuthor(books_by_category);
    books_by_category = data?.filter(
      (dataItem) => dataItem?.list_name_encoded === list_name_encoded
    );
    setBooksFromSameSeller(books_by_category);
  }, [data, id]);

  useEffect(() => {
    const getScrollableDiv: HTMLElement | null = document.querySelector(
      ".main-wrap .content-wrap"
    );
    if (getScrollableDiv) {
      getScrollableDiv.scrollTop = 0;
    }
  }, [id]);

  return (
    <>
      {bookDetailsData && (
        <div className="book-details-page">
          <div className="top-wrapper">
            <div className="mobile-visible">
              <div className="rank-edit-wrap">
                <p className="rank">#{bookDetailsData?.rank}</p>
                <Link
                  to={`/edit-book-details/${bookDetailsData?.id}`}
                  className="btn text-btn"
                >
                  Edit
                </Link>
              </div>
              <BookTitleWithAuthor
                title={bookDetailsData?.title}
                author={bookDetailsData?.author}
              />
              <div className="ratings-fav-wrap">
                <AppRatings rating={Number(bookDetailsData?.rating)} />
                <FavouriteButton
                  fav={Boolean(bookDetailsData?.fav)}
                  id={Number(id)}
                />
              </div>
            </div>
            <div className="img-wrap">
              <img src={bookDetailsData?.book_image} alt="" />
            </div>
            <div className="details-wrapper">
              <div className="rank-edit-wrap">
                <p className="rank">#{bookDetailsData?.rank}</p>
                <Link
                  to={`/edit-book-details/${bookDetailsData?.id}`}
                  className="btn text-btn"
                >
                  Edit
                </Link>
              </div>
              <div className="content-wrapper">
                <div className="ratings-fav-wrap">
                  <AppRatings rating={Number(bookDetailsData?.rating)} />
                  <FavouriteButton
                    fav={Boolean(bookDetailsData?.fav)}
                    id={Number(id)}
                  />
                </div>
                <BookTitleWithAuthor
                  title={bookDetailsData?.title}
                  author={bookDetailsData?.author}
                />
                <p>{bookDetailsData?.description}</p>
                <p>
                  <span className="label">Price:&nbsp;</span>&#163;&nbsp;
                  {bookDetailsData?.price}
                </p>
                <p className="seller">
                  <span className="label">Seller:&nbsp;</span>
                  {list_name_encoded?.split("-").join(" ")}
                </p>
                <p>
                  <span className="label">Publisher:&nbsp;</span>
                  {bookDetailsData?.publisher}
                </p>
                {bookDetailsData?.buy_links && (
                  <div className="buy-now">
                    <span className="label">Buy Now:&nbsp;</span>
                    {bookDetailsData?.buy_links?.map((linkItem, idx) => {
                      return (
                        <Link
                          to={linkItem?.url}
                          reloadDocument
                          target="_blank"
                          className="btn text-btn"
                          title={linkItem?.url}
                          key={idx}
                        >
                          {linkItem?.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <StatisticsSection
            title={`More from ${bookDetailsData?.author}`}
            data={booksFromSameAuthor?.slice(0, 3)}
            link={`/books-list/author/${bookDetailsData?.author}`}
          />
          <StatisticsSection
            title={`More from ${list_name_encoded?.split("-").join(" ")}`}
            data={booksFromSameSeller?.slice(0, 3)}
            link={`/books-list/seller/${bookDetailsData?.list_name_encoded}`}
          />
        </div>
      )}
    </>
  );
};

export default BookDetails;
