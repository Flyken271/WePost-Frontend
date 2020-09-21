import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/App.css";
import "@/styles/index.css";
import "@/styles/homepage.css";
import Layout from "@/components/layout";
import { UserProvider } from "@/components/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
