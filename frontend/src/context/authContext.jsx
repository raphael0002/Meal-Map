import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [value, setValue] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {
          username: "",
          role: "",
          email: "",
          token: "",
        }
  );
  const makeValue = (value) => {
    setValue(value);
    console.log(value);
    localStorage.setItem("auth", JSON.stringify(value));
  };
  return (
    <AuthContext.Provider value={{ value, makeValue }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
