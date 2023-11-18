import { useContext, useEffect, useRef, useState } from "react";
import AppSearch from "../../../../components/AppSearch";
import { BooksDataContext } from "../../../../context/BooksDataContext";
import { BookDetailsDataType } from "../../../../types";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import CustomRowCard from "../../../../components/CustomRowCard";

const BooksList = () => {
  let { data } = useContext(BooksDataContext);
  let routerParams = useParams();
  let location = useLocation();
  let searchData: any = useRef();
  const [booksData, setBooksData] = useState<BookDetailsDataType[]>([]);
  const [searchDataVal] = useSearchParams({ book: "" });
  const searchVal = searchDataVal.get("book") || "";
  const [title, setTitle] = useState<string>("New York Times Bestsellers");

  useEffect(() => {
    console.log(location);
    let dataVal: any = data?.filter(
      (dataItem) =>
        dataItem?.title?.toLowerCase()?.includes(searchVal?.toLowerCase()) ||
        dataItem?.author?.toLowerCase()?.includes(searchVal?.toLowerCase())
    );
    let titleVal = title;
    if (["favourites"].includes(location?.pathname?.split("/")[1])) {
      dataVal = dataVal?.filter(
        (itm: BookDetailsDataType) => itm?.fav === true
      );
      titleVal = `Favourites`;
    }
    if (routerParams?.seller !== undefined) {
      dataVal = dataVal?.filter(
        (itm: BookDetailsDataType) =>
          itm?.list_name_encoded === routerParams?.seller
      );
      titleVal = `From Seller ${routerParams?.seller?.split("-").join(" ")}`;
    }
    if (routerParams?.author !== undefined) {
      dataVal = dataVal?.filter(
        (itm: BookDetailsDataType) => itm?.author === routerParams?.author
      );
      titleVal = `From Author ${routerParams?.author}`;
    }
    setTitle(titleVal);
    setBooksData(dataVal);
    searchData.current = data || [];
  }, [data, location?.pathname]);

  return (
    <>
      <div className="dashboard-inner-page w-950px">
        <h2 className="section-title">{title}</h2>
        <AppSearch data={searchData?.current} setData={setBooksData} />
        {booksData && booksData?.length > 0 ? (
          booksData?.map((books_data, idx) => {
            const { title, author, price, fav, id, rating, list_name_encoded } =
              books_data;
            return (
              <CustomRowCard
                key={idx}
                title={title}
                author={author}
                price={price}
                fav={fav}
                id={id}
                rating={rating}
                list_name_encoded={list_name_encoded}
              />
            );
          })
        ) : (
          <p>No Records Found.</p>
        )}
      </div>
    </>
  );
};

export default BooksList;
