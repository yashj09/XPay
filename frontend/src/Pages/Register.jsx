import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
      alert("register done");
    } catch (e) {
      console.error("The error is ", e);
    }
  };

  return (
    <>
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="mx-auto w-full max-w-[480px] space-y-6 rounded-2xl bg-card p-6 shadow-xl">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Create your account to get started.
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    placeholder="Enter your First Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    placeholder="Enter your Last Name"
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="Enter your Username"
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Enter your Password"
                    required
                  />
                </div>
                <Button className="w-full col-span-2" type="submit">
                  Register
                </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium underline underline-offset-4"
                  prefetch="false"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
