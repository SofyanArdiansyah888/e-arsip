import { useEffect } from "react";
import About from "./Components/About";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import SambutanKadis from "./Components/SambutanKadis";
import Layout from "./Layouts";

export default function Beranda() {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
    return () => {
      body.style.background = "#0f172a"
      body.style.padding = '16px'
    }
  }, []);
  const menus = [
    {
      name: "Beranda",
      link: "#beranda",
    },
    {
      name: "Sambutan",
      link: "#sambutan",
    },
    {
      name: "Tentang Kami",
      link: "#about",
    },
    
    
  ];
  return (
    <>
      <Layout>
        <>
          <Navbar menus={menus} />
          <Hero />
          <SambutanKadis />
          <About />
          
          
        </>
      </Layout>
    </>
  );
}
