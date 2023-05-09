import Lucide from "@/base-components/Lucide";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Berita from "./Components/Berita";
import Footer from "./Components/Footer";
import Layout from "./Layouts";

export default function Beranda() {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
  }, []);
  const menus = [
    {
      name: "Beranda",
      link: "#beranda",
    },
    {
      name: "Tentang Kami",
      link: "#about",
    },
    {
      name: "Berita",
      link: "#berita",
    },
    {
      name: "Kontak",
      link: "#kontak",
    },
  ];
  return (
    <>
      <Layout>
        <>
          <Navbar menus={menus} />
          <Hero />
          <About />
          <Berita />
        </>
      </Layout>
    </>
  );
}
