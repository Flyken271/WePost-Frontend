import Navbar1 from "@/components/Navbar";
import Footer1 from "@/components/Footer1";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar1 navbarBrand="WePost" />
      <main>{children}</main>
      <Footer1 />
    </>
  );
};
export default Layout;
