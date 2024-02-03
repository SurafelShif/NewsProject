import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";

const SingleArcticleHandler = ({ data }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  let [isCategorized, setCategory] = useState(false);
  let navigate = useNavigate();
  //getting the data to variables with destruction
  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    _id: id,
  } = data;

  const [isFoundArticle, setFound] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    //when we recieve it get an additional id key,it interferes with the request to the server so we need to delete it
    if (id) {
      delete data._id;
    }

    // If logged in, check if the current data is saved
    if (cookies.token) {
      try {
        let dataToUpload;
        let { _id: userId } = jwtDecode(cookies.token);
        dataToUpload = {
          categories: [
            {
              name: category,
              articles: [data],
            },
          ],
          userId: userId,
        };
        getFoundData(dataToUpload);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const getFoundData = async (dataToUpload) => {
    if (cookies.token) {
      try {
        let response = await axios.post(
          "http://localhost:3001/articles/isFound",
          dataToUpload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setFound(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("To save articles, you have to sign in");
    }
  };
  //article save handler
  const handleCategory = async (event) => {
    let Rcategory;
    if (!category) {
      Rcategory = event.target.value;
      console.log(Rcategory);
    } else {
      Rcategory = category;
    }

    if (!cookies.token) {
      navigate("/SignIn");
      console.log("Not signed in");
    } else {
      let dataToUpload;
      let { _id: userId } = jwtDecode(cookies.token);
      dataToUpload = {
        categories: [
          {
            name: Rcategory,
            articles: [data],
          },
        ],
        userId: userId,
      };
      try {
        // If not found and the user tries to save the article
        if (!isFoundArticle) {
          let response = await axios({
            method: "post",
            url: "http://localhost:3001/articles/add-articles",
            withCredentials: true,
            data: dataToUpload,
          });
          console.log(response);
        } else {
          // If found and the user tries to delete the article
        }
        setFound(!isFoundArticle);
      } catch (error) {
        console.log(error);
      }
      setCategory(false);
    }
  };

  //category dropdown handler
  const handleSaveArticle = async () => {
    //if not signed no need for the dropdown, so we alert him
    if (!cookies.token) {
      alert("Not signed in. Please sign in to save the article.");
    }
    //if logged and the user already saved the article then it will be removed from his favorites
    else if (isFoundArticle) {
      let dataToUpload;
      let { _id: userId } = jwtDecode(cookies.token);
      dataToUpload = {
        categories: [
          {
            name: category,
            articles: [data],
          },
        ],
        userId: userId,
      };
      //in order to delete a specified object we need the object id of the article
      let response = await axios.post(
        "http://localhost:3001/articles/getObjectId",
        dataToUpload,
        {
          withCredentials: true,
        }
      );
      // delete the article based on the id of the object
      let res = await axios.delete(
        `http://localhost:3001/articles/${response.data.objectId}`,
        {
          withCredentials: true,
        }
      );
      //if he in the category page and tries to delete it,i refresh the page
      if(category){
        window.location.reload();
      }
      // so we update the isFound state for a dyanamic refresh
      setFound(false);
    } else {
      //logged and wants to save the article so we open the categories dropdown
      setCategory(true);
    }
  };

  return (
    <Card style={{ width: "20rem", margin: "20px", height: "47rem" }}>
      {/* Responsive image */}
      <Card.Img
        variant="top"
        src={urlToImage}
        style={{
          width: "100%",
          height: "10rem",
          objectFit: "cover",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{source.name}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <div>
          {/* Button to open the article in a new tab */}
          <Button
            variant="primary"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            More
          </Button>
        </div>
        <div className="d-flex justify-content-end ">
          {/* Dropdown for category selection and button for article category save, will be triggered if user is logged and didnt save the article*/}
          {isCategorized ? (
            <select className="rounded" onChange={handleCategory}>
              <option>Category</option>
              <option value="Sports">Sports</option>
              <option value="Fashion">Fashion</option>
              <option value="Space">Space</option>
              <option value="Sea">Sea</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
            </select>
          ) : null}
          <Button
            variant="success"
            onClick={handleSaveArticle}
            style={{ marginLeft: "10px" }}
          >

            {isFoundArticle ? (
              <>
                <FontAwesomeIcon icon={faBookmarkSolid} />
              </>
            ) : (
              <>
              <FontAwesomeIcon icon={farBookmark} />
              </>
            )}
          </Button>
        </div>
      </Card.Footer>
      <Card.Footer style={{height:"4rem"}}>
        {/* Displaying article information */}
        <small className="text-muted">
          By {author} | Published {new Date(publishedAt).toDateString()}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default SingleArcticleHandler;
