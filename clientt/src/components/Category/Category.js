import { useParams } from "react-router-dom";
import OpenNavBar from "../NavBar/OpenNavBar";
import SingleArcticleHandler from "../HomeComponents/SingleArcticleHandler";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Category = () => {
  const navigate = useNavigate();
  let [numUploaded, setNumToUpolad] = useState(0);
  const [cookies] = useCookies(["token"]);
  let [data, setData] = useState({});
  const { category } = useParams();

  const getData = async () => {
    axios.defaults.withCredentials = true;
    try {
      let response = await axios.get(
        `http://localhost:3001/articles/getArcticle/${category}`
      );
      //sometimes articles get removed from the New API or the user deleted them so we check if it is not removed
      if (response.data.articles[0].categories[0].articles.length > 0) {
        setData(response.data.articles[0].categories[0]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
    getData();
  }, []);
  return (
    <div>
      <OpenNavBar />
      <div className="container-fluid">
        <div className="row ">
          {data.articles ? (
            data.articles.map((element, index) => {
              if (numUploaded < 8) {
                numUploaded++;
                return (
                  <div key={index} className="d-flex justify-content-center col-xl-3 col-md-6 mb-3">
                    <SingleArcticleHandler data={element} />
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <div className="col-12 text-center">
              <p className="lead text-white">
                You haven't saved any articles for {category} yet.
              </p>
              <p className="lead text-white">
                Explore and discover interesting articles to save.
              </p>
              {/* You can add additional elements or links here for user guidance */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
