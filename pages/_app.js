import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContextProvider from "./components/UserContextProvider";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
