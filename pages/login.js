import React, { useState, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { useUserCtx } from "../components/userContext";
const LoginPage = () => {
  const [credentials, setCredentials] = useState();
  const { user, setUser } = useUserCtx();
  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("https://api.wepost.xyz/auth/local", {
        identifier: credentials.username,
        password: credentials.password,
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data.user);
        console.log(user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("jwt", response.data.jwt);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };
  return (
    <div id="loginForm">
      <Form id="logonForm" onSubmit={handleLogin}>
        <h1>Log in</h1>
        <Label for="username">Username or Email:</Label>
        <Input
          type="text"
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          id="username"
          placeholder="Username or Email"
        />
        <br />
        <Label for="password">Password:</Label>
        <Input
          type="password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          id="password"
        />
        <br />
        <Button color="success">Log in</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
