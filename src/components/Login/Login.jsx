import React from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [submissionResults, setsubmissionResults] = useState("Login to continue");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://evemark.fun/api/user/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setsubmissionResults("Login Successful");
      navigate("/events");
    }
    if (response.status === 401) {
      setsubmissionResults("Login Failed");
    }
  };

  const onLogin = () => {};
  return (
    <div className="container row">
      <div className="logo__container">
        <img src="https://cdn-icons-png.flaticon.com/512/49/49342.png" alt="Logo" />
      </div>
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="credentials">
            <input
              type={"email"}
              name="email"
              placeholder="youremail@mail.co"
              value={formData.email}
              onChange={handleChange}
            ></input>
            <input
              type={"password"}
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
          <div className="submission">
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
            <h5>{submissionResults}</h5>
          </div>
        </form>
      </div>
      <div className="other__options">
        <a href="/signup">Don't have an account ?</a>
      </div>
    </div>
  );
};

export default Login;
