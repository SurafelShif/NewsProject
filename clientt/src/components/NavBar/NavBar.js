import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";

const NavBar = ({ onFilterChange, onSearchChange }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [inputValue, setInputValue] = useState("apple");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the default form submission
    onSearchChange(inputValue); // Trigger the data fetch when the button is clicked
  };
  const handleFilter = (event) => {
    event.preventDefault(); // Prevent the default form submission
    onFilterChange(event.target.value); // Trigger the data fetch when the button is clicked
  };

  return (
    <nav className="navbar row navbar-dark bg-dark bg-light gap-md-0 gap-2">
      <div className="col-md-2 d-flex justify-content-center ">
        <h1 className="navbar-brand">News</h1>
      </div>
      <div className="col-md-8 d-flex justify-content-center">
        <form className="form-inline d-flex gap-2 " onSubmit={handleSearch}>
          <select className="rounded" onChange={handleFilter}>
            <option value="popularity">Popularity</option>
            <option value="publishedAt">Date</option>
            <option value="relevancy">Relevancy</option>
          </select>
          <input
            className="form-control "
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleInputChange}
          />

          <button
            className="btn btn-outline-success my-2 my-sm-0 mx-3"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="col-md-2 d-flex justify-content-center gap-2">
        {cookies.token ? (
          <>
            <Link to={"/Profile"}>
              <button
                className="btn btn-outline-success my-5 my-sm-0"
                type="submit"
              >
                Profile
              </button>
            </Link>
            ,
            <button
              className="btn btn-outline-success my-5 my-sm-0"
              type="submit"
              onClick={() => {
                removeCookie("token", { path: "/" });
                window.location.reload();
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to={"/SignIn"}>
              <button
                className="btn btn-outline-success my-5 my-sm-0"
                type="submit"
              >
                Sign In
              </button>
            </Link>
            <Link to={"/SignUp"}>
              <button
                className="btn btn-outline-success my-5 my-sm-0"
                type="submit"
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
