import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/authContext.jsx";
import { URL } from "@/constant.js";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {user, setUser, loading} = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/login`,
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token)
      setUser(res.data.user);
      toast.success("Login successful!");
      navigate("/profile");
      window.location.reload();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen from-background via-background to-background flex items-center justify-center px-4 py-12">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            width: "500px",
          },
          success: {
            style: {
              background: "#e6fffa",
              color: "#065f46",
            },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#991b1b",
            },
          },
        }}
      />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-muted-foreground">
            Join us and start your journey today
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-11 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="h-11 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
