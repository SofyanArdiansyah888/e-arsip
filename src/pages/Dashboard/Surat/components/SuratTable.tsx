import Table from "@/base-components/Table";
import { DeleteTableButton, EditTableButton } from "@/components/Buttons/Buttons";
import { GetPayload } from "@/models/GenericPayload";
import SuratEntity from "@/models/Surat.entity";
import dayjs from "dayjs";

interface ISuratTable {
  payload: GetPayload<SuratEntity> | undefined;
  handleEdit(user: SuratEntity): void;
  handleDelete(user: SuratEntity): void;
}

export default function SuratTable({
  payload,
  handleEdit,
  handleDelete,
}: ISuratTable) {
  const styles = {
    heading:
      "flex items-center  h-10  px-4 py-1 flex-grow w-full justify-center",
    headningNumber: "flex items-center  h-10  px-4 py-1 w-[60px]",
    headingAction: "flex items-center  h-10  px-4 py-1 w-[130px]",
    body: "flex items-center   flex-grow w-full  p-1 px-2 capitalize",
    bodyAction: "flex items-center  px-4 py-1 w-[130px] justify-center",
    bodyNumber: "flex items-center  px-4 py-1 w-[60px] justify-center",
  };
  return (
    <div className="col-span-12  intro-y flex flex-col ">
      <div className="bg-white divide-y-[1px] max-h-[58vh] overflow-auto">
        <div className="col-span-12  overflow-auto intro-y lg:overflow-visible">
          <Table sm>
            <Table.Thead variant="dark" className="sticky">
              <Table.Tr>
                <Table.Th>Nomor Surat</Table.Th>
                <Table.Th>Nomor Agenda</Table.Th>
                <Table.Th>Tanggal Masuk</Table.Th>
                <Table.Th>Perihal</Table.Th>
                <Table.Th>Posisi Surat</Table.Th>
                <Table.Th>Disposisi</Table.Th>

                <Table.Th>Ditujukan</Table.Th>
                <Table.Th>Dari</Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {payload?.data.length === 0 && (
                <Table.Tr className="intro-x bg-white text-center">
                  <Table.Td colSpan={99}>No Data Found...</Table.Td>
                </Table.Tr>
              )}
              {payload?.data.map((divisi, index) => (
                <Table.Tr key={index} className="intro-x bg-white">
                  <Table.Td className="capitalize">
                    {divisi.nomor_surat}
                  </Table.Td>
                  <Table.Td className="capitalize">
                    {divisi.nomor_agenda}
                  </Table.Td>
                  <Table.Td className="capitalize">
                    {dayjs(divisi.tanggal_masuk).format("DD MMMM YYYY")}
                  </Table.Td>
                  <Table.Td>{divisi.perihal}</Table.Td>
                  <Table.Td>{divisi.posisi_surat}</Table.Td>
                  <Table.Td>{divisi.disposisi}</Table.Td>
                  <Table.Td>{divisi.ditujukan}</Table.Td>
                  <Table.Td>{divisi.dari}</Table.Td>

                  <Table.Td>
                    <div className="flex flex-row items-center justify-center">
                      <EditTableButton onClick={() => handleEdit(divisi)} />
                      <DeleteTableButton onClick={() => handleDelete(divisi)} />
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
