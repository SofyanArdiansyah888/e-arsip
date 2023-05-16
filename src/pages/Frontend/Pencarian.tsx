import { useEffect, useState } from "react";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import Lucide from "@/base-components/Lucide";
import { Menu } from "@/base-components/Headless";

export default function Pencarian() {
  const [showFilter, setShowFilter] = useState(false);
  const [cariFilter, setCariFilter] = useState<
    "Nomor Surat" | "Asal Surat" | "Perihal"
  >("Nomor Surat");

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
  }, []);
  const menus = [
    {
      name: "Beranda",
      link: "/",
    },
    {
      name: "Tentang Kami",
      link: "/",
    },
    {
      name: "Berita",
      link: "/",
    },
    {
      name: "Kontak",
      link: "/",
    },
  ];
  return (
    <Layout>
      <Navbar menus={menus} />
      <div className="mt-20 pt-12 px-8 min-h-screen space-y-8">
        <h1 className="font-semibold text-2xl">Silahkan Cari Surat Anda</h1>
        <div className="mb-6">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Pilih Jenis Surat</option>
            <option>Surat Mutasi</option>
            <option>Bantuan Dana</option>
            <option>Surat Umum</option>
          </select>
        </div>
        <div className="mb-6 relative">
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder={cariFilter}
            required
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
                  No
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
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td className="px-6 py-4">1  Januari 2023</td>
                <td className="px-6 py-4">Surat Perintah Makan-makan</td>
                <td className="px-6 py-4">Baco</td>
                <td className="px-6 py-4">Besse</td>
                <td className="px-6 py-4">Atap Genteng</td>
              </tr>
          
              
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
