import React, { FC } from "react";

interface Props {
  title: string;
  author: string;
}

const BookTitleWithAuthor: FC<Props> = ({ title, author }) => {
  return (
    <p className="book-title-author">
      <span className="book-title">{title}</span> by <span>{author}</span>
    </p>
  );
};

export default BookTitleWithAuthor;
