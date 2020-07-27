import React, { useState, useEffect } from "react";
import * as BooksAPI from "../../BooksAPI";
import { Link } from "react-router-dom";

import BookShelf from "../../Components/BookShelf";
import LoadingComponent from "../../Components/Loading";

const SHELVES = [
  {
    title: "Currently Reading",
    id: "currentlyReading",
  },
  {
    title: "Want To Read",
    id: "wantToRead",
  },
  {
    title: "Read",
    id: "read",
  },
];

const BookList = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await BooksAPI.getAll();
      setLoading(false);
      setData(response);
    } catch (error) {
      setLoading(false);
      console.log("BooksApp -> getData -> error", error);
    }
  };

  const handleBookChange = async (value, id) => {
    try {
      await BooksAPI.update({ id }, value);
      getData();
    } catch (error) {
      console.log("BooksApp -> getData -> error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const booksDataByShelve = SHELVES.map((shelf) => ({
    ...shelf,
    data: data.filter((book) => book.shelf === shelf.id),
  }));

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {booksDataByShelve.map((bookShelf) => (
            <BookShelf
              key={bookShelf.id}
              title={bookShelf.title}
              data={bookShelf.data}
              onChange={handleBookChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
      {loading && <LoadingComponent />}
    </div>
  );
};
export default BookList;
