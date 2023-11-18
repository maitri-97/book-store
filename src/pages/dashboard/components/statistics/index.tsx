import { useContext, useEffect, useRef, useState } from "react";
import AppSearch from "../../../../components/AppSearch";
import StatisticsSection from "./components/StatisticsSection";
import { BooksDataContext } from "../../../../context/BooksDataContext";
import { BookDetailsDataType } from "../../../../types";

const Statistics = () => {
  const { data } = useContext(BooksDataContext);
  let searchData: any = useRef();
  const [bestSellerData, setBestSellerData] = useState<BookDetailsDataType[]>(
    []
  );
  const [favData, setFavData] = useState<BookDetailsDataType[]>([]);

  useEffect(() => {
    setBestSellerData(data);
    searchData.current = data || [];
  }, [data]);

  useEffect(() => {
    const favDataVal: BookDetailsDataType[] = bestSellerData?.filter(
      (dataItem) => dataItem?.fav === true
    );
    setFavData(favDataVal);
  }, [bestSellerData]);

  return (
    <>
      <div className="statistics-page">
        <div className="w-950px">
          <AppSearch data={searchData?.current} setData={setBestSellerData} placeholder={"What books would you like to find?"} />
        </div>
        <StatisticsSection
          title="New York Times Bestsellers"
          data={bestSellerData}
          link="/books-list"
        />
        <StatisticsSection
          title="Favourites"
          data={favData}
          link="/favourites"
        />
      </div>
    </>
  );
};

export default Statistics;
