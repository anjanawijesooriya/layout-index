import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Layout,
  Divider,
  Checkbox,
  Spin,
  notification,
} from "antd";
import "./Register.scss";

import RegisterLogo from "../../assets/register.png";

import { LoginOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const { Header } = Layout;

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  const registerHandler = async (e) => {
    //handler method for login

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      //method for cheking the password an confirm password
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, password, email },
        config
      );

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);

      setTimeout(() => {
        // set a 5seconds timeout for authentication
        notification.info({
          message: `Notification`,
          description: "Successfully created your profile 😘",
          placement: "top",
        });
        history("/");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const showPassword = () => {
    //show password method when checkbox is enabled
    var x = document.getElementById("password");
    var y = document.getElementById("password1");
    if (x.type === "password" && y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  };

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <center>
            <Link to={"/"}>
              <h3 style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {" "}
                Location Detailer{" "}
              </h3>
            </Link>
            <h1 id="header" style={{ fontFamily: "serif", fontSize: "50px" }}>
              LayoutIndex{" "}
            </h1>

            <Divider />
          </center>
        </Header>
      </Layout>

      <div className="register-page">
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <div className="title">Location Detailer</div>
              <center>
                {error && (
                  <span style={{ color: "white", background: "orange" }}>
                    {error}
                  </span>
                )}
                {available && (
                  <span style={{ color: "white", background: "red" }}>
                    {available}
                  </span>
                )}
              </center>
              <div className="text-block">Create your account today! 😃</div>
              <Form onFinish={registerHandler}>
                <label>Username</label>
                <Input
                  label={"USERNAME"}
                  name={"username"}
                  fieldType={"username"}
                  size={"large"}
                  placeholder={"e.g John Doe"}
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <Input
                  label={"Email"}
                  name={"email"}
                  fieldType={"email"}
                  size={"large"}
                  type="email"
                  placeholder={"e.g JohnDoe@gmail.com"}
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <Input
                  label={"PASSWORD"}
                  name={"password"}
                  fieldType={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Re-Enter Password</label>
                <Input
                  label={"PASSWORD"}
                  name={"password"}
                  fieldType={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  id="password1"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Checkbox onClick={showPassword}>Show Password</Checkbox>
                <br /> <br /> <br />
                
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "red" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    {loading ? (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin indicator={<LoadingOutlined />} />}
                      >
                        &nbsp;Registration in Progress...
                      </Button>
                    ) : (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        icon={<LoginOutlined />}
                        disabled={loading}
                      >
                        Register
                      </Button>
                    )}
                    <br />
                    <Link to={"/"}>
                      <a className="forget-text">Already have an Account?</a>
                    </Link>
                  </center>
                </div>
              </Form>
            </div>
          </Col>
          <Col className="right-side" xl={9} lg={9} md={0} sm={0}>
            {window.innerWidth > 900 && (
              <div
                className="background-img-container"
                style={{ backgroundImage: `url(${RegisterLogo})` }}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
