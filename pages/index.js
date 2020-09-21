import Card1 from "./Card1";
import axios from "axios";
import { useState } from "react";
import { useUserCtx } from "../components/userContext";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const IndexPage = ({ channels }) => {
  const [modal, setModal] = useState(false);
  const { user1 } = useUserCtx();
  const toggle = () => setModal(!modal);
  console.log("channels: ", channels);

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
    <>
      <div className="container home">
        <Modal id="modalclaim" isOpen={modal} toggle={toggle}>
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
              link={"/posts/" + id}
              bodyStyle={{ border: "3px solid red" }}
              title={pinned ? id + " - " + Title : id + " - " + Title}
              content={content}
              key={id}
              bcolor={(user?.id === 1 && "light") || "success"}
              btext={user?.username}
              date={created_at.split("T")[0]}
              claim={"Unclaimable"}
              disable={true}
            />
          ))}
        {channels
          ?.filter((channel) => {
            return !channel.pinned && !channel.claim;
          })
          .map(({ id, Title, content, pinned, user, created_at }) => (
            <Card1
              link={"/posts/" + id}
              title={id + " - " + Title}
              content={content}
              key={id}
              bcolor={(user?.id === 1 && "light") || "success"}
              btext={user?.username}
              date={created_at.split("T")[0]}
              onClaim={() => handleClaim(id, user?.id)}
              claim={
                user1?.business ? "Claim - You cannot claim Posts" : "Claim"
              }
              disable={user1?.business ? true : false}
            />
          ))}

        {channels
          ?.filter((channel) => {
            return !channel.pinned && channel.claim;
          })
          .map(({ id, Title, content, pinned, user, created_at, claim }) => (
            <Card1
              link={"/posts/" + id}
              title={"Claimed - " + Title}
              content={content}
              key={id}
              bcolor={(user?.id === 1 && "light") || "success"}
              btext={user?.username}
              date={created_at.split("T")[0]}
              claim={"Claimed - " + claim.username}
              disable={true}
            />
          ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  /* this is where we fetch your posts */
  const response = await axios.get(
    "https://api.wepost.xyz/Posts?_sort=created_at:desc"
  );

  return {
    props: {
      channels: response.data,
    },
    revalidate: 1,
  };
}

export default IndexPage;
