import React from "react";
import axios from "../Services/axios";
import { accessTokenLocalstorageKey } from "../constants";
const Auth = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState("");
  React.useEffect(() => {
    axios
      .get("/api/user-access-token")
      .then(({ data }) => {
        localStorage.setItem(accessTokenLocalstorageKey, data.token);
        setIsAuth("true");
      })
      .catch((e) => {
          setIsAuth("false");
      });
  }, []);
  return <div>{isAuth === "true" ? children : isAuth === ""? <div>Loading......</div> :<div> Failed To Fetch </div>}</div>;
};

export default Auth;
