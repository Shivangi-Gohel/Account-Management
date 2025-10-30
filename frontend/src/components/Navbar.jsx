import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        // verify token
        const res = await axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Auth check failed:", err.response?.data || err.message);
        localStorage.removeItem("token"); // remove invalid token
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (isLoading) return null;

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span
            onClick={() => navigate("/")}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            AccountApp
          </span>

          {/* Auth Controls */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <span onClick={() => navigate("/login")}>
                  <Button variant="ghost">Sign In</Button>
                </span>
                <span onClick={() => navigate("/register")}>
                  <Button>Sign Up</Button>
                </span>
              </>
            ) : (
              <>
                <span className="font-medium"> {user.name || "User"}</span>
                <Button variant="outline" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
                <Button onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
