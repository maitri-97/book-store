import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

/* import images */
import SearchIcon from "../assets/images/svg/search.svg";
import { BookDetailsDataType } from "../types";
import AppSearchSuggestion from "./AppSearchSuggestion";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  data: BookDetailsDataType[];
  setData: Dispatch<SetStateAction<BookDetailsDataType[]>>;
  placeholder?: string;
}

const AppSearch: FC<Props> = ({ data, setData, placeholder }) => {
  const [searchKeyword, setSearchkeyword] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<boolean>(false);
  const [suggestionData, setSuggestionData] =
    useState<BookDetailsDataType[]>(data);

  const [searchData, setSearchData] = useSearchParams({ book: "" });
  const searchVal = searchData.get("book") || "";

  const handleOnSearch = () => {
    if (setData) {
      setData(suggestionData || data);
    }
    if (searchVal?.length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
    setSearchkeyword(searchVal);
    setActiveSuggestion(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = searchVal;
    setSearchData({ book: e?.target?.value });
    const dataVal: BookDetailsDataType[] = data?.filter(
      (dataItem) =>
        dataItem?.title
          ?.toLowerCase()
          ?.includes(searchKeyword?.toLowerCase()) ||
        dataItem?.author?.toLowerCase()?.includes(searchKeyword?.toLowerCase())
    );
    setSuggestionData(dataVal);
    if (e?.target?.value?.length > 0) {
      setActiveSuggestion(true);
    } else {
      setActiveSuggestion(false);
    }
  };

  useEffect(() => {
    if (searchVal?.length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
    setSearchkeyword(searchVal);
    setActiveSuggestion(false);
  }, []);

  return (
    <>
      <div
        className={`app-search ${activeSuggestion ? "suggestions-active" : ""}`}
      >
        <div className="search-input-wrapper">
          <i className="search-icon">
            <img src={SearchIcon} alt="" />
          </i>
          <input
            type="text"
            className="search-input custom-input"
            placeholder={placeholder || "Search"}
            value={searchVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
          />
          <button
            type="button"
            className="search-btn"
            title="Search"
            onClick={handleOnSearch}
          >
            GO
          </button>
          {activeSuggestion && (
            <AppSearchSuggestion
              data={suggestionData}
              setActiveSuggestion={setActiveSuggestion}
            />
          )}
        </div>
        {searchActive && (
          <p className="search-val">
            showing search results for <span>"{searchKeyword}"</span>
          </p>
        )}
      </div>
    </>
  );
};

export default AppSearch;
