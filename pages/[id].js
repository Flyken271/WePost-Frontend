import Strapi from "strapi-sdk-javascript";
const strapi = new Strapi("http://api.wepost.xyz/");
import Head from "next/head";
import { Button } from "reactstrap";
import styles from "../styles/Home.module.css";

const Page = ({ id, posts }) => {
  console.log(posts);
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

        <main className={styles.main}>
          <div className={styles.grid}>
            {posts.map((post, index) => {
              return id == post.id ? (
                <span key={index} className={styles.card}>
                  <h3>{post.Title}</h3>
                  <p>{post.content}</p>
                  <br />
                  <h6>by {post.user?.username}</h6>
                </span>
              ) : (
                <></>
              );
            })}
          </div>
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
  const response = await strapi.getEntries("Posts");
  var posts = response;
  return {
    props: {
      id,
      posts,
    },
  };
}

export default Page;
