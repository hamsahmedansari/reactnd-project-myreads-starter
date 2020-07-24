import React from "react";
import PropTypes from "prop-types";

const optionsForShelf = [
  { value: "wantToRead", label: "Want to Read" },
  { value: "currentlyReading", label: "Currently Reading" },
  { value: "read", label: "Read" },
  { value: "none", label: "None" },
];

const Book = (props) => {
  const { data } = props;
  const handleChange = (event) => {
    props.onChange(event.target.value, data.id);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                data.imageLinks.smallThumbnail &&
                `url("${data.imageLinks.smallThumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={handleChange} value={data.shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              {optionsForShelf.map((shelf) => (
                <option
                  value={shelf.value}
                  disabled={shelf.value === data.shelf}
                  key={shelf.value}
                >
                  {shelf.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{data.title}</div>
        {data.authors && (
          <div className="book-authors">{data.authors.join(",")}</div>
        )}
      </div>
    </li>
  );
};

Book.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Book;
