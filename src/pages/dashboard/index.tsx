import { useEffect, useState } from "react";
import { BooksDataContext } from "../../context/BooksDataContext";
import { BookDetailsDataType } from "../../types";
import { getStorageData, setStorageData } from "../../services/general";
import { getBooksData } from "../../services/getBooksData";
import { Outlet } from "react-router";

const Dashboard = () => {
  const [bestSellerData, setBestSellerData] = useState<BookDetailsDataType[]>(
    []
  );

  useEffect(() => {
    let bestseller_data: BookDetailsDataType[] = [];
    let getDataFromStorage = getStorageData("data");
    (async () => {
      if (getDataFromStorage?.length > 0) {
        bestseller_data = JSON.parse(getDataFromStorage);
      } else {
        let bestSellerLists = await getBooksData();
        bestSellerLists = bestSellerLists?.lists?.map((list: any) => {
          return {
            ...list,
            books: list?.books?.map((book: BookDetailsDataType[]) => {
              return { ...book, list_name_encoded: list?.list_name_encoded };
            }),
          };
        });
        let bsList: BookDetailsDataType[] = [];
        bestSellerLists?.map((list: any) => {
          bsList = [...bsList, ...list?.books];
          return null;
        });
        bestseller_data = bsList?.sort(
          (book1: BookDetailsDataType, book2: BookDetailsDataType) =>
            book1?.rank - book2?.rank
        );
        bestseller_data = bestseller_data?.map((item: any, index) => {
          return !(bestseller_data?.indexOf(item?.title) < 0)
            ? null
            : { ...item };
        });
        bestseller_data = bestseller_data?.map((data: any, idx: number) => {
          return { ...data, fav: false, id: idx, rating: 0 };
        });
        let updatedBestSeller_data: any = [];
        for (let i = 0; i < bestseller_data?.length; i++) {
          updatedBestSeller_data = updatedBestSeller_data?.find(
            (dataItem: any) => dataItem?.title === bestseller_data[i]?.title
          )
            ? [...updatedBestSeller_data]
            : [...updatedBestSeller_data, bestseller_data[i]];
        }
        bestseller_data = updatedBestSeller_data;
      }
      setStorageData("data", JSON.stringify(bestseller_data));
      setBestSellerData(bestseller_data);
    })();
  }, []);

  return (
    <>
      <BooksDataContext.Provider
        value={{ data: bestSellerData, setData: setBestSellerData }}
      >
        <div className="container">
          <Outlet />
        </div>
      </BooksDataContext.Provider>
    </>
  );
};

export default Dashboard;
