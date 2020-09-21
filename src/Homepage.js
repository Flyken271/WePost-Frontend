import React, { useState, useEffect } from "react";
import Card1 from "./Card1";
import axios from "axios";
import { useUserCtx } from "./userContext";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Homepage = () => {
  const { user1 } = useUserCtx();
  const [channels, setChannels] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    console.log("homepage mounted");
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.wepost.xyz/Posts?_sort=created_at:desc"
      );
      //console.log("response: ", response);
      setChannels(response.data);
    };
    fetchData();
    //console.log("user: ", user1?.business);
  }, [user1]);

  const handleClaim = (id, userid) => {
    axios
      .put(
        "https://api.wepost.xyz/Posts/" + id,
        {
          claim: userid,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(toggle());
  };

  return (
    <div>
      <div className="container">
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>You've claimed this post!</ModalHeader>
          <ModalBody>
            You've claimed this post, time to get to work, be sure to read the{" "}
            <a id="tosLink" href="/tos">
              Terms of Service
            </a>{" "}
            page. Be sure to follow the TOS and site rules to be rewarded the
            most.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        {channels
          ?.filter((channel) => {
            return channel.pinned;
          })
          .map(({ id, Title, content, pinned, user, created_at }) => (
            <Card1
              bodyStyle={{ border: "3px solid red" }}
              title={pinned ? id + " - " + Title : id + " - " + Title}
              content={content}
              key={id}
              bcolor={(user?.id === 1 && "light") || "success"}
              btext={<a href={"/u/" + user?.username}>{user?.username}</a>}
              date={created_at.split("T")[0]}
            />
          ))}
        {channels
          ?.filter((channel) => {
            return !channel.pinned && !channel.claim;
          })
          .map(({ id, Title, content, pinned, user, created_at }) => (
            <Card1
              link={"/post/" + id}
              title={id + " - " + Title}
              content={content}
              key={id}
              bcolor={(user?.id === 1 && "light") || "success"}
              btext={<a href={"/u/" + user?.username}>{user?.username}</a>}
              date={created_at.split("T")[0]}
              onClaim={() => handleClaim(id, user?.id)}
              claim={
                user?.business ? "Claim - You cannot claim Posts" : "Claim"
              }
              disable={user?.business ? true : false}
            />
          ))}

        {channels
          ?.filter((channel) => {
            return !channel.pinned && channel.claim;
          })
          .map(({ id, Title, content, pinned, user, created_at, claim }) => (
            <Card1
              link={"/post/" + id}
              title={"Claimed - " + Title}
              content={content}
              key={id}
              bcolor={(user?.id === 1 && "light") || "success"}
              btext={<a href={"/u/" + user?.username}>{user?.username}</a>}
              date={created_at.split("T")[0]}
              onClaim={() => handleClaim(id, user?.id)}
              claim={"Claimed - " + claim.username}
              disable={true}
            />
          ))}
      </div>
    </div>
  );
};

export default Homepage;
