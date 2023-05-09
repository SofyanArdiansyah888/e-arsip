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
  return (
    <>
      <Layout>
        <>
          <Hero />
          <About />
          <Berita />
        </>
      </Layout>
    </>
  );
}
