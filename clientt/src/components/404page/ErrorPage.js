import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-warning">404 - Not Found</h1>
      <p className="lead text-white">Oops! The page you are looking for does not exist.</p>
      <p className="lead text-white">Let's get you back to the <Link to="/" className="text-info">home page</Link>.</p>
    </div>
  );
};

export default ErrorPage;
