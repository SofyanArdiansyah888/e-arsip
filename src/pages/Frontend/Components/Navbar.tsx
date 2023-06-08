import { Link, useLocation } from "react-router-dom";
import urlLogo from "../../../../src/assets/images/berakhlak.png";
import { useState } from "react";

export default function Navbar() {
  const { hash } = useLocation();
  const [isSubLayanan, setIsSubLayanan] = useState(false);
  const [isMenuClick, setIsMenuClick] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <p className="text-2xl text-red-700 uppercase font-semibold self-end">
            Simpel
          </p>
          <img src={urlLogo} className="h-12 ml-2 md:ml-6 w-32 md:w-auto  md:flex" alt="Logo" />
        </a>

        <div className="flex items-center">
          <div
            className={`items-center justify-between  w-full ${isMenuClick ? 'absolute' : 'hidden'}  top-12 right-0 md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* BERANDA */}
              <li>
                <Link
                  to="/"
                  className={`block py-2 pl-3 pr-4 rounded md:bg-transparent  md:p-0 ${
                    "/" === hash ? "text-green-700" : "text-slate-700"
                  } `}
                  aria-current="page"
                >
                  Beranda
                </Link>
              </li>

              {/* PROFIL */}
              <li>
                <div className="group relative">
                  <button
                    className={`menu-hover block py-2 pl-3 pr-4 rounded md:bg-transparent  md:p-0 ${
                      "/" === hash ? "text-green-700" : "text-slate-700"
                    } `}
                  >
                    Profil
                  </button>
                  <div
                    className={`absolute invisible group-hover:visible  z-10 top-5 w-auto min-w-[150px] text-sm bg-white border border-gray-100 rounded-lg shadow-md px-2 py-4 cursor-pointer`}
                  >
                    <ul className="space-y-1" role="none">
                      <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                        <Link to="/maluku-utara">Maluku Utara</Link>
                      </li>
                      <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                        <Link to="/profil-pejabat">Profil Pejabat</Link>
                      </li>
                      <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                        <Link to="/visi-misi">Visi Misi</Link>
                      </li>
                      <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                        <Link to="/struktur-organisasi">
                          Struktur Organisasi
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* LAYANAN */}
              <li>
                <div className="group relative">
                  <button
                    className={`block py-2 pl-3 pr-4 rounded md:bg-transparent  md:p-0 ${
                      "/layanan" === hash ? "text-green-700" : "text-slate-700"
                    } `}
                  >
                    Layanan
                  </button>
                  <div
                    className={`absolute invisible group-hover:visible  z-10 top-5 w-auto min-w-[150px] text-sm bg-white border border-gray-100 rounded-lg shadow-md px-2 py-4 cursor-pointer`}
                  >
                    <ul className="space-y-1">
                      <li
                        className="hover:bg-green-200 py-2 px-1 rounded-md group relative"
                        onMouseEnter={() => setIsSubLayanan(true)}
                        onMouseLeave={() => setIsSubLayanan(false)}
                      >
                        Surat
                        <div
                          className={`absolute min-w-[150px]  left-[132px] top-0 z-10 bg-white border border-gray-100 rounded-lg shadow-md px-2 py-4 cursor-pointer ${
                            isSubLayanan ? "" : "hidden"
                          }`}
                        >
                          <ul>
                            <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                              SOP Persuratan
                            </li>
                            <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                              <Link to="/pencarian">Traking Surat</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                        <Link to="/profil-pejabat">Posisi Sekda</Link>
                      </li>
                      <li className="hover:bg-green-200 py-2 px-1 rounded-md">
                        <Link to="/pengaduan"> Pengaduan</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center md:order-2 md:ml-12">
            <Link to="/login">
              <button
                type="button"
                className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Login
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg relative md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setIsMenuClick(res => !res)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
