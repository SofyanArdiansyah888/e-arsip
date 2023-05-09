import React from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
