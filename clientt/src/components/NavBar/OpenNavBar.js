import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const OpenNavBar = () => {
  return (
    <nav className="navbar px-5 navbar-dark bg-dark ">
      <span class="navbar-brand mb-0 h1">Profile</span>
          <Link className="nav-link text-white" to="/">
            Home
          </Link>
    </nav>
  );
};

export default OpenNavBar;
