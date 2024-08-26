import COVER_IMAGE from "../assets/coverImage.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const { makeValue } = useAuth();
  const navigate = useNavigate();

  const getIsFormValid = () => {
    return (
      username.trim() !== "" &&
      password.length >= 8 &&
      (role === "cook" || role === "user")
    );
  };

  const handleSublit = async (e) => {
    e.preventDefault();
    if (getIsFormValid()) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/${role === "user" ? "user" : "cook"}`,
          {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        if (data.success) {
          console.log(data);
          makeValue({
            username: username,
            email: data.data.email,
            role: data.data.role,
            token: data.data.token,
          });
          navigate("/");
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert(
        "Please fill out all required fields and ensure your email is valid."
      );
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className=" relative w-1/2 h-full flex flex-col bg-[#f5f5f5]">
        <img
          src={COVER_IMAGE}
          alt="Cover Image"
          className="w-full h-full object-cover p-3 rounded-tl-[20px] rounded-bl-[15px]"
        />
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
        <h1 className="w-full max-w-[500px] mx-auto text-4xl text-[#060606] font-poppins font-semibold mr-auto">
          🍽️Meal Map
        </h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-[44px] font-semibold mb-4">Login</h3>
            <p className="text-xl mb-2">
              Welcome back! Please Enter your details.
            </p>
          </div>
          <div className="w-full flex flex-col">
            <form onSubmit={handleSublit}>
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  className="w-full text-black py-2 my-3 bg-transparent border-b-2 invalid:border-red-500 border-black outline-none focus:outline-none"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="w-full text-black py-2 my-3 bg-transparent border-b-2 invalid:border-red-500 border-black outline-none focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="w-full text-black py-2 my-3 bg-transparent border-b-2 border-black outline-none focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  className="w-full text-black py-2 my-3 bg-transparent border-b-2 border-black outline-none focus:outline-none"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="w-full my-3">
                <select
                  value={role}
                  className="block py-2.5 w-full text-gray-500 bg-transparent border-b-2 border-black dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="role">Choose a role</option>
                  <option value="cook">Cook</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="w-full flex flex-col my-3">
                <button
                  type="submit"
                  className="w-full text-white font-semibold bg-[#060606] rounded-md p-[14px] my-5 border-black border-2 text-center flex items-center justify-center hover:bg-[#ffffff] hover:text-black transition-all duration-200 ease-in"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-md font-semibold text-[#060606]">
            Already Have an account? &nbsp;
            <span
              className="font-semibold underline underline-offset-2 cursor-pointer hover:text-gray-500"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
