import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import TomSelect from "@/base-components/TomSelect";
import { BaseModal } from "@/components/Modals/Modals";
import { useGet, usePost } from "@/hooks/useApi";
import { DepartemenEntity } from "@/models/Departemen.entity";
import { DivisiEntity } from "@/models/Divisi.entity";
import { GetPayload } from "@/models/GenericPayload";
import { JabatanEntity } from "@/models/Jabatan.entity";
import { ShiftEntity } from "@/models/Shift.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IFilter {
  jabatan_id?: string;
  status_pernikahan?: string;
  golongan_darah?: string;
  jenis_kelamin?: string;
  pendidikan_terakhir?: string;
  status_karyawan?: string;
}

interface IFilterKaryawan {
  isModal: boolean;
  handleCancel(): void;
  handleFilter(data: IFilter): void;
}

const schema = yup
  .object({
    jabatan_id: yup.string().notRequired(),
    status_pernikahan: yup.string().notRequired(),
    golongan_darah: yup.string().notRequired(),
    jenis_kelamin: yup.string().notRequired(),
    pendidikan_terakhir: yup.string().notRequired(),
    status_karyawan: yup.string().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function FilterKaryawan(props: IFilterKaryawan) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { data: jabatanPayload, isFetching: isJabatanFetch } = useGet<
    GetPayload<JabatanEntity>
  >({
    name: "jabatans",
    endpoint: "jabatans",
    limit: 0,
    page: 0,
  });



  return (
    <BaseModal
      {...{
        ...props,
        title: "Filter Karyawan",
        handleSubmit,
        submitCallback: props.handleFilter,
        control,
        isLoading: false,
        size: "lg",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4  overflow-auto">
        {/* JENIS KELAMIN */}
        <div className="col-span-6">
          <FormLabel htmlFor="jenis_kelamin">Jenis Kelamin</FormLabel>

          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option>Pilih</option>
                <option value="laki-laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </FormSelect>
            )}
            name="jenis_kelamin"
            control={control}
          />
        </div>
        {/* JABATAN */}
        <div className="col-span-6">
          <FormLabel htmlFor="jabatan_id" className="mb-2">
            Jabatan
          </FormLabel>
          {isJabatanFetch ? (
            <div className="w-full bg-slate-200 text-center h-8 rounded-md pt-1.5 font-semibold">
              Loading...
            </div>
          ) : (
            <Controller
              render={({ field }) => (
                <TomSelect {...field}>
                  <option>Pilih</option>
                  {jabatanPayload?.data.map((jabatan: JabatanEntity) => (
                    <option value={jabatan.id} className="capitalize">
                      {jabatan.nama_jabatan}
                    </option>
                  ))}
                </TomSelect>
              )}
              name="jabatan_id"
              control={control}
            />
          )}
        </div>
        {/* STATUS PERNIKAHAN */}
        <div className="col-span-6">
          <FormLabel htmlFor="jenis_kelamin">Status Pernikahan</FormLabel>

          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option>Pilih</option>
                <option value="menikah">Menikah</option>
                <option value="belum menikah">Belum Menikah</option>
                <option value="janda/duda">Janda / Duda</option>
              </FormSelect>
            )}
            name="status_pernikahan"
            control={control}
          />
        </div>
        {/* GOLONGAN DARAH  */}
        <div className="col-span-6">
          <FormLabel htmlFor="golongan_darah">Golongan Darah</FormLabel>
          <select
            {...register("golongan_darah")}
            className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm"
          >
            <option value={undefined}>Pilih</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="ab">AB</option>
            <option value="o">O</option>
          </select>
        </div>
        {/* STATUS KARYAWAN  */}
        <div className="col-span-6">
          <FormLabel htmlFor="status_karyawan">Status Karyawan</FormLabel>
          <select
            {...register("status_karyawan")}
            className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm"
          >
            <option>Pilih</option>
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Tidak Aktif</option>
          </select>
        </div>
        {/* PENDIDIKAN TERAKHIR  */}
        <div className="col-span-6">
          <FormLabel htmlFor="pendidikan_terakhir">
            Pendidikan Terakhir
          </FormLabel>
          <select
            {...register("pendidikan_terakhir")}
            className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm"
          >
            <option>Pilih</option>
            <option value="putus sd">Putus SD</option>
            <option value="sd  / sederajat">SD / Sederajat</option>
            <option value="smp / sederajat">SMP / Sederajat</option>
            <option value="sma / sederajat">SMA / Sederajat</option>
            <option value="paket a">Paket A</option>
            <option value="paket b">Paket B</option>
            <option value="paket c">Paket C</option>
            <option value="d1">D1</option>
            <option value="d2">D2</option>
            <option value="d3">D3</option>
            <option value="d4">D4</option>
            <option value="s1">S1</option>
            <option value="s2">S2</option>
            <option value="s2 terapan">S2 Terapan</option>
            <option value="s3">S3</option>
            <option value="s3 terapan">S3 Terapan</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
      </div>
    </BaseModal>
  );
}
