import axios from "axios";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";

const fectUser = async (value, setUser) => {
  await axios
    .patch(
      `http://localhost:3000/api/${value.role}/profile`,
      {
        username: value.username,
        email: value.email,
        bio: value.bio,
        image: value.image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value.token}`,
        },
      }
    )
    .then((response) => {
      setUser(response.data.data);
      console.log(response.data.data);
    });
};

const ProfilePage = () => {
  const { value } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fectUser(value, setUser);
  }, [value]);
  return (
    <div>
      <div>
        <img
          src={
            "https://cdn.wbcomdesigns.com/wp-content/uploads/2020/05/recipe.png"
          }
          alt=""
        />
      </div>
      <input type="text" value={value.username} onChange={() => {}} />
    </div>
  );
};

export default ProfilePage;
