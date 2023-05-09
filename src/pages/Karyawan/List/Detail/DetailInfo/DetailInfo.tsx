import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { RootState } from "@/stores/store";
import { formatDate } from "@/utils/helper";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditDetailInfo from "./EditDetailInfo";
import ItemDetail from "./ItemDetail";

export default function DetailInfo() {
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );
  const [editShow, setEditShow] = useState<boolean>(false);
    console.log(selectedKaryawan)
  const itemDetails = [
    {
      title: `Nama`,
      description: selectedKaryawan?.nama_lengkap ?? "-",
    },
    {
      title: "Tanggal Bergabung",
      description: formatDate(selectedKaryawan?.tanggal_bergabung) ?? "-",
    },
    {
      title: "Tempat, Tanggal Lahir",
      description: `${selectedKaryawan?.tempat_lahir ?? ""}, ${
        formatDate(selectedKaryawan?.tanggal_lahir) ?? "-"
      }`,
    },
    {
      title: "Jenis Kelamin",
      description: selectedKaryawan?.jenis_kelamin ?? "-",
    },
    {
      title: "Agama",
      description: selectedKaryawan?.agama ?? "-",
    },
    {
      title: "Status Penikahan",
      description: selectedKaryawan?.status_pernikahan ?? "-",
    },
    {
      title: "Jumlah Anak",
      description: selectedKaryawan?.jumlah_anak ?? "-",
    },
    {
      title: "Golongan Darah",
      description: selectedKaryawan?.golongan_darah ?? "-",
    },
    {
      title: "Pendidikan Terakhir",
      description: selectedKaryawan?.pendidikan_terakhir ?? "-",
    },
    {
      title: "NIK",
      description: selectedKaryawan?.nik ?? "-",
    },
    {
      title: "NIP",
      description: selectedKaryawan?.nip ?? "-",
    },
    {
      title: "NPWP",
      description: selectedKaryawan?.npwp ?? "-",
    },
    {
      title: "Jabatan",
      description: selectedKaryawan?.jabatan?.nama_jabatan ?? "-",
    },
    {
      title: "Level",
      description: selectedKaryawan?.divisi?.nama_divisi ?? "-",
    },
    {
      title: "Unit Kerja",
      description: selectedKaryawan?.departemen?.nama_departemen ?? "-",
    },
    {
      title: "Atasan Langsung",
      description: selectedKaryawan?.atasan?.nama_lengkap ?? "-",
    },
    {
      title: "HP",
      description: selectedKaryawan?.telepon ?? "-",
    },
    {
      title: "Email",
      description: selectedKaryawan?.user.email ?? "-",
    },
    {
      title: "Alamat",
      description: selectedKaryawan?.alamat_lengkap ?? "-",
    },
    {
      title: "Shift",
      description: selectedKaryawan?.shift?.nama_shift ?? "-",
    },
    {
      title: "Status Karyawan",
      description: selectedKaryawan?.status_karyawan ?? "-",
    },
  ];

  return (
    <Tab.Panel>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 intro-y box ">
          <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
            <h2 className="mr-auto text-base font-medium">Detail Info</h2>
            {selectedKaryawan && (
              <Button variant="primary" onClick={() => setEditShow(true)}>
                <Lucide icon="Pencil" className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
          <div className="grid grid-cols-3 px-5 pt-5 pb-5">
            {itemDetails.map((props) => (
              <ItemDetail {...props} />
            ))}
          </div>
        </div>
      </div>
      <EditDetailInfo
        isModal={editShow}
        handleCancel={() => {
          setEditShow(false);
        }}
      />
    </Tab.Panel>
  );
}
