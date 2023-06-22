import { useGet } from "@/hooks/useApi";
import sekdaUrl from "@/assets/images/sekda.jpeg";
import LokasiSekda from "@/models/LokasiSekda.entity";
import { GetDetailPayload } from "@/models/GenericPayload";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import dayjs from "dayjs";
export default function PosisiSekda() {
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
        className="pb-48 pt-40 text-center bg-zinc-50   min-h-[calc(100vh-70px)]  lg:px-48"
      >
        <div className="flex flex-col xl:flex-row  items-center">
          <div className=" h-auto mb-24 xl:mb-0 relative">
            <img
              src={sekdaUrl}
              className=" rounded-lg h-80  w-72 mx-auto  bg-white object-fill relative z-10"
            />

            {!isLoading && (
                <>
              <div
                className={`mt-8 p-3  rounded-xl font-semibold  text-white capitalize ${
                  data?.data.lokasi === "berada di kantor"
                    ? "bg-green-600"
                    : "bg-red-600"
                } z-10 relative`}
              >
                {data?.data.lokasi} <br/>
              </div>
              <div className={"mt-4 font-semibold"}>Update : {dayjs(data?.data.updated_at).format('D MMMM YYYY, hh:mm') } WIT</div>
                </>
            )}

            <div className="bg-gray-200 h-72 w-64 rounded-md absolute bottom-16 -left-4 opacity-50  "></div>
          </div>

          <div className="w-3/4 text-left space-y-8 mx-8 lg:ml-24 self-center mb-16 ">
            <h3 className="text-4xl font-semibold capitalize">
              Posisi Sekda
            </h3>
            <div className="space-y-3">
              <p>
                <strong>Nama:</strong> Drs. Samsuddin Abdul Kadir, M.Si{" "}
              </p>
              <p>
                <strong>Nip:</strong> 19701012 199101 1 003
              </p>
              <p>
                <strong>Pangkat/Gol:</strong> Pembina Utama, IV/e
              </p>
              <p>
                <strong>Tempat/Tanggal Lahir:</strong> Ternate, 12 Oktober 1970.{" "}
              </p>
            
            </div>
        
            {/* <h3 className="text-xl font-semibold">Drs.Samsuddin A.Kadir, M.Si</h3> */}
          </div>
        </div>
      </section>
    </Layout>
  );
}
