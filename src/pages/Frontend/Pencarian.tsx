import { useEffect, useState } from "react";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import Lucide from "@/base-components/Lucide";
import { Menu } from "@/base-components/Headless";
import { useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import SuratEntity from "@/models/Surat.entity";

export default function Pencarian() {
  const [showFilter, setShowFilter] = useState(false);
  const [jenisSurat, setJenisSurat] = useState("surat umum");
  const [cariFilter, setCariFilter] = useState<
    "Nomor Surat" | "Asal Surat" | "Perihal"
  >("Nomor Surat");

  const [search, setSearch] = useState('')

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
  }, []);

  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<SuratEntity>>({
    name: "pencarian",
    endpoint: `pencarian`,
    filter: {
      limit: 100,
      jenis_surat: jenisSurat,
      search
    },
  });
  useEffect(() => {
    setTimeout(() => {
      refetch();
    },300)
    
  }, [search]);

  return (
    <Layout>
      <Navbar />
      <div className="mt-20 pt-12 px-8 min-h-screen space-y-8">
        <h1 className="font-semibold text-2xl">Silahkan Cari Surat Anda</h1>
        <div className="mb-6">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={jenisSurat}
            onChange={(e) => setJenisSurat(e.target.value)}
          >
            <option value="surat mutasi">Surat Mutasi</option>
            <option value="bantuan dana">Bantuan Dana</option>
            <option value="surat umum">Surat Umum</option>
          </select>
        </div>
        <div className="mb-6 relative">
          <input
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder={cariFilter}
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Lucide
            icon="Filter"
            className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
            onClick={() => setShowFilter((filter) => !filter)}
          />
          {showFilter && (
            <Menu className="absolute right-0 top-12 z-30 bg-white shadow-md px-4 rounded-lg py-4 ">
              <Menu.Item
                onClick={() => {
                  setCariFilter("Nomor Surat");
                  setShowFilter(false);
                }}
              >
                Nomor Surat
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setCariFilter("Asal Surat");
                  setShowFilter(false);
                }}
              >
                Asal Surat
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setCariFilter("Perihal");
                  setShowFilter(false);
                }}
              >
                Perihal
              </Menu.Item>
            </Menu>
          )}
        </div>

        <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nomor Surat
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Masuk
                </th>
                <th scope="col" className="px-6 py-3">
                  Perihal
                </th>
                <th scope="col" className="px-6 py-3">
                  Dari
                </th>
                <th scope="col" className="px-6 py-3">
                  Ditujukan
                </th>
                <th scope="col" className="px-6 py-3">
                  Posisi Surat
                </th>
                <th scope="col" className="px-6 py-3">
                  Disposisi
                </th>
                <th scope="col" className="px-6 py-3">
                  Catatan
                </th>
                <th scope="col" className="px-6 py-3">
                  Diteruskan Kepada
                </th>
              </tr>
            </thead>
            <tbody>
              {
                payload?.data.length === 0 && <tr><td colSpan={99} className="text-center px-6 py-4 text-lg font-light">Silahkan Cari Surat....</td></tr>
              }
              {payload?.data.map((surat) => (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-6 py-4">{surat.nomor_surat}</td>
                  <td className="px-6 py-4">{surat.tanggal_masuk}</td>
                  <td className="px-6 py-4">{surat.perihal}</td>
                  <td className="px-6 py-4">{surat.dari}</td>
                  <td className="px-6 py-4">{surat.ditujukan}</td>
                  <td className="px-6 py-4">{surat.posisi_surat}</td>
                  <td className="px-6 py-4">{surat.disposisi}</td>
                  <td className="px-6 py-4">{surat.catatan}</td>
                  <td className="px-6 py-4">{surat.diteruskan_kepada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#BBF7D0"
          fill-opacity="0.5"
          d="M0,32L24,74.7C48,117,96,203,144,224C192,245,240,203,288,192C336,181,384,203,432,202.7C480,203,528,181,576,165.3C624,149,672,139,720,154.7C768,171,816,213,864,234.7C912,256,960,256,1008,213.3C1056,171,1104,85,1152,69.3C1200,53,1248,107,1296,117.3C1344,128,1392,96,1416,80L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
        ></path>
      </svg>
    </Layout>
  );
}
