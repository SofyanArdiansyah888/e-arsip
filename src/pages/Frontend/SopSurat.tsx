import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import {useEffect} from "react";
import urlPersuratan from '@/assets/images/sop.png';

export default function SopSurat() {

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.style.padding = "0";
        body.style.background = "white";
        return () => {
            body.style.background = "#0f172a";
            body.style.padding = "16px";
        };
    }, []);
    return (<Layout>
        <Navbar/>
        <section
            id="sambutan"
            className="pb-48 pt-40 text-center bg-zinc-50 h-auto  lg:px-48"
        >
            <h1 className="text-3xl font-semibold ">SOP Persuratan</h1>
            <div className="border-b-4 border-gray-200 w-[350px] mb-24 mt-2 mx-auto"></div>

            <div className="px-4 py-6 text-center bg-white shadow-sm  mt-4">
                <h1 className="text-xl font-semibold capitalize">
                    SOP PENGELOLAAN SURAT MASUK UNTUK GUBERNUR, WAKIL GUBERNUR, SEKRETARIS DAERAH, DAN ASISTEN 1-3
                </h1>


                <p className="font-semibold mt-8 text-lg ">Dasar Hukum</p>

                <div className="leading-7 text-left mt-8">
                    <ol className="space-y-3 list-decimal ml-4">
                        <li>Undang Undang No.30 tentang Administrasi Pemerintahan.</li>
                        <li>Permenpan No:PER/35/M.PAN/2012 tentang Pedoman Penyusunan Standar Operasional Prosedure
                            Administrasi Pemerintahan.
                        </li>
                        <li>Permendagri No.52 Tahun 2011 tentang Standar Operasional Prosedure di Lingkungan
                            Pemerintahan Provinsi dan Kabupaten/Kota
                        </li>
                        <li>
                            Panduan Penyusunan SOP (Pergub Maluku Utara Nomor 20 tahun 2013)
                        </li>

                    </ol>
                </div>

                <img src={urlPersuratan} alt={"Gambar SOP Persuratan"} className={"mt-4 rounded-xl w-full"}/>
            </div>
        </section>
    </Layout>);
}
