import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  if (localStorage.getItem("authToken") === "null") {
    return loader ? (
      <center>
        <div className=" my-64">
          <h1 style={{ color: "red" }}>UnAutharized Access!!! ❌</h1>
          <p>Rolling back to the Login... 👉</p>
          <Spin size="large" />
        </div>
      </center>
    ) : (
      <Navigate to="/" /> //if user not login or not authorized to the restricted routes, it may be navigated to the login
    );
  }
  return children;
}

export default PrivateRoute;