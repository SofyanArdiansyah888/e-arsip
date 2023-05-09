import Table from "@/base-components/Table";
import {
  DeleteTableButton,
  EditTableButton,
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { PotonganKaryawanEntity } from "@/models/PotonganKaryawan.entity";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";
import { TunjanganEntity } from "@/models/Tunjangan.entity";
import { PotonganEntity } from "@/models/Potongan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { formatRupiah } from "@/utils/helper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditPotongan from "./EditPotongan";
import EditTunjangan from "./EditTunjangan";

interface IDetailSlipGajiTable {
  data: RiwayatPenggajianEntity | undefined;
}
export default function DetailSlipGajiTable({ data }: IDetailSlipGajiTable) {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTunjangan, setSelectedTunjangan] = useState<TunjanganEntity>();
  const [selectedPotongan, setSelectedPotongan] = useState<PotonganEntity>();
  const [isEditPotongan, setIsEditPotongan] = useState(false);
  const [isEditTunjangan, setIsEditTunjangan] = useState(false);
  const { mutate, isLoading } = usePut<RiwayatPenggajianEntity>({
    endpoint: `riwayat-penggajians/${data?.id}`,
    name: "slip-gaji-detail",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menambahkan Tunjangan",
          status: "success",
        })
      );
      setDeleteModal(false);
    },
  });

  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark" className="text-xs">
          <Table.Tr className="text-center">
            <Table.Th>Nama</Table.Th>
            <Table.Th>Unit Kerja</Table.Th>
            <Table.Th>Level</Table.Th>
            <Table.Th>Gaji Pokok</Table.Th>
            <Table.Th>Tunjangan</Table.Th>
            <Table.Th>Potongan</Table.Th>
            <Table.Th>Gaji Bersih</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr className="intro-x bg-white text-center">
            <Table.Td className="max-w-[300px]">
              {data?.karyawan.nama_lengkap}
            </Table.Td>
            <Table.Td className="max-w-[300px]">
              {data?.karyawan.departemen?.nama_departemen}
            </Table.Td>
            <Table.Td>{data?.karyawan.divisi?.nama_divisi}</Table.Td>
            <Table.Td>{formatRupiah(data?.karyawan?.gaji_pokok)}</Table.Td>
            <Table.Td>{formatRupiah(data?.total_tunjangan)}</Table.Td>
            <Table.Td>{formatRupiah(data?.total_potongan)}</Table.Td>
            <Table.Td>{formatRupiah(data?.total_gaji)}</Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
          {/* TUNJANGAN */}
          <Table.Tr className="intro-x bg-white text-center">
            <Table.Td
              colSpan={99}
              className="text-left bg-gray-50 font-semibold"
            >
              Detail Tunjangan
            </Table.Td>
          </Table.Tr>

          {data?.detail_tunjangan.map((tunjangan) => (
            <Table.Tr className="intro-x bg-white text-center">
              <Table.Td
                colSpan={6}
                className="text-right bg-gray-50 font-semibold"
              >
                {tunjangan.nama_tunjangan}
                {":"}
              </Table.Td>
              <Table.Td className=" bg-gray-50">
                {formatRupiah(tunjangan.nominal)}
              </Table.Td>
              <Table.Td className=" bg-gray-50">
                <div className="flex">
                  <EditTableButton
                    onClick={() => {
                      setSelectedTunjangan(tunjangan);
                      setSelectedPotongan(undefined);
                      setIsEditTunjangan(true);
                    }}
                  />
                  <DeleteTableButton
                    onClick={() => {
                      setSelectedTunjangan(tunjangan);
                      setSelectedPotongan(undefined);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}

          {/* POTONGAN */}
          <Table.Tr className="intro-x bg-white text-center">
            <Table.Td
              colSpan={99}
              className="text-left bg-gray-50 font-semibold"
            >
              Detail Potongan
            </Table.Td>
          </Table.Tr>

          {data?.detail_potongan.map((potongan, index) => (
            <Table.Tr className="intro-x bg-white text-center" key={index}>
              
              <Table.Td colSpan={6} className="text-right bg-gray-50 font-semibold">
                {potongan.nama_potongan}
                {":"}
              </Table.Td>
              <Table.Td className=" bg-gray-50">
                {formatRupiah(potongan.nominal)}
              </Table.Td>
              <Table.Td className=" bg-gray-50">
                <div className="flex">
                <EditTableButton
                  onClick={() => {
                    setSelectedPotongan(potongan);
                    setSelectedTunjangan(undefined);
                    setIsEditPotongan(true);
                  }}
                />
                <DeleteTableButton
                  onClick={() => {
                    setSelectedPotongan(potongan);
                    setSelectedTunjangan(undefined);
                    setDeleteModal(true);
                  }}
                />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <DeleteModal
        isModal={deleteModal}
        handleConfirm={() => {
          if (data) {
            const tunjangans = data.detail_tunjangan.filter(
              (tunjang) =>
                tunjang.nama_tunjangan !== selectedTunjangan?.nama_tunjangan
            );
            const potongans = data.detail_potongan.filter(
              (potong) =>
                potong.nama_potongan !== selectedPotongan?.nama_potongan
            );

            mutate({
              ...data,
              detail_tunjangan: tunjangans,
              detail_potongan: potongans,
            });
          }
        }}
        handleCancel={() => setDeleteModal(false)}
        title={`Apakah anda ingin mengahpus data ${
          selectedPotongan ? selectedPotongan.nama_potongan : ""
        } ${selectedTunjangan ? selectedTunjangan.nama_tunjangan : ""} `}
      />
      <EditPotongan
        isModal={isEditPotongan}
        handleCancel={() => setIsEditPotongan(false)}
        selectedPotongan={selectedPotongan}
        riwayatPenggajian={data}
      />
      <EditTunjangan
        isModal={isEditTunjangan}
        handleCancel={() => setIsEditTunjangan(false)}
        selectedTunjangan={selectedTunjangan}
        riwayatPenggajian={data}
      />
    </div>
  );
}
