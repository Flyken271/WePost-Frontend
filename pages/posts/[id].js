import axios from "axios";
import { Jumbotron, Badge } from "reactstrap";
const Post = ({ id, post }) => {
  //console.log("post: ", post);
  return (
    <>
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
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  /* this is where we fetch your posts */
  const response = await axios.get(`https://api.wepost.xyz/Posts/${id}`);
  return {
    props: {
      id,
      post: response.data,
      channels: response.data,
    },
  };
}

export default Post;
