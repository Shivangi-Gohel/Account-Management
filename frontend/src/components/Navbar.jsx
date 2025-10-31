import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext.jsx";
import { Menu, X } from "lucide-react"; // icons for menu toggle

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <nav className="border-b border-border bg-background sticky top-0 z-50 p-4 text-center">
        <span className="text-gray-500">Loading...</span>
      </nav>
    );
  }

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center h-16">
          <span
            onClick={() => navigate("/")}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            AccountApp
          </span>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/register")}>Sign Up</Button>
              </>
            ) : (
              <>
                <span className="font-medium">{user.name || "User"}</span>
                <Button variant="outline" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-start gap-3 pb-4 animate-slideDown">
            {!user ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <span className="font-medium px-2">{user.name || "User"}</span>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                >
                  Profile
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
