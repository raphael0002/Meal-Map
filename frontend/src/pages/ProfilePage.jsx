import axios from "axios";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";

const updateUser = async (value, user, setUser, setMessage, makeValue) => {
  try {
    console.log(user);
    const response = await axios.patch(
      `http://localhost:3000/api/${value.role}/profile`,
      {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.image,
        password: user.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value.token}`,
        },
      }
    );
    makeValue({
      username: response.data.data.username,
      email: response.data.data.email,
      role: value.role,
      token: value.token,
    });
    setUser(response.data.data);
    setMessage("Profile updated successfully!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error updating profile:", error);
    setMessage("Failed to update profile.");
  }
};

const ProfilePage = () => {
  const { value, makeValue } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/${value.role}/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${value.token}`,
            },
          }
        );
        console.log(response.data);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [value]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(value, user, setUser, setMessage, makeValue, handleInputChange);
    setIsEditing(false); // Switch back to view mode after updating
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h2 className="text-2xl font-bold mb-20">Profile Page</h2>
      {message && (
        <div className="mb-4 text-center text-sm text-green-600">{message}</div>
      )}
      {!isEditing ? (
        // View Mode
        <div className="flex justify-center items-center max-md:flex-col">
          <div className="mb-4 w-1/4">
            <img
              src={user.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-auto h-auto rounded-full ml-auto"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col ml-10 max-md:justify-center max-md:items-center max-md:ml-0">
              <div className="mb-4">
                <h3 className="text-xl font-medium">{user.username}</h3>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-medium">{user.email}</h3>
              </div>
              <div className="mb-4 w-3/4">
                <h3 className="text-xl font-medium whitespace-pre-line max-md:text-center">
                  {user.bio}
                </h3>
              </div>
            </div>
            <div className="mb-4 self-end mr-56 mt-10">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="text"
              name="image"
              value={user.image}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
