import React, { useState, useEffect } from "react";
import * as BooksAPI from "../../BooksAPI";

import BookShelf from "../../Components/BookShelf";
import LoadingComponent from "../../Components/Loading";

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

  const goToHome = () => props.history.push("/search");

  useEffect(() => {
    getData();
  }, []);

  const currentlyReading = data.filter(
    (book) => book.shelf === "currentlyReading"
  );

  const wantToRead = data.filter((book) => book.shelf === "wantToRead");

  const read = data.filter((book) => book.shelf === "read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            data={currentlyReading}
            onChange={handleBookChange}
          />
          <BookShelf
            title="Want to Read"
            data={wantToRead}
            onChange={handleBookChange}
          />
          <BookShelf title="Read" data={read} onChange={handleBookChange} />
        </div>
      </div>
      <div className="open-search">
        <button onClick={goToHome}>Add a book</button>
      </div>
      {loading && <LoadingComponent />}
    </div>
  );
};
export default BookList;
