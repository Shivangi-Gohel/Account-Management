import React, { useRef, useState, useEffect } from "react";
import { Camera, Mail, MapPin, Phone, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";

const Profile = () => {
  const { user, setUser, loading } = useAuth();
  console.log("Current user:", user);

  // State for profile data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    image:
      user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [editloading, seteditLoading] = useState(false);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes for fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save
  const handleSave = async () => {
    try {
      seteditLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/auth/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser(res.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    } finally {
      seteditLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        bio: user.bio || "",
        image:
          user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <nav className="border-b border-border bg-background sticky top-0 z-50 p-4 text-center">
        <span className="text-gray-500">Loading...</span>
      </nav>
    );
  }

  return (
    <>
      <Navbar />
      {/* <div className="max-w-md mx-auto mt-10 p-6 rounded-lg text-center bg-white shadow-lg">
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
        <div
          className="relativ
        e inline-block"
        >
          <img
            src={formData.image}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-gray-300"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
            title="Change profile picture"
          >
            <Camera className="w-4 h-4 text-white" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="mt-6 text-left space-y-3">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800 font-medium">{formData.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{formData.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">
                {formData.phone || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">
                {formData.address || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{formData.bio || "No bio yet."}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div> */}
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative gradient header */}
            <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50"></div>

            {/* Profile Content */}
            <div className="px-6 md:px-10 pb-8">
              {/* Profile Image Section */}
              <div className="flex flex-col md:flex-row md:items-start gap-8 -mt-16 relative z-10">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative inline-block group">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                    {isEditing && (
                      <button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full hover:shadow-lg transition-all duration-200 text-white"
                        title="Change profile picture"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Profile Info Header */}
                <div className="flex-1 pt-4 md:pt-5">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{formData.name || "Your Name"}</h1>
                  <p className="text-lg text-gray-600 mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    {formData.email || "your@email.com"}
                  </p>
                  <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          disabled={editloading}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-all"
                        >
                          {editloading ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="border-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-all"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="mt-12 pt-12 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      <User className="w-4 h-4 text-blue-600" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg text-left">{formData.name || "-"}</p>
                    )}
                  </div>
                  

                  {/* Email Field */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg text-left">{formData.email || "-"}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg text-left">{formData.phone || "-"}</p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg text-left">{formData.address || "-"}</p>
                    )}
                  </div>
                </div>

                {/* Bio Field - Full Width */}
                <div className="space-y-3 mt-8">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide block">
                    Bio / About
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-base">{formData.bio || "-"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      
    </>
  );
};

export default Profile;

