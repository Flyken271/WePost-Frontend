import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import { Button } from "reactstrap";
import Strapi from "strapi-sdk-javascript";
const strapi = new Strapi("https://api.wepost.xyz/");
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
export default function Register() {
  const [username, setUsername] = useState(0);
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const router = useRouter();
  const handleRegister = (e) => {
    e.preventDefault();
    strapi.register(username, email, password).then((response) => {
      storeUser({ user: response.user });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>WePost - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Register to <a href="/">WePost!</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/">
            <Button style={{ margin: "20px" }} color="success">
              Home
            </Button>
          </Link>
        </div>

        <form>
          <small className="form-text text-muted">
            We'll never share any information given to anyone.
          </small>
          <label>Username:</label>
          <input
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />

          <br />
          <label>Email:</label>
          <input
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <label>Password:</label>
          <input
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <br></br>
          <Button color="success" onClick={(e) => handleRegister(e)}>
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
