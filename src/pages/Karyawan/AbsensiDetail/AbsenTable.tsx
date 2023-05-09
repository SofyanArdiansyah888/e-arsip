import Table from "@/base-components/Table";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { AbsenEntity } from "@/models/Absen.entity";
import { GetPayload } from "@/models/GenericPayload";
import { formatDate } from "@/utils/helper";

interface IAbsenTable {
  payload: GetPayload<AbsenEntity> | undefined;
  isLoading: boolean;
}

export default function AbsenTable({ payload, isLoading }: IAbsenTable) {
  return (
    <div className="col-span-8 overflow-auto intro-y lg:overflow-visible">
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Table sm>
          <Table.Thead variant="dark">
            <Table.Tr>
              <Table.Th>Tanggal</Table.Th>
              <Table.Th>Jam Masuk</Table.Th>
              <Table.Th>Jam Keluar</Table.Th>
              <Table.Th>Keterlambatan</Table.Th>
              <Table.Th>Lembur</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payload?.data.length === 0 && (
              <Table.Tr className="intro-x bg-white text-center">
                <Table.Td colSpan={99}>No Data Found...</Table.Td>
              </Table.Tr>
            )}
            {payload?.data.map((item, index) => (
              <Table.Tr key={index} className="intro-x bg-white">
                <Table.Td className="capitalize">
                  {formatDate(item.tanggal)}
                </Table.Td>
                <Table.Td className="capitalize">{item.waktu_masuk}</Table.Td>
                <Table.Td className="capitalize">{item.waktu_keluar}</Table.Td>
                <Table.Td className="capitalize">
                  {item.jumlah_telat} Menit
                </Table.Td>
                <Table.Td className="capitalize">
                  {item.jumlah_lembur} Menit
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </div>
  );
}
