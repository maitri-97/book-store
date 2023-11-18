import { FC } from "react";

interface Props {
  price: number;
}

const BookPrice: FC<Props> = ({ price }) => {
  return <p className="book-price">{price} GBP</p>;
};

export default BookPrice;
