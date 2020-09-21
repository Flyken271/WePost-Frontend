import React, { useEffect, useState } from "react";
import axios from "axios";
import { Jumbotron } from "reactstrap";

const Userpage = () => {
  const [channels, setChannels] = useState();
  useEffect(() => {
    console.log("homepage mounted");
    const fetchData = async () => {
      const response = await axios.get("https://api.wepost.xyz/Users");
      //console.log("response: ", response);
      setChannels(response.data);
    };
    fetchData();
    //console.log("user: ", user);
  }, []);

  return (
    <div className="container">
      {channels &&
        channels.map((user, index) => {
          if (user.username === window.location.href.split("/")[4]) {
            return (
              <Jumbotron id="serverStats">
                <h1>{user.username + "'s page:"}</h1>
                <h6>
                  Posts: {user ? user.posts.length : "No posts to display."}
                </h6>
                <h6>Rank: {user ? user.role.name : "No rank to display."}</h6>
                <h6>
                  Account age:{" "}
                  {user ? user.created_at.split("T")[0] : "No date to display."}
                </h6>
              </Jumbotron>
            );
          }
          return null;
        })}
    </div>
  );
};

export default Userpage;
