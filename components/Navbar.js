import { useEffect } from "react";
import Link from "next/link";
import { Navbar, NavbarBrand, Nav, Button } from "reactstrap";
import { useUserCtx } from "../components/userContext";

const Navbar1 = (props) => {
  const { user } = useUserCtx();

  useEffect(() => {
    console.log("user from nav: ", user);
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
          <Link href={`/register`} as={"/register"}>
            <Button id="logbutton" color="success">
              Register
            </Button>
          </Link>
        )}
        {(user?.business && (
          <Link href={`/create`} as={"/create"}>
            <Button id="logbutton" color="warning">
              New
            </Button>
          </Link>
        )) || <div></div>}
        {(user?.username && (
          <Link href={`/logout`} as={"/logout"}>
            <Button id="logbutton" color="danger">
              Logout
            </Button>
          </Link>
        )) || (
          <Link href={`/login`} as={"/login"}>
            <Button id="logbutton" color="info">
              Login
            </Button>
          </Link>
        )}
      </Navbar>
    </div>
  );
};

export default Navbar1;
