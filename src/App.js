import React from "react";
import "./App.css";
import BookList from "./Containers/BookList";
import Search from "./Containers/Search";
import { Switch, Route, BrowserRouter } from "react-router-dom";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={BookList} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
