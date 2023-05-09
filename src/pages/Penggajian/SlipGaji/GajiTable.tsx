import Table from "@/base-components/Table";
import {
  DetailTableButton,
  PrintTableButton,
} from "@/components/Buttons/Buttons";
import { GetPayload } from "@/models/GenericPayload";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";
import PATHNAME from "@/router/path";
import { formatRupiah } from "@/utils/helper";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PriontoutSlipGaji from "./PrintoutSlipGaji";

interface IGajiTable {
  payload : GetPayload<RiwayatPenggajianEntity> | undefined;
  search: string;
}

export default function GajiTable({
  payload,
  search,
}: IGajiTable) {
  const [selectedItem, setSelectedItem] = useState<RiwayatPenggajianEntity>()
  const handleReactPrint = useReactToPrint({
    content: () => printRef.current
  })

  const filteredData = () => {
    return payload?.data.filter((item) => {
      return item.karyawan.nama_lengkap.toLowerCase().includes(search);
    });
  };
  const printRef = useRef<HTMLDivElement>(null);
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <div className="mx-8 items-center justify-center  hidden">
        <PriontoutSlipGaji ref={printRef} data={selectedItem}  />
      </div>

         

      <Table sm>
        <Table.Thead variant="dark" className="text-xs">
          <Table.Tr className="text-center">
            <Table.Th>No</Table.Th>
            <Table.Th>Nama</Table.Th>
            <Table.Th>Unit Kerja</Table.Th>
            <Table.Th>Level</Table.Th>
            <Table.Th>Gaji Pokok</Table.Th>
            <Table.Th>Tunjangan</Table.Th>
            <Table.Th>Potongan</Table.Th>
            <Table.Th>Gaji Bersih</Table.Th>

            <Table.Th className="text-center border-b-0 whitespace-nowrap">
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredData()?.length === 0 && (
            <Table.Tr className="intro-x bg-white text-center">
              <Table.Td colSpan={99}>No Data Found...</Table.Td>
            </Table.Tr>
          )}
          {filteredData()?.map((item, index) => (
            <Table.Tr key={index} className=" bg-white text-xs ">
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td className="capitalize max-w-[150px] ">
                <p className="font-semibold">{item.karyawan.nama_lengkap}</p>
                <small>{item.karyawan.jabatan?.nama_jabatan}</small>
              </Table.Td>
              <Table.Td className="capitalize max-w-[120px]">
                {item.karyawan.departemen?.nama_departemen}
              </Table.Td>
              <Table.Td className="capitalize">
                {item.karyawan.divisi?.nama_divisi}
              </Table.Td>
              <Table.Td className="capitalize">
                {formatRupiah(item.gaji_pokok)}
              </Table.Td>
              <Table.Td className="capitalize">
                {formatRupiah(item.total_tunjangan)}
              </Table.Td>
              <Table.Td className="capitalize">
                {formatRupiah(item.total_potongan)}
              </Table.Td>
              <Table.Td className="capitalize">
                {formatRupiah(item.total_gaji)}
              </Table.Td>

              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  
                <PrintTableButton onClick={() => {
                  setSelectedItem(item)
                  setTimeout(() => {
                    handleReactPrint()
                  },300)
                  
                }} />
                  
                  <Link to={`${PATHNAME.PENGGAJIAN_SLIP_GAJI}/${item.id}`}>
                    <DetailTableButton />
                  </Link>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
