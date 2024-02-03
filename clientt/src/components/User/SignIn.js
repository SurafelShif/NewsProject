import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      console.log(email,password);
      let { data } = await axios.post(
        "http://localhost:3001/users/login",
        {
          name: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Wrong Email or Password");
    }
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
      Sign In
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
      value={email}
      onChange={(e) => setEmail(e.target.value)}
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
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
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
      Sign In
    </button>
    <Link
      to="/signup"
      style={{
        fontSize: "16px",
        color: "#fff",
        marginTop: "15px",
        display: "block",
        textAlign: "center",
      }}
    >
      Not registered yet? Sign up here.
    </Link>
  </div>
</div>

  );
}

export default SignIn;
