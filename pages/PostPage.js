import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Jumbotron } from "reactstrap";

const PostPage = () => {
  const [channels, setChannels] = useState();
  useEffect(() => {
    console.log("homepage mounted");
    const fetchData = async () => {
      const response = await axios.get("https://api.wepost.xyz/Posts");
      //console.log("response: ", response.data);
      setChannels(response.data);
    };
    fetchData();
    //if (channels) console.log(channels);
  }, []);

  return (
    <div className="container">
      {channels?.map((post, index) => {
        if (post.id.toString() === window.location.href.split("/")[4]) {
          return (
            <Jumbotron id="serverStats">
              <h1>
                <Badge>
                  {post.id} - {post.Title}
                </Badge>
                <Badge color="warning" style={{ float: "right" }}>
                  {post.user.username}
                </Badge>
              </h1>
              <h4>
                <Badge color="primary">
                  {post.claim?.username
                    ? "Claimed by: " + post.claim.username
                    : "Unclaimed"}
                </Badge>
              </h4>
              <br />
              <h6>
                <h3 style={{ color: "white" }}>Short Description: </h3>
                {post.content}
              </h6>
              <br />
              <h6>
                <h3 style={{ color: "white" }}>Long Description: </h3>
                {post.description}
              </h6>
            </Jumbotron>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PostPage;
