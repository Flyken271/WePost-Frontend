import { useState, useEffect } from "react";
import { Form, Label, Input, Button, Badge } from "reactstrap";
import axios from "axios";
import { useUserCtx } from "../components/userContext";

const Create = () => {
  const [postCred, setPostCred] = useState();
  const { user } = useUserCtx();
  useEffect(() => {
    //console.log("user: ", user);
    //console.log("postCred", postCred);
  }, [user, postCred]);

  const handlePost = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://api.wepost.xyz/Posts",
        {
          //data: {
          Title: postCred.Title,
          content: postCred.content,
          user: user,
          description: postCred.description,
          price: postCred.price,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((response) => {
        console.log("Post Created");
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
      <Form id="logonForm" onSubmit={handlePost}>
        <h1>New Post</h1>
        <h6>
          Post a new job for freelancers to claim, be very specific and
          thourough in the post content as the freelancer needs to know what
          they're doing. Please keep the posts possible, legible, in english and
          relevant. In posting a job you agree that you have read and understood
          the{" "}
          <a id="tosLink" href="/tos">
            Terms of Service
          </a>{" "}
          page. It is important that you have read the TOS page as it indicates
          many different legal things regarding you and the freelancer.
        </h6>
        <Label for="title">Title:</Label>
        <Input
          type="text"
          onChange={(e) => setPostCred({ ...postCred, Title: e.target.value })}
          id="title"
          placeholder="Post Title"
        />
        <br />
        <Label for="content">Short Description:</Label>
        <Input
          type="text"
          onChange={(e) =>
            setPostCred({ ...postCred, content: e.target.value })
          }
          id="content"
          placeholder="Post Short Description"
        />
        <br />
        <Label for="description">Long Description:</Label>
        <Input
          type="text"
          onChange={(e) =>
            setPostCred({ ...postCred, description: e.target.value })
          }
          id="content"
          placeholder="Post Long Description"
        />
        <br />
        <Label for="price">Price:</Label>
        <Input
          type="number"
          onChange={(e) => setPostCred({ ...postCred, price: e.target.value })}
          id="price"
          placeholder="Post's Reward"
        />
        <br />
        <Button style={{ marginBottom: "100px" }} color="success">
          Post
        </Button>
      </Form>
    </div>
  );
};

export default Create;
