import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      let data = await axios.post(
        "http://localhost:3001/users/signUp",
        {
          name: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/SignIn");
    } catch (error) {
      if (error.response.status === 502) {
        alert("User already exists");
      } 
      else {
        alert("name and password has to be at least 3 letters")
        console.log(error);
      }
    }
    console.log(email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 400,
          border: "1px solid #62778c",
          padding: "20px",
          boxShadow: "0px 0px 10px 0px #000",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontSize: "32px", color: "#fff", marginBottom: "30px" }}>
          Sign Up
        </h2>
        <input
          style={{
            marginBottom: 20,
            width: "100%",
            fontSize: "18px",
            padding: "12px",
            borderRadius: "5px",
            border: "none",
          }}
          placeholder="Email"
          id="email"
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />
        <input
          style={{
            marginBottom: 20,
            width: "100%",
            fontSize: "18px",
            padding: "12px",
            borderRadius: "5px",
            border: "none",
          }}
          placeholder="Password"
          id="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
        <button
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "20px",
            backgroundColor: "#627790",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={submit}
        >
          Sign Up
        </button>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
          <h4 style={{ fontSize: "18px", color: "#fff", marginBottom: "10px", textAlign: "center" }}>
            Already signed In?
          </h4>
          <Link to="/SignIn" style={{ fontSize: "16px", color: "#fff", textAlign: "center" }}>
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
