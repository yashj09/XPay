import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (e) {
      console.error("The error is ", e);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            placeholder="Enter your First Name"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            placeholder="Enter your Last Name"
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Enter your Username"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Enter your Password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
