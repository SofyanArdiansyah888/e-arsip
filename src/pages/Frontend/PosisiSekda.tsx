import {useGet} from "@/hooks/useApi";
import sekdaUrl from "@/assets/images/sekda.jpeg";
import LokasiSekda from "@/models/LokasiSekda.entity";
import {GetDetailPayload} from "@/models/GenericPayload";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

export default function PosisiSekda() {
    const {data, isLoading} = useGet<GetDetailPayload<LokasiSekda>>({
        name: "lokasi", endpoint: "lokasi",
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
    return (<Layout>
        <Navbar/>
        <section
            id="sambutan"
            className="pb-48 pt-40 text-center bg-zinc-50   min-h-[calc(100vh-70px)]  lg:px-48"
        >
            <div className="flex flex-col xl:flex-row  items-center">
                <div className=" h-auto mb-24 xl:mb-0 relative">
                    <img
                        src={sekdaUrl}
                        className=" rounded-lg h-80  w-72 mx-auto  bg-white object-fill relative z-10"
                    />

                    {!isLoading && (<>
                        <ButtonStatus lokasi={data?.data.lokasi}/>
                        <div className={"mt-4 font-semibold"}>Update
                            : {dayjs(data?.data.tempe).format('D MMMM YYYY, hh:mm')} WIT
                        </div>
                    </>)}

                    <div className="bg-gray-200 h-72 w-64 rounded-md absolute bottom-16 -left-4 opacity-50  "></div>
                </div>

                <div className="w-3/4 text-left space-y-8 mx-8 lg:ml-24 self-center mb-16 ">
                    <h3 className="text-4xl font-semibold capitalize">
                        Posisi Sekda
                    </h3>
                    <div className={"space-y-3"}>
                        <ItemSekda title={"Nama"} description={"Drs. Samsuddin Abdul Kadir, M.Si"}/>
                        <ItemSekda title={"Nip"} description={"19701012 199101 1 003"}/>
                        <ItemSekda title={"Pangkat/Gol"} description={" Pembina Utama, IV/e"}/>
                        <ItemSekda title={"Tempat/Tanggal Lahir"} description={"Ternate, 12 Oktober 1970."}/>

                    </div>

                </div>
            </div>
        </section>
    </Layout>);
}


const ButtonStatus = ({lokasi}: { lokasi?: string }) => {
    const [color, setColor] = useState("");
    useEffect(() => {
        switch (lokasi) {
            case "berada di kantor":
                setColor("bg-green-600");
                break;
            case "tugas luar":
                setColor("bg-yellow-600");
                break;
            case "tugas dalam daerah":
                setColor("bg-purple-600");
                break;
            case "libur":
                setColor("bg-amber-600");
                break;
            case "diluar jam kerja":
                setColor("bg-slate-600");
                break;
            default:
                setColor("bg-red-600");
                break;

        }

    }, [lokasi])

    return <div
        className={`mt-8 p-3   rounded-xl font-semibold  text-white capitalize ${color} z-10 relative`}
    >
        {lokasi} <br/>
    </div>
}

export const ItemSekda = ({title, description}: { title: string, description: string }) => <div
    className="flex flex-col  md:flex-row md:gap-8 ">
    <div className={"w-[170px] flex md:justify-between font-semibold"}>
        {title}
        <div>:</div>
    </div>
    <div>{description}</div>
</div>