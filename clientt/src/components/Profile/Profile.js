import React, { useEffect } from "react";
import ProfileNavBar from "../NavBar/OpenNavBar";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const categories = [
  { name: "Technology", icon: "💻", color: "btn-info" },
  { name: "Sports", icon: "⚽", color: "btn-success" },
  { name: "Fashion", icon: "👗", color: "btn-warning" },
  { name: "Business", icon: "💼", color: "btn-primary" },
  { name: "Space", icon: "🚀", color: "btn-danger" },
  { name: "Sea", icon: "🌊", color: "btn-secondary" },
];

const CategoryButton = ({ to, icon, color, name }) => (
  <Link to={to} className={`btn btn-lg mb-4 ${color} mx-2`} style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
    {icon} <span  className="mt-2 fs-3 text-black">{name}</span>
  </Link>
);

const Profile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      navigate('/');
    }
  }, []);

  return (
    <div >
      <ProfileNavBar />
      <h1 className="text-center text-white mt-3">Your Articles</h1>
      {/* Responsive layout with two columns on md and above */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          {categories.map((category, index) => (
            <div key={index} className="col-md-4 col-sm-12">
              <CategoryButton {...category} to={`/Category/${category.name}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
