import Head from "next/head";
import { Button, Badge } from "reactstrap";
import styles from "../styles/Home.module.css";
import Axios from 'axios';

const Page = ({ id, posts }) => {
  return (
    <>
      <Button
        className={styles.backButton}
        href="/"
        style={{ margin: "20px" }}
        color="danger"
      >
        Back
      </Button>
      <div className={styles.container}>
        <Head>
          <title>WePost - {id}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.idmain}>
            {posts.map((post, index) => {
              return id == post.id ? (
                <span key={index} className={styles.article}>
                  <h3>{post.Title}</h3>
                  <p>{post.content}</p>
                  <br />
                  <h6>by <Badge color="success">{post?.user?.username}</Badge></h6>
                </span>
              ) : (
                <></>
              );
            })}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const response = await Axios.get(
    "https://api.wepost.xyz/posts"
  );
  var posts = response.data;
  return {
    props: {
      id,
      posts,
    },
  };
}

export default Page;
