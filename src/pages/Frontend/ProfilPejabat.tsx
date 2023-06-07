import { useGet } from "@/hooks/useApi";
import sekdaUrl from "@/assets/images/sekda.jpg";
import LokasiSekda from "@/models/LokasiSekda.entity";
import { GetDetailPayload } from "@/models/GenericPayload";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
export default function ProfilPejabat() {
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
      <section id="sambutan" className="py-48 text-center bg-zinc-50 h-screen  lg:px-48">
        <div className="flex flex-col xl:flex-row  items-center">
          <div className=" h-auto mb-24 xl:mb-0 relative">
            <img
              src={sekdaUrl}
              className=" rounded-lg h-80  w-72 mx-auto  bg-white object-fill relative z-10"
            />

            {!isLoading && (
              <div
                className={`mt-8 p-3  rounded-xl font-semibold  text-white capitalize ${
                  data?.data.lokasi === "berada di kantor"
                    ? "bg-green-600"
                    : "bg-red-600"
                } z-10 relative`}
              >
                {data?.data.lokasi}
              </div>
            )}

            <div className="bg-gray-200 h-72 w-64 rounded-md absolute bottom-16 -left-4 opacity-50  "></div>
          </div>

          <div className="w-3/4 text-left space-y-8 mx-8 lg:ml-24 self-center mb-16 ">
            <h3 className="text-4xl font-semibold">Sekda Maluku Utara</h3>
            <p className="leading-7">
              Drs. Samsuddin Abdul Kadir, M.Si lahir di Ternate, Maluku Utara
              pada tanggal 12 Oktober 1970. Pada Tahun 1990 Drs. Samsuddin Abdul
              Kadir, M.Si menyelesaikan Pendidikan di SMA Negeri 1, kemudian
              menempuh Pendidikan di Sekolah Tinggi Pemerintah Dalam Negeri
              (STPDN) angkatan 02 Tahun 1993 dan IPP Jakarta Tahun 1999. Beliau
              juga melanjutkan Pendidikan S2 di UMMU pada tahun 2020. Dengan
              ketekunan dan motivasi untuk terus belajar dan berkontribusi untuk
              daerah.
            </p>
            <h3 className="text-xl font-semibold">Drs. SAMSUDDIN A.KADIR</h3>
          </div>
        </div>
      </section>
    </Layout>
  );
}
