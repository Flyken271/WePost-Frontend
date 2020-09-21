import { Navbar, Nav, NavbarText } from "reactstrap";

const Footer1 = (props) => {
  return (
    <div>
      <Navbar id="Footer1" color="dark" dark expand="md">
        <Nav className="mr-auto" navbar>
          <NavbarText>
            <h4 style={{ color: "grey" }}>All rights reserved. Copyright ©</h4>
            by{" "}
            <a id="footerlink" href="https://flyken.org">
              Jared
            </a>
          </NavbarText>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Footer1;
