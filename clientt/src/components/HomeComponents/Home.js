import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SingleArcticleHandler from "./SingleArcticleHandler";


import NavBar from "../NavBar/NavBar";
const Home = () => {

  let [data, setData] = useState({});
  let numUploaded=0;
  const [inputValue, setInputValue] = useState("Samsung");
  const [sortingOption, setSortingOption] = useState("popularity");

  let ApiKey = "6f713258637145678d55e48aa1266ee6";
  let baseUrl = "https://newsapi.org/v2/";


  useEffect(() => {
    getData(sortingOption,inputValue);
  }, [sortingOption,inputValue]);




  const getData = async (sort = "popularity",inputValue="business") => {
    try {
      const response = await axios.get(
        `${baseUrl}everything?q=${inputValue}&sortBy=${sort}&language=en&apiKey=${ApiKey}`,{withCredentials: false,}
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterChange = (selectedSort) => {
    setSortingOption(selectedSort);
  };
  const handleSearchChange = (searchText) => {
    setInputValue(searchText);
  };

  return (
    <div >
      <NavBar onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />
      <div className="container-fluid">
        <div className="row ">
          {data.articles ? (
            data.articles.map((element, index) => {
              if (numUploaded < 4 && element.author && element.urlToImage) {
                numUploaded++;
                return (
                  <div key={index} className="col-lg-6 col-xl-3 col-md-6 mb-4 d-flex justify-content-center">
                    <SingleArcticleHandler data={element} />
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>No articles available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
