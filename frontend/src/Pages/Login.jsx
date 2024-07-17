import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      alert("Login done");
    } catch (e) {
      console.error("The error is ", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-background">
      <div className="w-full max-w-md space-y-6 shadow-xl rounded-2xl p-8 bg-card">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account.
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="johndoe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="underline" prefetch="false">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
