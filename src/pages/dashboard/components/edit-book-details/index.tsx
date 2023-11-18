import React, { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppRatings from "../../../../components/AppRatings";

/* import images */
import BackArrowIcon from "../../../../assets/images/svg/back-arrow.svg";
import { BooksDataContext } from "../../../../context/BooksDataContext";
import { setStorageData } from "../../../../services/general";

interface Props {
  bgUrl?: string;
}

const EditBookDetails: FC<Props> = ({ bgUrl }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useContext(BooksDataContext);
  const [formVal, setFormVal] = useState<any>({});

  useEffect(() => {
    if (id) {
      const formDataVal: any = data?.find((dataItem) => dataItem?.id === +id);
      setFormVal(formDataVal);
    }
  }, [id, data]);

  const handleOnChange = (event: React.ChangeEvent<any>) => {
    const inputValue = event?.target as any;
    setFormVal({
      ...formVal,
      [inputValue.name]: inputValue.value,
    });
  };

  const handleSubmit = (e:React.FormEvent<any>) => {
    e.preventDefault();
    if (id) {
      const dataVal = data?.map((dataItem) => {
        return dataItem?.id === +id
        
          ? { ...dataItem, price: +formVal?.price }
          : { ...dataItem };
      });
      setData(dataVal);
      setStorageData("data", JSON.stringify(dataVal));
      navigate(`/book-details/${id}`, {state: {list_name_encoded: formVal?.list_name_encoded}});
    }
  };

  const setFormRatings = (ratingVal: number) => {
    if (id) {
      const dataVal = data?.map((dataItem) => {
        return dataItem?.id === +id
          ? { ...dataItem, rating: ratingVal, price: +formVal?.price }
          : { ...dataItem };
      });
      setData(dataVal);
      setStorageData("data", JSON.stringify(dataVal));
    }
  };

  return (
    <>
      <div className="dashboard-edit-page w-1040px">
        <div
          className="cover-block"
          style={{ backgroundImage: `${bgUrl ? "url(" + bgUrl + ")" : ""}` }}
        >
          <h2 className="page-title">{formVal?.title}</h2>
        </div>
        <p className="section-title">Edit</p>
        <form className="custom-form" onSubmit={(e:React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <div className="input-wrapper">
            <span className="input-label">Cost</span>
            <input
              type="number"
              className="custom-input"
              name="price"
              value={formVal?.price}
              onChange={(e: React.FormEvent<HTMLInputElement>) => handleOnChange(e)}
              min={0}
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="input-label">Rating</span>
            <div className="custom-input rating-input">
              <AppRatings
                rating={formVal?.rating}
                editable={true}
                setRatings={setFormRatings}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn primary-btn"
            title="update"
          >
            update
          </button>
        </form>
        <Link
          className="back-to-link"
          to={"/favourites"}
          title="Return to Favourites"
        >
          <i className="back-arrow-icon">
            <img src={BackArrowIcon} alt="" />
          </i>
          Return to: <span>Favourites</span>
        </Link>
      </div>
    </>
  );
};

export default EditBookDetails;
