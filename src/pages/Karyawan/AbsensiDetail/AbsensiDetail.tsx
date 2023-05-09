import Disclosure from "@/base-components/Headless/Disclosure";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import { BackButton } from "@/components/Buttons/Buttons";
import { useGet } from "@/hooks/useApi";
import { AbsenEntity } from "@/models/Absen.entity";
import { GetDetailPayload, GetPayload } from "@/models/GenericPayload";
import { IzinKaryawanEntity } from "@/models/IzinKaryawan.entity";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { RiwayatIzinEntity } from "@/models/RiwayatIzin.entity";
import PATHNAME from "@/router/path";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AbsenTable from "./AbsenTable";
import CutiKaryawan from "./CutiKaryawanCard";
import RiwayatIzinCard from "./RiwayatIzinCard";

function DetailAbsensi() {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>();

  const { id: karyawanId } = useParams();

  const { data: karyawanPayload } = useGet<GetDetailPayload<KaryawanEntity>>({
    name: `karyawans.${karyawanId}`,
    endpoint: `karyawans/${karyawanId}`,
  });

  const {
    data: karyawanIzinPayload,
    refetch: refetchKaryawanIzin,
    isFetching: karyawanIzinisFetch,
  } = useGet<GetPayload<IzinKaryawanEntity>>({
    name: "karyawan-izins",
    endpoint: `karyawan-izins`,
    filter: {
      date,
      karyawan_id: karyawanId,
    },
  });

  const {
    data: absensiPayload,
    refetch: refetchAbsensi,
    isFetching: absensiLoading,
  } = useGet<GetPayload<AbsenEntity>>({
    name: `absens`,
    endpoint: `absens`,
    filter: {
      date,
      karyawan_id: karyawanId,
    },
  });

  const {
    data: riwayatIzinPayload,
    refetch: refetchRiwayatIzin,
    isFetching: riwayatIzinIsFetch,
  } = useGet<GetPayload<RiwayatIzinEntity>>({
    name: "riwayat-izins",
    endpoint: `riwayat-izins`,
    filter: {
      date,
      karyawan_id: karyawanId,
    },
  });

  useEffect(() => {
    if (date) {
      refetchAbsensi();
      refetchKaryawanIzin();
      refetchRiwayatIzin();
    }
  }, [date]);

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">
          Detail Absensi{" "}
          <strong className="text-danger">
            {" "}
            {karyawanPayload?.data.nama_lengkap}
          </strong>
        </h2>
        <div className=" flex gap-2 ml-auto">
          <BackButton onClick={() => navigate(PATHNAME.KARYAWAN_ABSEN)} />
        </div>
      </div>

      {/* FILTER CALENDAR */}
      <div className="flex flex-wrap justify-end  col-span-12 mt-2 intro-y sm:flex-nowrap">
        <div className="intro-y block sm:flex items-center h-10">
          <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
            <Lucide
              icon="Calendar"
              className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <Litepicker
              value={date}
              onChange={(value) => setDate(value)}
              options={{
                autoApply: false,
                singleMode: true,
                numberOfColumns: 0,
                numberOfMonths: 1,
                showWeekNumbers: true,
                format: "MMMM YYYY",
                lang: "id-ID",
                dropdowns: {
                  minYear: new Date().getFullYear() - 5,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }}
              className="form-control sm:w-56 box pl-10 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12  gap-6 mt-5">
        <AbsenTable payload={absensiPayload} isLoading={absensiLoading} />
        <div className="col-span-4 bg-transparent mt-2">
          <Disclosure.Group>
            <CutiKaryawan
              payload={karyawanIzinPayload}
              isLoading={karyawanIzinisFetch}
            />
            <RiwayatIzinCard
              payload={riwayatIzinPayload}
              isLoading={riwayatIzinIsFetch}
            />
          </Disclosure.Group>
        </div>
      </div>
    </>
  );
}

export default DetailAbsensi;
