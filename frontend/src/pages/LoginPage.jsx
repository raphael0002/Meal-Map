import COVER_IMAGE from "../assets/coverImage.jpeg";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { validateEmail } from "../utils/validateEmail";

const PasswordErrorMessage = () => {
  return (
    <p className="text-sm text-red-500 my-[-0.7rem]">
      Password should have at least 8 characters
    </p>
  );
};

const LoginPage = () => {
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const rememberField = useRef();

  const getIsFormValid = () => {
    return validateEmail(email) && password.value.length >= 8;
  };

  const handleSublit = (e) => {
    e.preventDefault();
    if (getIsFormValid()) {
      navigate("/home");
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
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="w-full text-black py-2 my-5 bg-transparent border-b-2 invalid:border-red-500 border-black outline-none focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  value={password.value}
                  placeholder="Password"
                  className="w-full text-black py-2 my-5 bg-transparent border-b-2 border-black outline-none focus:outline-none"
                  onChange={(e) =>
                    setPassword({ ...password, value: e.target.value })
                  }
                  onBlur={() => setPassword({ ...password, isTouched: true })}
                />
                {password.isTouched && password.value.length < 8 && (
                  <PasswordErrorMessage />
                )}
              </div>
              <div className="w-full flex items-center justify-center py-5">
                <div className="w-full flex items-center">
                  <input
                    ref={rememberField}
                    type="checkbox"
                    className="w-4 h-4 mr-2 hover"
                  />
                  <p className="text-sm">Remember Me</p>
                </div>
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 hover:text-gray-500">
                  Forgot Password?
                </p>
              </div>
              <div className="w-full flex flex-col my-5">
                <button
                  type="submit"
                  className="w-full text-white font-semibold bg-[#060606] rounded-md p-[14px] border-black border-2 text-center flex items-center justify-center hover:bg-[#ffffff] hover:text-black transition-all duration-200 ease-in"
                  disabled={!getIsFormValid}
                >
                  Log in
                </button>

                <button
                  className="w-full text-black font-semibold bg-[#f5f5f5] rounded-md p-[14px] text-center flex items-center my-5 justify-center border-2 border-black hover:bg-black hover:text-white transition-all duration-200 ease-in"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-md font-semibold text-[#060606]">
            Dont have an account? &nbsp;
            <span
              className="font-semibold underline underline-offset-2 cursor-pointer hover:text-gray-500"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
