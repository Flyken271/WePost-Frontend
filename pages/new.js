import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import styles from "../styles/Home.module.css";
import { useAPI } from "./components/UserContextProvider";
import Axios from "axios";

export default function New() {
  const { user } = useAPI();
  const [title, setTitle] = useState(0);
  const [content, setContent] = useState(0);
  const router = useRouter();

  const handleNew = (e) => {
    e.preventDefault();
    console.log(window.localStorage.getItem("jwt"));
    console.log("creds", title + " : " + content);
    Axios.post(
      "https://api.wepost.xyz/posts",
      {
        Title: title,
        content: content,
        user: user,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("jwt")
            .replace(/['"]+/g, "")}`,
        },
      }
    )
      .then((response) => {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>WePost - New</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Create a new article.</h1>

        <div className={styles.grid}>
          <Link href="/">
            <Button style={{ margin: "20px" }} color="success">
              Home
            </Button>
          </Link>
        </div>

        <form>
          <label>Title: </label>
          <input
            className="form-control"
            onChange={(e) => {
              if (e.target.value.length >= 40) {
                alert("The title cannot exceed 40 characters!");
                e.target.value = "";
              } else {
                setTitle(e.target.value);
              }
            }}
            type="text"
            placeholder="Username or Email"
          />
          <br />
          <label>Article: </label>
          <textarea
            rows="10"
            cols="80"
            style={{ resize: "none" }}
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <Button onClick={(e) => handleNew(e)}>Submit</Button>
        </form>
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
  );
}
