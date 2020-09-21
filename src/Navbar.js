import React, { useEffect } from "react";
import { Navbar, NavbarBrand, Nav, Button } from "reactstrap";
import { useUserCtx } from "./userContext";

const Navbar1 = (props) => {
  const { user } = useUserCtx();

  useEffect(() => {
    //console.log("user from nav: ", user);
  }, [user]);
  return (
    <div>
      <Navbar id="navbar1" color="dark" dark expand="md">
        <NavbarBrand id="navbarbrand1" href="/">
          {props.navbarBrand}
        </NavbarBrand>
        <Nav className="mr-auto" navbar>
          {user?.business ? (
            user?.username ? (
              <h3 id="navbarbrand2">
                {user?.username}, welcome to WePost, feel free to post jobs for
                freelancers
              </h3>
            ) : (
              <h3 id="navbarbrand2">
                Welcome to WePost, feel free to roam or sign up!
              </h3>
            )
          ) : user?.username ? (
            <h3 id="navbarbrand2">
              {user?.username}, welcome to WePost, feel free to claim posts to
              complete
            </h3>
          ) : (
            <h3 id="navbarbrand2">
              Welcome to WePost, feel free to roam or sign up!
            </h3>
          )}
        </Nav>
        {(user?.username && <div></div>) || (
          <a href="/register">
            <Button id="logbutton" color="success">
              Register
            </Button>
          </a>
        )}
        {(user?.business && (
          <a href="/create">
            <Button id="logbutton" color="warning">
              New
            </Button>
          </a>
        )) || <div></div>}
        {(user?.username && (
          <a href={"/u/" + user.username}>
            <Button id="logbutton" color="success">
              Profile
            </Button>
          </a>
        )) || <div></div>}
        {(user?.username && (
          <a href="/logout">
            <Button id="logbutton" color="danger">
              Logout
            </Button>
          </a>
        )) || (
          <a href="/login">
            <Button id="logbutton" color="info">
              Login
            </Button>
          </a>
        )}
      </Navbar>
    </div>
  );
};

export default Navbar1;
