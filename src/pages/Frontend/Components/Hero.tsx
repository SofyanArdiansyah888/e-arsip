import Lucide from "@/base-components/Lucide";
import { Link } from "react-router-dom";
import sliderUrl from '../../../assets/images/slider.jpeg'
export default function Hero() {
  return (
    <section
      id="beranda"
      className={`w-full flex items-center h-[85vh] mt-[70px] bg-cover bg-center bg-no-repeat  bg-gray-600 bg-blend-multiply`}
      style={{
        backgroundImage:`url(${sliderUrl})`
      }}
    >
      <div className="px-4 mx-auto  text-center lg:py-56 items-center ">
        <h1 className="mb-4 text-4xl font-extralight tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
       <strong className="text-red-500 font-extrabold">Si</strong> stem Infor <strong className="text-red-500 font-extrabold">M</strong> asi <strong className="text-red-500 font-extrabold">Pel</strong> ayanan Sekretaris Daerah
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Checking surat online Sekretaris Daerah Provinsi Maluku Utara
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to="/pencarian"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
          >
            Cari Surat Disini
            <Lucide icon="Search" className="ml-8" />
          </Link>
        </div>
      </div>
    </section>
  );
}
