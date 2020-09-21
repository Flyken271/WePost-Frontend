import React, { useEffect, useState } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { useUserCtx } from "../components/userContext";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState();
  const { user, setUser } = useUserCtx();
  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  const submitRegister = (e) => {
    e.preventDefault();

    // Request API.
    // Add your own code here to customize or restrict how the public can register new users.
    axios
      .post("https://api.wepost.xyz/auth/local/register", {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        business: credentials.business,
      })
      .then((response) => {
        // Handle success.
        setUser(response.data.user);
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
      <Form
        id="logonForm"
        style={{ marginBottom: "200px" }}
        onSubmit={submitRegister}
      >
        <h1>Register</h1>
        <h6>
          If you're a business or company looking to post a job for freelancers
          to complete then please select the checkbox below stating so, if
          you're a freelancer looking to complete jobs posted by companies and
          business's please submit the form without the checkbox. Please be sure
          to read the{" "}
          <a id="tosLink" href="/tos">
            Terms of Service
          </a>{" "}
          page. It is important that you have read the TOS page as it indicates
          many different legal things regarding you and the freelancer.{" "}
          <div style={{ color: "red" }}>
            Fake or Fraudulant business accounts will be terminated along with
            freelancer accounts deemed against TOS.
          </div>
        </h6>
        <Label for="username">Username:</Label>
        <Input
          type="text"
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          id="username"
          placeholder="Username"
        />
        <br />
        <Label for="email">Email:</Label>
        <Input
          type="email"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          id="email"
          placeholder="Email Address"
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
        <Label>
          <Input
            type="checkbox"
            onChange={(e) =>
              setCredentials({
                ...credentials,
                business: e.target.checked,
              })
            }
          />
          Business Account
        </Label>
        <br />
        <Button color="success">Register</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
