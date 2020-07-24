import React from "react";
import PropTypes from "prop-types";

import Book from "../Book";

const BookShelf = (props) => {
  const { title, data } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {data.map((book) => (
            <Book key={book.id} data={book} onChange={props.onChange} />
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default BookShelf;
