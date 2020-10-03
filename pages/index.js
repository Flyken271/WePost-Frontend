import {useState} from 'react'
import Head from "next/head";
import Link from "next/link";
import { Button } from "reactstrap";
import styles from "../styles/Home.module.css";
import { useAPI } from "./components/UserContextProvider";
import Axios from "axios";
import { useRouter } from "next/router";

export default function Home(posts) {
  const { user } = useAPI();
  const [search, setSearch] = useState(0);
  const router = useRouter();


  const handleSearch = (e) => {
    e.preventDefault();
    posts.posts.map((post, index)=>{
      if(post.Title.includes(search)){
        router.push('/'+post.id);
      }
    })
  }

  return (
    <>
    <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
      <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
    </form>
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
            href="https://flyken.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by Jared Collins, Copyright C - Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await Axios.get(
    "https://api.wepost.xyz/posts?_sort=created_at:DESC"
  );
  var posts = response.data;

  return {
    props: {
      posts,
    },
  };
}
