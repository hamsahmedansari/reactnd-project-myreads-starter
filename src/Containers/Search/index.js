import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";
import Book from "../../Components/Book";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    search: "",
    data: [],
    myBooks: [],
  };

  componentDidMount() {
    this.getData();
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ search: value });
    if (value) this.searchDB(value);
    else this.setState({ data: [] });
  };

  getData = async () => {
    try {
      const response = await BooksAPI.getAll();
      this.setState({ myBooks: response });
    } catch (error) {
      console.log("BooksApp -> getData -> error", error);
    }
  };
  searchDB = async (value) => {
    try {
      const response = await BooksAPI.search(String(value).toLocaleLowerCase());
      if (!response.error) {
        const formatedData = this.formatData(response);
        if (this.state.search === value) {
          this.setState({ data: formatedData });
        }
      } else this.setState({ data: [] });
    } catch (error) {
      console.log("BooksApp -> getData -> error", error);
    }
  };
  formatData = (data = []) => {
    const { myBooks } = this.state;
    const temp = data.map((element) => {
      const flag = myBooks.find((d) => d.id === element.id);
      if (flag) return flag;
      return element;
    });
    return temp;
  };
  handleBookChange = async (value, id) => {
    try {
      await BooksAPI.update({ id }, value);
    } catch (error) {
      console.log("BooksApp -> getData -> error", error);
    }
  };
  render() {
    const { search, data } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {!!data.length && (
          <div className="search-books-results">
            <ol className="books-grid">
              {data.map((book) => (
                <Book
                  key={book.id}
                  data={book}
                  onChange={this.handleBookChange}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
