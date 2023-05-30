import React from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import waUrl from "../../assets/images/whatsapp.png";
const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      
      {children}
      <Footer />
      <a href="https://wa.me/08114344494?text=Hallo%20sekda" target="_blank">
            <div className="w-16 h-16 bg-green-700 sticky bottom-6 rounded-full left-[94%] flex items-center animate-bounce">
              <img src={waUrl} />
            </div>
          </a>
    </div>
  );
}

export default Layout;
