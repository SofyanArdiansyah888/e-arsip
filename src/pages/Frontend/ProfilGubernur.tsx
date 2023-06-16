import sekdaUrl from "@/assets/images/sekda.jpg";
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Layout from "./Layouts";
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
        <div className="flex flex-col gap-12  items-center space-y-8">
          <h3 className="text-3xl font-semibold capitalize text-center mb-4">
            SEKRETARIS DAERAH PROVINSI MALUKU UTARA
          </h3>
          <div className=" h-auto mb-24 xl:mb-0 relative">
            <img
              src={sekdaUrl}
              className=" rounded-lg h-80  w-72 mx-auto  bg-white object-fill relative z-10"
            />

            <div className="bg-gray-200 h-72 w-64 rounded-md absolute bottom-16 -left-4 opacity-50  "></div>
          </div>

          <div className="w-3/4 text-left space-y-8 mx-8 lg:ml-24 self-center mb-16 ">
            <div className="space-y-3">
              <p>
                <strong>Nama:</strong> Drs. Samsuddin Abdul Kadir, M.Si{" "}
              </p>
              <p>
                <strong>Nip:</strong> 19701012 199101 1 003
              </p>
              <p>
                <strong>Pangkat/Gol:</strong> Pembina Utama, IV/e
              </p>
              <p>
                <strong>Tempat/Tanggal Lahir:</strong> Ternate, 12 Oktober 1970.{" "}
              </p>
              <p>
                <strong>Pendidikan:</strong>
              </p>
              <ul className="list-disc ml-12 space-y-2">
                <li>S3 di UMMU Pada tahun 2022</li>
                <li>S2 di UMMU Pada tahun 2020</li>
                <li>IPP Jakarta Tahun 1999</li>
                <li>
                  Sekolah Tinggi Pemerintah Dalam Negeri (STPDN) angkatan 02
                  Tahun 1993
                </li>
              </ul>
              <p>
                <strong>Riwayat Pekerjaan:</strong>
              </p>
              <ul className="list-disc ml-12 space-y-2">
                <li>
                  Tahun 2020 Sekretaris Daerah Provinsi Maluku Utara – Sekarang.
                </li>
                <li>
                  Tahun 2019 Kepala Badan Perencanaan dan Pembangunan Daerah
                  Provinsi Maluku Utara
                </li>
                <li>
                  Tahun 2017 Kepala Dinas Pariwisata Provinsi Maluku Utara
                </li>
                <li>Tahun 2016 Pj. Bupati Pulau Morotai</li>
                <li>Tahun 2016 Kepala Satpol PP Provinsi Maluku Utara</li>
                <li>
                  Tahun 2014 Kepala Badan Kesbangpol Provinsi Maluku Utara
                </li>
                <li>
                  Tahun 2013 Plt. Sekretaris Daerah Kabupaten Pulau Morota
                </li>
                <li>
                  Tahun 2011 Kepala Badan Perencanaan Pembangunan Daerah
                  Kabupaten Pulau Morota
                </li>
                <li>
                  Tahun 2011 Sekretaris Badan Penanggulangan Bencana Daerah
                  Kabupaten Pulau Morotai
                </li>
                <li>
                  Tahun 2007 Plt. Kepala Badan Pemberdayan Masyarakat Desa
                  Kabupaten Halmahera Timur
                </li>
                <li>Tahun 2001 Pj. Sekretaris Camat Wasile Selatan</li>
                <li>
                  Tahun 2000 Sekretaris kecamatan; tahun 2001 Plt Camat Wasile
                  Selatan
                </li>
              </ul>
            </div>

            {/* <h3 className="text-xl font-semibold">Drs.Samsuddin A.Kadir, M.Si</h3> */}
          </div>
        </div>
      </section>
    </Layout>
  );
}
