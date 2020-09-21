import React, { useState, useEffect } from "react";
import Card1 from "./Card1";
import { Badge } from "reactstrap";
import axios from "axios";

const Homepage = () => {
  const [channels, setChannels] = useState();

  useEffect(() => {
    console.log("homepage mounted");
    const fetchData = async () => {
      const response = await axios.get(
        "https://gorest.co.in/public-api/products"
      );
      console.log("response: ", response);
      setChannels(response.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (channels) console.log("channels: ", channels);
  }, [channels]);
  return (
    <div>
      <div className="container">
        <div className="row">
          
          {channels?.map((channel, index) => (
            <Card1
              key={index}
              link={"/u/" + this.state.Channels[index].name}
              image={"http://98.237.41.63:1337" + channel.pfp[0].url}
              title={channel.name}
              subTitle={
                <Badge
                  color={
                    (channel.rank === "Owner" ? "success" : "info") ||
                    (channel.rank === "Staff" ? "primary" : "info")
                  }
                  pill
                >
                  {channel.rank}
                </Badge>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
