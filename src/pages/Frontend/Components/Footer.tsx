export default function Footer() {
  return (
    <footer className=" bottom-0 left-0 z-20 w-full p-4 bg-green-700 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-white sm:text-center ">
        © 2023{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Sabrina™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
        <li>
          <a href="#beranda" className="mr-4 hover:underline md:mr-6">
            Beranda
          </a>
        </li>
        <li>
          <a href="#sambutan" className="mr-4 hover:underline md:mr-6">
            Sambutan
          </a>
        </li>
        <li>
          <a href="#about" className="mr-4 hover:underline md:mr-6">
            Tentang Kami
          </a>
        </li>
       
      </ul>
    </footer>
  );
}
