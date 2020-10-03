import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import Strapi from "strapi-sdk-javascript";
const strapi = new Strapi("");
import styles from "../styles/Home.module.css";
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const router = useRouter();
  const handleLogon = (e) => {
    e.preventDefault();
    Axios.post("https://api.wepost.xyz/auth/local", {
      identifier: email,
      password: password,
    }).then((response) => {
      window.localStorage.setItem("jwt", response.data.jwt);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>WePost - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Login to <a href="/">WePost!</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/">
            <Button style={{ margin: "20px" }} color="success">
              Home
            </Button>
          </Link>
        </div>

        <form>
          <label>Username or Email:</label>
          <input
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Username or Email"
          />
          <small className="form-text text-muted">
            We'll never share your email or give out information.
          </small>
          <br />
          <label>Password:</label>
          <input
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <br />
          <Button color="success" onClick={(e) => handleLogon(e)}>
            Submit
          </Button>
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
