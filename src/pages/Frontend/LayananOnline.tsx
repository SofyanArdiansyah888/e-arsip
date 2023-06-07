import { useGet } from "@/hooks/useApi";
import sekdaUrl from "@/assets/images/sekda.jpg";
import LokasiSekda from "@/models/LokasiSekda.entity";
import { GetDetailPayload } from "@/models/GenericPayload";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
export default function LayananOnline() {
  const { data, isLoading } = useGet<GetDetailPayload<LokasiSekda>>({
    name: "lokasi",
    endpoint: "lokasi",
  });
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
    return () => {
      body.style.background = "#0f172a";
      body.style.padding = "16px";
    };
  }, []);
  return (
    <Layout>
      <Navbar />
      <section id="sambutan" className="pb-48 pt-40 text-center bg-zinc-50 h-auto  lg:px-48">
        <h1 className="text-3xl font-semibold ">Struktur Organisasi</h1>
        <div className="border-b-4 border-gray-200 w-[350px] mb-24 mt-2 mx-auto"></div>
        <img src="https://biroumum.github.io/malut/gambar/struktur1.jpg">
        </img>
      </section>
    </Layout>
  );
}
