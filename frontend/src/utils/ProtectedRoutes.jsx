import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { value, makeValue } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (!value) {
      navigate("/login");
    }
    const checkAuth = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/", value, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value.token}`,
          },
        });

        const data = response.data;
        console.log(data);
        if (data.success) {
          setIsAuthorized(true);
        } else {
          makeValue({
            username: "",
            email: "",
            token: "",
            role: "",
          });
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        makeValue({
          username: "",
          email: "",
          token: "",
          role: "",
        });
        navigate("/login");
      }
    };

    checkAuth();
  }, [value, makeValue, navigate]);

  return isAuthorized ? (
    children
  ) : (
    <HashLoader
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%",
      }}
    ></HashLoader>
  );
};

export default ProtectedRoutes;
