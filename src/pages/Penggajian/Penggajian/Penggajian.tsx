import Button from "@/base-components/Button";
import { FormInput } from "@/base-components/Form";
import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";
import {
  EditTableButton
} from "@/components/Buttons/Buttons";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import PATHNAME from "@/router/path";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah } from "@/utils/helper";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditPenggajian from "./EditPenggajian";
import UploadGaji from "./UploadGaji";
import UploadPotongan from "./UploadPotongan";
import UploadTunjangan from "./UploadTunjangan";

function Penggajian() {
  const [search, setSearch] = useState('');
  const [isEdit, setIsEdit] = useState(false)
  const [selectedKaryawan, setSelectedKaryawan] = useState<KaryawanEntity>()
  const [isUploadGaji, setIsUploadGaji] = useState(false)
  const [isUploadPotongan, setIsUploadPotongan] = useState(false)
  const [isUploadTunjangan, setIsUploadTunjangan] = useState(false)

  const {
    data: karyawanPayload,
    isLoading,
  } = useGet<GetPayload<KaryawanEntity>>({
    name: `penggajian`,
    endpoint: `karyawans`,
  });

  const filteredData = () => {
    return karyawanPayload?.data.filter((item) => {
      return item.nama_lengkap.toLowerCase().includes(search)
    })
  }
 

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">Penggajian</h2>
        <div className=" flex gap-2 ml-auto">
          <Button variant="danger" size="sm" onClick={() => setIsUploadPotongan(true)}>
            <Lucide icon="CreditCard" className="mr-2" />
            Update Potongan
          </Button>

          <Button variant="facebook" size="sm" onClick={() => setIsUploadTunjangan(true)}>
            <Lucide icon="CreditCard" className="mr-2" />
            Update Tunjangan
          </Button>

          <Button variant="linkedin" size="sm" onClick={() => setIsUploadGaji(true)}>
            <Lucide icon="CreditCard" className="mr-2" />
            Update Gaji
          </Button>
          <Link to={PATHNAME.PENGGAJIAN_SLIP_GAJI}>
            <Button variant="primary" size="sm">
              <Lucide icon="CreditCard" className="mr-2" />
              Slip Gaji
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap justify-between  col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div className="intro-y block sm:flex items-center h-10">
           
          </div>

          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-full mt-3 mr-auto sm:w-auto sm:mt-0">
              <Lucide
                icon="Search"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
              />
              <FormInput
                type="text"
                className="w-full px-10 sm:w-64 !box"
                placeholder="Cari..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />

              <Lucide
                icon="X"
                className="absolute inset-y-0 right-2 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
                onClick={() => setSearch('')}
              />
            </div>
          </div>
        </div>
        {!isLoading ? (
          <PenggajianTable
            handleEdit={(karyawan: KaryawanEntity) => {
              setIsEdit(true)
              setSelectedKaryawan(karyawan);
            }}
            handleDelete={(karyawan: KaryawanEntity) => {
              // setDeleteModal(true);
              // setSelectedItem(cuti);
            }}
            payload={filteredData()}
          />
        ) : (
          <SkeletonTable />
        )}
      </div>
      <UploadGaji isModal={isUploadGaji} handleCancel={() => { setIsUploadGaji(false)}} />
      <UploadPotongan isModal={isUploadPotongan} handleCancel={() => {setIsUploadPotongan(false)}} />
      <UploadTunjangan isModal={isUploadTunjangan} handleCancel={() => {setIsUploadTunjangan(false)}} />
      <EditPenggajian
        isModal={isEdit}
        selectedItem={selectedKaryawan}
        handleCancel={() => setIsEdit(false)}
      />
    </>
  );
}
interface IPenggajianTable {
  payload: KaryawanEntity[] | undefined;
  handleEdit(karyawan: KaryawanEntity): void;
  handleDelete(karyawan: KaryawanEntity): void;
}

function PenggajianTable({ payload, handleEdit }: IPenggajianTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr className="text-center">
            <Table.Th>No</Table.Th>
            <Table.Th>Nama</Table.Th>
            <Table.Th>Unit Kerja</Table.Th>
            <Table.Th>Level</Table.Th>
            <Table.Th className="min-w-[150px]">Gaji Pokok</Table.Th>

            <Table.Th className="text-center border-b-0 whitespace-nowrap">
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payload?.length === 0 && (
            <Table.Tr className="intro-x bg-white text-center">
              <Table.Td colSpan={99}>No Data Found...</Table.Td>
            </Table.Tr>
          )}
          {payload?.map((karyawan, index) => (
            <Table.Tr key={index} className="intro-x bg-white">
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td className="capitalize flex flex-col">
                {karyawan.nama_lengkap}
                <small>{karyawan.jabatan?.nama_jabatan}</small>
              </Table.Td>
              <Table.Td className="capitalize">
                {karyawan.departemen?.nama_departemen}
              </Table.Td>
              <Table.Td className="capitalize">
                {karyawan.divisi?.nama_divisi}
              </Table.Td>
              <Table.Td className="capitalize text-center">
                {formatRupiah(karyawan.gaji_pokok)}
              </Table.Td>
              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <EditTableButton  onClick={() => handleEdit(karyawan)} />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default Penggajian;
