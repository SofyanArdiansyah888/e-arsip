import Disclosure from "@/base-components/Headless/Disclosure";
import { GetPayload } from "@/models/GenericPayload";
import { IzinKaryawanEntity } from "@/models/IzinKaryawan.entity";

interface ICutiKaryawan {
  payload: GetPayload<IzinKaryawanEntity> | undefined;
  isLoading: boolean;
}
export default function CutiKaryawan({ payload, isLoading }: ICutiKaryawan) {
  return (
    <>
      <Disclosure className=" bg-white " defaultOpen={false}>
        <Disclosure.Button className="py-3 px-4 text-md bg-primary text-white rounded-t-lg">
          Sisa Cuti
        </Disclosure.Button>
        <hr />
        <Disclosure.Panel>
          <ul className="p-3 divide-y overflow-y-scroll max-h-[40vh] ">
            {isLoading ? (
              <div className="py-4 w-full text-center font-semibold text-lg bg-slate-200  rounded-md">
                Loading ...
              </div>
            ) : (
              <>
                {payload?.data.length === 0 && (
                  <div className="bg-white text-center font-semibold">
                    No Data Found...
                  </div>
                )}
                {payload?.data?.map((riwayat) => (
                  <li className="flex flex-col gap-2 py-2">
                    <div className="flex justify-between">
                      <div className="font-semibold text-md">
                        {riwayat.izin.nama_izin}
                      </div>
                      <div className="text-xs bg-danger p-1 rounded-md font-semibold text-white">
                        Sisa Quota {riwayat.sisa_quota}
                      </div>
                    </div>

                    {/* <div className="text-sm">{riwayat.izin.nama_izin}</div>
                <div className="text-xs text-slate-700 text-right">
                  {formatDate(riwayat.tanggal_mulai, "DD MMMM YYYY")} -{" "}
                  {formatDate(riwayat.tanggal_selesai, "DD MMMM YYYY")}
                </div> */}
                  </li>
                ))}
              </>
            )}
          </ul>
        </Disclosure.Panel>
      </Disclosure>
    </>
  );
}
