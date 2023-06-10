import React from "react";
import waUrl from "../../assets/images/whatsapp.png";
import Footer from "./Components/Footer";
const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      
      {children}
      <a href="https://wa.me/08114344494?text=Hallo%Admin" target="_blank" className="fixed right-4 bottom-4">
            <div className="w-16 h-16 bg-green-700 sticky bottom-6 rounded-full left-[94%] flex items-center animate-bounce">
              <img src={waUrl} />
            </div>
          </a>
      <Footer />
    
    </div>
  );
}

export default Layout;
