import React from "react";
import "./App.css";
import Shelf from "./components/Shelf";
import Search from "./components/Search";
import { Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads App</h1>
              </div>
              <div className="list-books-content">
                <Shelf shelfType="currentlyReading" />

                <Shelf shelfType="wantToRead" />

                <Shelf shelfType="read" />
              </div>
            </div>
          )}
        />
        <div className="open-search">
          <Link to="/search">Search for a Book</Link>
          <Route path="/search" render={() => <Search />} />
        </div>
      </div>
    );
  }
}

export default App;
