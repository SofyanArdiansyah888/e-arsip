import { useEffect } from "react";
import About from "./Components/About";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import SambutanKadis from "./Components/SambutanKadis";
import Layout from "./Layouts";
import Lucide from "@/base-components/Lucide";
import waUrl from "../../assets/images/whatsapp.png";

export default function Beranda() {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
    return () => {
      body.style.background = "#0f172a";
      body.style.padding = "16px";
    };
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
          <a href="https://wa.me/08114344494?text=Hallo%20sekda" target="_blank">
            <div className="w-16 h-16 bg-green-700 sticky bottom-6 rounded-full left-[94%] flex items-center animate-bounce">
              <img src={waUrl} />
            </div>
          </a>
        </>
      </Layout>
    </>
  );
}
