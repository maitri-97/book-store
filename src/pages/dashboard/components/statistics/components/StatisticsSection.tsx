import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Data {
  title: string;
  book_image: string;
  rank: number;
  id: number;
  list_name_encoded: string;
}

interface Props {
  title: string;
  link: string;
  data?: Data[] | null;
}

const StatisticsSection: FC<Props> = ({ title, data, link }) => {
  const navigate = useNavigate();
  return (
    <div className="statistics-section-wrapper">
      <h2 className="section-title-wrap">
        <Link to={link} className="section-title cursor-pointer">
          {title}
        </Link>
        {data && data?.length > 3 && (
          <Link to={link} className="see-more-link cursor-pointer">
            See More
          </Link>
        )}
      </h2>
      {data && data?.length > 0 ? (
        <ul className="custom-list">
          {data?.map((dataItem, idx) => {
            return (
              idx < 3 && (
                <li key={idx}>
                  <Link
                    className="cursor-pointer img-wrap"
                    title={dataItem?.title}
                    to={`/book-details/${dataItem?.id}`}
                    state={{
                      list_name_encoded: dataItem?.list_name_encoded,
                    }}
                  >
                    <img src={dataItem?.book_image} alt="" />
                  </Link>
                </li>
              )
            );
          })}
        </ul>
      ) : (
        <p>No Records Found.</p>
      )}
    </div>
  );
};

export default StatisticsSection;
