import Lucide, { Icon } from "@/base-components/Lucide";
import VerticalBarChart from "@/components/VerticalBarChart";
import { useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { RiwayatIzinEntity } from "@/models/RiwayatIzin.entity";
import { getColor } from "@/utils/colors";
import { formatDate } from "@/utils/helper";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Main() {
  const [izinCount, setIzinCount] = useState(0);
  const [cutiCount, setCutiCount] = useState(0);
  const [date, setDate] = useState<string>(dayjs().format('MMMM YYYY'));
  const [labels, setLabels] = useState<string[]>([]);
  const [dataChart, setDataChart] = useState<number[]>([]);
  
  const { data: payload, isLoading } = useGet<GetPayload<RiwayatIzinEntity>>({
    name: "riwayat-izins",
    endpoint: "riwayat-izins",
    filter: {
      limit: 0,
      berlangsung: true,
    },
  });

  const { data: absenPayload } = useGet<GetPayload<{tanggal:string, jumlah_telat: number}>>({
    name: "grouped-absen",
    endpoint: "absens/grouped",
    filter: {
      limit: 100,
      date
    },
  });

  useEffect(() => {
    if(absenPayload?.data){
      absenPayload.data.map((item) => {
        setLabels(label => [...label,dayjs(item.tanggal).format('DD MMM')])
        setDataChart(dataChart => [...dataChart, item.jumlah_telat])
      })
    }
  },[absenPayload?.data])

  useEffect(() => {
    if (payload?.data) {
      let filtered = payload.data.filter((item) => {
        return item.izin.jenis_izin === "izin";
      });

      setIzinCount(filtered.length);
      let filteredCuti = payload.data.filter((item) => {
        return item.izin.jenis_izin === "cuti";
      });
      setCutiCount(filteredCuti.length);
    }
  }, [payload]);

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Dashboard</h2>
      </div>
      {/* BEGIN: Page Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3   ">
        <div className="col-span-2 p-5 mt-5 intro-y box relative border-t-2 border-black  ">
          <div className="max-h-[calc(100vh-300px)]">
            <VerticalBarChart
              height={400}
              datasets={[
                {
                  label: "Total Keterlambatan",
                  backgroundColor: getColor('red.500'),
                  barPercentage: 1,
                  barThickness: 20,
                  maxBarThickness: 30,
                  minBarLength: 4,
                  data: dataChart,
                },
              ]}
              labels={labels}
            />
          </div>
        </div>
        <Pemberitahuan data={payload?.data ? payload.data : []} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3   ">
        <Card
          title="Izin"
          subtitle={`${
            izinCount > 0
              ? `${izinCount} Pengajuan Berlangsung`
              : `Tidak Ada Pengajuan`
          }`}
          route="/karyawan/riwayat-izin"
          icon="ShieldAlert"
        />
        <Card
          title="Cuti"
          subtitle={`${
            cutiCount > 0
              ? `${cutiCount} Pengajuan Berlangsung`
              : `Tidak Ada Pengajuan`
          }`}
          route="/karyawan/riwayat-cuti"
          icon="Shield"
        />
      </div>

      {/* END: Page Layout */}
    </>
  );
}

interface ICard {
  title: string;
  subtitle: string;
  icon: Icon;
  route: string;
}
function Card({ title, subtitle, icon, route }: ICard) {
  return (
    <div className=" p-5 mt-5 intro-y box h-[150px] relative border-t-2 border-black  ">
      <div className="flex flex-row">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-md">{subtitle}</p>
        </div>
        <Lucide icon={icon} className="w-24 h-24 opacity-80" />
      </div>
      <Link to={route}>
        <p className="bottom-2 right-2 absolute text-xs cursor-pointer underline font-semibold">
          Klik disini untuk melihat detail
        </p>
      </Link>
    </div>
  );
}

function Pemberitahuan({ data }: { data: RiwayatIzinEntity[] }) {
  return (
    <div className="p-5 mt-5 intro-y box divide-y-2 space-y-2 border-t-2 border-black  ">
      <div className="font-semibold flex flex-row items-center gap-2">
        <Lucide icon="Bell" className="h-6 w-6" />
        <p className="text-md">Pemberitahuan</p>
      </div>
      <div>
        <ul className="mt-2 space-y-2  max-h-[calc(100vh-300px)] overflow-y-auto ">
          {data.map((item) => (
            <li className="bg-zinc-100 p-2 rounded-md space-y-2">
              <div className="flex flex-col  md:flex-row justify-between">
                <p className="font-semibold">{item.karyawan.nama_lengkap}</p>
                <p className="capitalize text-xs bg-yellow-300 p-1 rounded-md">
                  {item.status}
                </p>
              </div>
              <div className="flex flex-col  md:flex-row justify-between">
                <p className="text-slate-600 flex-1">{item.izin.nama_izin}</p>

                {item.tanggal_mulai === item.tanggal_selesai ? (
                  <p className="text-slate-600 font-semibold">
                    {formatDate(item.tanggal_mulai, "DD MMM YYYY")}
                  </p>
                ) : (
                  <p className="text-slate-600 font-semibold">
                    {formatDate(item.tanggal_mulai, "DD MMM YYYY")} -{" "}
                    {formatDate(item.tanggal_selesai, "DD MMM YYYY")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        {data.length === 0 && (
          <div className="bg-zinc-50 rounded-xl w-full py-2 px-4 text-xl justify-center font-semibold h-[calc(100vh-370px)] items-center flex">
            No Data...
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
