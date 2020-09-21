import React from "react";

class LogoutPage extends React.Component {
  componentDidMount() {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }

  render() {
    return <div></div>;
  }
}

export default LogoutPage;
