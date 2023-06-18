import wagubUrl from "@/assets/images/wagub.jpg";
import {useEffect} from "react";
import Navbar from "./Components/Navbar";
import Layout from "./Layouts";

export default function ProfilWakilGubernur() {

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
                className="pb-48 pt-40 text-center bg-zinc-50   min-h-[calc(100vh-70px)]  lg:px-48"
            >
                <div className="flex flex-col gap-12  items-center space-y-8">
                    <h3 className="text-3xl font-semibold capitalize text-center mb-4">
                        WAKIL GUBERNUR MALUKU UTARA
                    </h3>
                    <div className=" h-auto mb-24 xl:mb-0 relative">
                        <img
                            src={wagubUrl}
                            className=" rounded-lg h-80  w-72 mx-auto  bg-white object-fill relative z-10"
                        />

                        <div className="bg-gray-200 h-72 w-64 rounded-md absolute bottom-16 -left-4 opacity-50  "></div>
                    </div>

                    <div className="w-3/4 text-left space-y-8 mx-8 lg:ml-24 self-center mb-16 ">
                        <div className="space-y-3">

                            <p>
                                <strong>Tempat/Tanggal Lahir:</strong>Weda, Halmahera Tengah, Maluku Utara, 25 Mei 1958.
                            </p>

                            <p>
                                <strong>Riwayat Pekerjaan:</strong>
                            </p>
                            <ul className="list-disc ml-12 space-y-2">
                                <li>
                                    Bekerja di PT Hijrah Nusatama (1986)
                                </li>
                                <li>
                                    Pegawai Negeri Sipil di Departemen Pekerjaan Umum Kabupaten Halmahera Tengah (1990)
                                </li>
                                <li>
                                    Pj. Kepala Seksi Penyehatan Dinas Pekerjaan Umum Kabupaten Halmahera Tengah (1993)
                                </li>
                                <li>Kepala Dinas Pekerjaan Umum Kabupaten Halmahera Tengah (1996)</li>
                                <li>Kepala Badan Perencanaan Pembangunan Daerah Kabupaten Halmahera Tengah</li>
                                <li>
                                    Bupati Halmahera Tengah (2007—2012)
                                </li>
                                <li>
                                    Bupati Halmahera Tengah (2012—2017)
                                </li>
                                <li>
                                    Wakil Gubernur Maluku Utara (2019—Sekarang)
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>);
}
