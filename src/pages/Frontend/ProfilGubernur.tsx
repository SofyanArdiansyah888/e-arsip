import gubernurUrl from "@/assets/images/gubernur.jpg";
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Layout from "./Layouts";
import indonesiaUrl from '../../assets/images/indonesia.jpg'
export default function ProfilGubernur() {
  
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
      <section
        id="sambutan"
        className="pb-48 pt-40 text-center bg-zinc-50   min-h-[calc(100vh-70px)]  lg:px-48"
      >
        <div className="flex flex-col gap-12  items-center space-y-8 relative">
          <h3 className="text-3xl font-semibold capitalize text-center mb-4">
            GUBERNUR MALUKU UTARA
          </h3>
          <div className=" h-auto mb-24 xl:mb-0">
            <img
              src={gubernurUrl}
              className=" rounded-lg h-80  w-72 mx-auto  bg-white object-fill relative z-10"
            />

            <div className="bg-gray-200 h-72 w-64 rounded-md absolute bottom-16 -left-4 opacity-50  "></div>
          </div>

          <div className="w-3/4 text-left space-y-8 mx-8 lg:ml-24 self-center mb-16 ">
            <div className="space-y-3">
              <p>
                <strong>Tempat/Tanggal Lahir:</strong> Bibinoi, Halmahera Selatan, Maluku Utara 21  Desember 1951
              </p>
              <p>
                <strong>Pengalaman Jabatan / Pekerjaan:</strong>
              </p>
              <ul className="list-disc ml-12 space-y-2">
                <li>1976 s.d. 1977: Sekretaris Persatuan Pelajar Mahasiswa Medinasi</li>
                <li>1983 s.d. 1990: Kepala Inspeksi Al Khairat Maluku Utara - Irian Jaya</li>
                <li>1994 s.d. 1999: Wakil Ketua Majelis Ulama Provinsi Maluku Utara</li>
                <li>2004 s.d. 2007: Anggota DPR-RI dari Partai Keadilan Sejahtera</li>
                <li>2008 s.d. 2013: Wakil Gubernur Maluku Utara</li>
                <li>2014 s.d. 2019: Gubernur Maluku Utara</li>
                <li>2019 s.d sekarang : Gubernur Maluku Utara (Periode ke-2)</li>
              </ul>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
