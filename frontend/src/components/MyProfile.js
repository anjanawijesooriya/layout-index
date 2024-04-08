import React, { useState, useEffect } from "react";
import { Spin, Card, notification } from "antd";
import axios from "axios";

import UserImg from "../assets/user.jpg";

const MyProfile = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {
    (async () => {
      await axios
        .get("/api/auth/users")
        .then((res) => {
          setData(res?.data);
        })
        .catch((error) => alert(error));
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(!loader), 2000);
  }, []);

  const filteredData = data.filter(
    (el) => el.email === localStorage.getItem("email")
  );

  return (
    <section>
      <div>
        {loader === false ? (
          <center>
            <Spin style={{ marginTop: "200px" }} size="large" />
          </center>
        ) : (
          <center>
            <div
              style={{
                display: "inline-block",
                padding: 40,
                justifyItems: "center",
                marginTop: 30,
              }}
            >
              <div className="site-card-wrapper">
                <Card
                  hoverable
                  style={{ width: 300, marginTop: 20, backgroundColor: "gray" }}
                  cover={<img alt="example" src={UserImg} />}
                >
                  <span style={{ fontSize: 20 }}>
                    <b>🤵 UserName:- {filteredData?.[0]?.username}</b>
                  </span>{" "}
                  <br />
                  <br />
                  <span style={{ fontSize: 15 }}>
                    <b>📧 Email:- {filteredData?.[0]?.email}</b>
                  </span>{" "}
                  <br />
                  <br />
                </Card>
              </div>
            </div>
          </center>
        )}
      </div>
    </section>
  );
};

export default MyProfile;