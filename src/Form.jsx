import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Form = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const handleUsername = (e) => {
    setUsername(e.target.value.trim());
  };

  const handlePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const user = {
    username: username,
    password: password,
    expiresInMins: 30
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post("https://dummyjson.com/auth/login", user).then((data) => {
      if (data?.status === 200) {
        toast.success("Loggin succesful");

        setResponse(data?.data);
        setLoading(false);
        localStorage.setItem("accessToken", data?.data?.accessToken);
        localStorage.setItem("refreshToken", data?.data?.refreshToken);
      }
    });
  };

  const {
    email,
    username: responseusername,
    image,
    FirstName,
    LastName
  } = response;

  console.log(responseusername);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder=""
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder="Type Password"
          value={password}
          onChange={handlePassword}
        />

        <button disabled={loading} type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <div>
        <h1>{responseusername}</h1>
        <img src={image} alt={responseusername} />
        <p>{FirstName} {LastName}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Form;
