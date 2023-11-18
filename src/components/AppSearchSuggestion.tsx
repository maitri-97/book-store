import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BookDetailsDataType } from "../types";
import CustomRowCard from "./CustomRowCard";

interface Props {
  data: BookDetailsDataType[];
  setActiveSuggestion: Dispatch<SetStateAction<boolean>>;
}

const AppSearchSuggestion: FC<Props> = ({ data, setActiveSuggestion }) => {
  const [suggestionData, setSuggestionData] = useState<BookDetailsDataType[]>();

  useEffect(() => {
    setTimeout(() => {
      setSuggestionData(data);
    }, 100);
  }, [data]);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setActiveSuggestion(false);
    });
  }, []);

  return (
    <>
      <div className="suggestions-block">
        {suggestionData && suggestionData?.length > 0 ? (
          suggestionData?.map((dataItem: BookDetailsDataType, idx: number) => {
            const { title, author, price, fav, id, rating, list_name_encoded } =
              dataItem;
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
          <p className="no-record-found">No Records Found</p>
        )}
      </div>
    </>
  );
};

export default AppSearchSuggestion;
