import _ from "lodash";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/base-components/Button";
import { FormSelect } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import Pagination from "@/base-components/Pagination";
import Table from "@/base-components/Table";
import {
  BackButton
} from "@/components/Buttons/Buttons";
import fakerData from "@/utils/faker";

function RekapAbsen() {
  const nama: string = "Sofyan Ardiansyah";
  const [date, setDate] = useState<string>();

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">Rekap Absensi </h2>
        <div className=" flex gap-2 ml-auto">
          <Link to="/absen">
            <BackButton />
          </Link>
          <Button variant="facebook" size="sm">
            <Lucide icon="FileText" className="mr-2 " />
            Proses
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap justify-between  col-span-12 mt-2 intro-y sm:flex-nowrap">
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
                  dropdowns: {
                    minYear: 1990,
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
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">No</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Nama
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  Presensi
                </Table.Th>
              
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {_.take(fakerData, 9).map((faker, fakerKey) => (
                <Table.Tr key={fakerKey} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {fakerKey + 1}
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <a href="" className="font-medium whitespace-nowrap">
                      {faker.users[0].name}
                    </a>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {faker.jobs[0]}
                    </div>
                  </Table.Td>

                  <Table.Td className=" first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="bg-green-300 w-48 rounded-md mx-auto text-left py-1 px-2 text-xs flex justify-between">
                      <strong className="font-semibold">Hadir</strong>
                      <div>{faker.stocks[0]}</div>
                    </div>
                    <div className="bg-red-300 w-48 rounded-md mx-auto text-left py-1 px-2 text-xs flex justify-between mt-1">
                      <strong className="font-semibold">Tidak Hadir</strong>{" "}
                      <div>{faker.stocks[0]}</div>
                    </div>
                    <div className="bg-orange-300 w-48 rounded-md mx-auto text-left py-1 px-2 text-xs flex justify-between mt-1">
                      <strong className="font-semibold">Telat</strong>{" "}
                      <div>{faker.stocks[0]}</div>
                    </div>
                  </Table.Td>

                  
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div>
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default RekapAbsen;
