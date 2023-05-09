import placeholder from "@/assets/images/placeholders/200x200.jpg";
import { Tab } from "@/base-components/Headless";
import Lucide from "@/base-components/Lucide";
import { BackButton } from "@/components/Buttons/Buttons";
import { useGet } from "@/hooks/useApi";
import { GetDetailPayload } from "@/models/GenericPayload";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { setSelectedKaryawan } from "@/stores/data/KarywanSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import AkunInfo from "./AkunInfo/AkunInfo";
import DataKeluarga from "./DataKeluarga/DataKeluarga";
import DetailInfo from "./DetailInfo/DetailInfo";

import Dokumen from "./Dokumen/Dokumen";
import PendidikanFormal from "./PendidikanFormal/PendidikanFormal";
import RiwayatTraining from "./RiwayatTraining/RiwayatTraining";
import { useQueryClient } from "react-query";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";

function DetailKaryawan() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: payload, isFetching } = useGet<
    GetDetailPayload<KaryawanEntity>
  >({
    name: "karyawan-details",
    endpoint: `karyawans/${id}`,
  });

  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["karyawans"] });
      dispatch(setSelectedKaryawan(undefined));
    };
  }, []);

  useEffect(() => {
    if (payload) {
      dispatch(setSelectedKaryawan(payload.data));
    }
  }, [payload]);

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Profil Karyawan</h2>
        {pathname.includes("karyawan") && (
          <Link to="/karyawan">
            <BackButton />
          </Link>
        )}
      </div>
      <Tab.Group>
        {/* BEGIN: Profile Info */}
        {isFetching ? (
          <div className="mt-4">
            <SkeletonTable />
          </div>
          
        ) : (
          <>
            <div className="px-5 pt-5 mt-5 intro-y box">
              <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
                  <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                    <img
                      alt="Foto Karyawan"
                      className="rounded-full"
                      src={
                        selectedKaryawan?.foto === ("" || null)
                          ? placeholder
                          : selectedKaryawan?.foto
                      }
                    />
                  </div>
                  <div className="ml-5">
                    <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                      {selectedKaryawan?.nama_lengkap ?? "-"}
                    </div>
                    <div className="text-slate-500">
                      {selectedKaryawan?.jabatan?.nama_jabatan ?? "-"}
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
                  <div className="font-medium text-center lg:text-left lg:mt-3">
                    Short Details
                  </div>
                  <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                    <div className="flex items-center truncate sm:whitespace-normal">
                      <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                      {selectedKaryawan?.user.email ?? "-"}
                    </div>
                    <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                      <Lucide icon="Phone" className="w-4 h-4 mr-2" />
                      {selectedKaryawan?.telepon ?? "-"}
                    </div>
                    <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                      <Lucide icon="Airplay" className="w-4 h-4 mr-2" />
                      {selectedKaryawan?.alamat_lengkap ?? "-"}
                    </div>
                  </div>
                </div>
              </div>
              <Tab.List
                variant="link-tabs"
                className="flex-col justify-center text-center sm:flex-row lg:justify-start"
              >
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Info" className="w-4 h-4 mr-2" /> Detail
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center py-4 cursor-pointer">
                    <Lucide icon="GraduationCap" className="w-4 h-4 mr-2" />{" "}
                    Pendidikan Formal
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center py-4 cursor-pointer">
                    <Lucide icon="FileClock" className="w-4 h-4 mr-2" /> Riwayat
                    Training
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Files" className="w-4 h-4 mr-2" /> Dokumen
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Baby" className="w-4 h-4 mr-2" /> Data
                    Keluarga
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Akun &
                    Bank
                  </Tab.Button>
                </Tab>
              </Tab.List>
            </div>

            {/* END: Profile Info */}
            <Tab.Panels className="mt-5">
              <DetailInfo />
              <PendidikanFormal />
              <RiwayatTraining />
              <Dokumen />
              <DataKeluarga />
              <AkunInfo />
            </Tab.Panels>
          </>
        )}
      </Tab.Group>
    </>
  );
}

export default DetailKaryawan;
