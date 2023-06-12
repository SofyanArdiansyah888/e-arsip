import { useGet } from "@/hooks/useApi";
import sekdaUrl from "@/assets/images/sekda.jpg";
import LokasiSekda from "@/models/LokasiSekda.entity";
import { GetDetailPayload } from "@/models/GenericPayload";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
export default function VisiMisi() {
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
      <section
        id="sambutan"
        className="pb-48 pt-40 text-center bg-zinc-50 h-auto  lg:px-48"
      >
        <h1 className="text-3xl font-semibold ">Visi Misi</h1>
        <div className="border-b-4 border-gray-200 w-[350px] mb-24 mt-2 mx-auto"></div>

        <div className="px-4 py-6 text-left bg-white shadow-sm space-y-2">
          <h1 className="text-2xl font-semibold">Visi</h1>
          <p>Maluku Utara Sejahtera</p>
        </div>

        <div className="px-4 py-6 text-left bg-white shadow-sm space-y-2 mt-4">
          <h1 className="text-2xl font-semibold">Misi</h1>
          <ol className="space-y-3 list-decimal ml-4">
            <li>
              Membangun Sumber Daya Manusia yang sehat, cerdas dan berbudaya
            </li>
            <li>
              Mengakserasi pembangunan infrastruktur, konektivitas dan
              pengembangan wilayah
            </li>
            <li>
              Membangun tatanan kehidupan masyarakat yang agamais, aman, damai
              dan harmonis;
            </li>
            <li>
              Membangun perekonomian daerah yang inklusif dan berkualitas dengan
              orientasi pada nilai tambah dan pengelolaan sumberdaya alam
              berkelanjutan;
            </li>
            <li>
              Memantapkan tata kelolah pemerintahan yang lebih baik dan
              berkeadilan
            </li>
          </ol>
        </div>

        <div className="px-4 py-6 text-center bg-white shadow-sm  mt-4">
          <h1 className="text-2xl font-semibold capitalize">
          Tugas dan Fungsi Sekretariat Daerah Berdasarkan Peraturan Gubernur No. 7 Tahun 2021 Sekretariat Daerah  Provinsi Maluku Utara
          </h1>
          <p className="font-semibold mt-8 ">Tugas Pokok</p>
          <p className="mt-2">Pasal 4</p>
          <p className="leading-7 text-left mt-8">
            Sekretariat Daerah mempunyai tugas membantu Gubernur dalam
            penyusunan kebijakan dan pengkoordinasian administratif terhadap
            pelaksanaan tugas Perangkat Daerah serta pelayanan administratif.
          </p>

          <p className="font-semibold mt-8 ">Fungsi</p>
          <p className="mt-2">Pasal 5</p>
          <div className="leading-7 text-left mt-8">
            <ol className="space-y-3 list-decimal ml-4">
              <li>Pengkoordinasian penyusunan kebijakan Daerah</li>
              <li>Pengkoordinasian pelaksanaan tugas Perangkat Daerah</li>
              <li>Pemantauan dan evaluasi pelaksanaan kebijakan Daerah</li>
              <li>
                Pelayanan administratif dan pembinaan aparatur sipil negara pada
                instansi Daerah
              </li>
              <li>
                Pembinaan dan pengelolaan keuangan, sarana dan prasarana
                Pemerintahan Daerah
              </li>
              <li>
                Pelaksanaan fungsi lain yang diberikan oleh gubemur yang
                berkaitan dengan tugas dan fungsinya
              </li>
            </ol>
          </div>
        </div>
      </section>
    </Layout>
  );
}
