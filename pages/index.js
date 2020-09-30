import Head from "next/head";
import Link from "next/link";
import { Button } from "reactstrap";
import styles from "../styles/Home.module.css";
import Strapi from "strapi-sdk-javascript";
const strapi = new Strapi("https://api.wepost.xyz/");
import { useAPI } from "./components/UserContextProvider";

export default function Home(posts) {
  const { user } = useAPI();
  return (
    <>
      {user.id ? (
        <>
          <Link href="/new/">
            <Button
              className={styles.menuButtons}
              style={{ margin: "20px" }}
              color="info"
            >
              New
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login/">
            <Button
              className={styles.menuButtons}
              style={{ margin: "20px" }}
              color="success"
            >
              Login
            </Button>
          </Link>
          <Link href="/register/">
            <Button
              className={styles.menuButtons}
              style={{ margin: "20px" }}
              color="warning"
            >
              Register
            </Button>
          </Link>
        </>
      )}

      <div className={styles.container}>
        <Head>
          <title>WePost - Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            {user.id ? (
              <>
                Welcome back, <a href="/">{user?.username}</a>
              </>
            ) : (
              <>
                Welcome to <a href="/">WePost!</a>
              </>
            )}
          </h1>

          <div className={styles.grid}>
            {posts.posts.map((post, index) => {
              return (
                <a key={index} href={`/${post.id}`} className={styles.card}>
                  <h3>{post.Title}</h3>
                  <p style={{ maxWidth: "250px" }}>{post.content}</p>
                  <br />
                  <h6>by {post.user?.username}</h6>
                </a>
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
}

export async function getServerSideProps() {
  const response = await strapi.getEntries("posts?_sort=created_at:DESC");
  var posts = response;

  return {
    props: {
      posts,
    },
  };
}
