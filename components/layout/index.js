import Navbar1 from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>WePost - Freelancing</title>
        <meta
          name="description"
          content="WePost, post job offers for freelancers to complete."
        />
      </Head>
      <Navbar1
        navbarBrand={<img src="/logo192.png" width="350" height="150" />}
      />
      <main>{children}</main>
      <Footer1 />
    </>
  );
};
export default Layout;
