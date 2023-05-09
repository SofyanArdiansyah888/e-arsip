import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { hash } = useLocation();
  const menus = [
    {
      name: "Beranda",
      link: "/beranda#beranda",
    },
    {
      name: "Tentang Kami",
      link: "/beranda#about",
    },
    {
      name: "Berita",
      link: "/beranda#berita",
    },
    {
      name: "Kontak",
      link: "/beranda#kontak",
    },
    
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src="logo.png" className="h-12 mr-3" alt="Logo Pemprov" />
        </a>
        <div className="flex md:order-2">
          <Link to="/login">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          </Link>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
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
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menus.map((menu, index) => (
              <li key={index}>
                <a
                  href={menu.link}
                  className={`block py-2 pl-3 pr-4 rounded md:bg-transparent  md:p-0 ${
                    menu.link === hash ? "text-green-700" : "text-slate-700"
                  } `}
                  aria-current="page"
                >
                  {menu.name}
                </a>
              </li>
            ))}
            <Link
              to="/pencarian"
              className={`block py-2 pl-3 pr-4 rounded md:bg-transparent  md:p-0 ${
                'pencarian' === hash ? "text-green-700" : "text-slate-700"
              } `}
              aria-current="page"
            >
              Cari Surat
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
