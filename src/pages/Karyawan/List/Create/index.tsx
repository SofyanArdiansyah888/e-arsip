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

interface ICreateKaryawan {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_lengkap: yup.string().required(),
    tanggal_bergabung: yup.string().required(),
    tempat_lahir: yup.string().required(),
    tanggal_lahir: yup.string().required(),
    telepon: yup.string().required(),
    pendidikan_terakhir: yup.string().required(),
    agama: yup.string().required(),
    jenis_kelamin: yup.string().required(),
    departemen_id: yup.string().required(),
    divisi_id: yup.string().required(),
    jabatan_id: yup.string().required(),
    shift_id: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateKaryawan(props: ICreateKaryawan) {
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

  const dispatch = useAppDispatch();

  const { data: departementPayload, isFetching: isDepartmenFetch } = useGet<
    GetPayload<DepartemenEntity>
  >({
    name: "departemens",
    endpoint: "departemens",
    filter: {
      limit: 200,
    },
  });

  const {
    data: divisiPayload,
    refetch: refetchDivisi,
    isFetching: isDivisiFetch,
  } = useGet<GetPayload<DivisiEntity>>({
    name: "divisis",
    endpoint: "divisis",
    filter: {
      limit: 200,
    },
  });

  const {
    data: jabatanPayload,
    refetch: refetchJabatan,
    isFetching: isJabatanFetch,
  } = useGet<GetPayload<JabatanEntity>>({
    name: "jabatans",
    endpoint: "jabatans",
    filter: {
      limit: 200,
    },
  });

  const { data: shiftPayload, isFetching: isShiftFetch } = useGet<
    GetPayload<ShiftEntity>
  >({
    name: "shifts",
    endpoint: "shifts",
    limit: 0,
    page: 0,
  });

  useEffect(() => {
    reset();
  }, [props.isModal]);

  const { mutate, isLoading } = usePost<FormData>({
    endpoint: "karyawans",
    name: "karyawans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Karyawan Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
    onErrorCallback: (error) => {
      if (error.response.status === 500) {
        setNotification({
          message: "Gagal Membuat Karyawan Baru",
          status: "error",
        });
      } else if (error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.entries(errors).map((entry: any) => {
          setError(entry[0], {
            message: entry[1].toString(),
          });
        });
      }
    },
  });

  function handleCreateKaryawan(data: any) {
    mutate({
      ...data,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Tambah Karyawan Baru",
        handleSubmit,
        submitCallback: handleCreateKaryawan,
        control,
        isLoading,
        size: "xl",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4 max-h-[65vh] overflow-auto">
        <div className="col-span-4">
          <FormLabel htmlFor="nama_lengkap">
            Nama Lengkap <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama_lengkap")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_lengkap?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="tanggal_bergabung">
            Tanggal Bergabung <small className="text-danger">*</small>
          </FormLabel>
          <div className="relative text-slate-500">
            <Lucide
              icon="Calendar"
              className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <Litepicker
                  onChange={onChange}
                  value={value}
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
                  className="form-control box pl-10 cursor-pointer"
                />
              )}
              name="tanggal_bergabung"
              control={control}
            />
          </div>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal_bergabung?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="jenis_kelamin">
            Jenis Kelamin <small className="text-danger">*</small>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="laki-laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </FormSelect>
            )}
            name="jenis_kelamin"
            control={control}
            defaultValue="laki-laki"
          />

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.jenis_kelamin?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="tempat_lahir">
            Tempat Lahir <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("tempat_lahir")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tempat_lahir?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="tanggal_lahir">
            Tanggal Lahir <small className="text-danger">*</small>
          </FormLabel>
          <div className="relative text-slate-500">
            <Lucide
              icon="Calendar"
              className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <Litepicker
                  onChange={onChange}
                  value={value}
                  options={{
                    autoApply: false,
                    singleMode: true,
                    numberOfColumns: 0,
                    numberOfMonths: 1,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1900,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  className="form-control box pl-10 cursor-pointer"
                />
              )}
              name="tanggal_lahir"
              control={control}
            />
          </div>
          {/* <FormInput type="text" {...register("tanggal_lahir")} /> */}
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal_lahir?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="pendidikan_terakhir">
            Pendidikan Terakhir <small className="text-danger">*</small>
          </FormLabel>
          <select
            {...register("pendidikan_terakhir")}
            className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm"
          >
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
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.pendidikan_terakhir?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="agama">
            Agama <small className="text-danger">*</small>
          </FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="islam">Islam</option>
                <option value="kristen protestan">Kristen Protestan</option>
                <option value="kristen katolik">Kristen Katolik</option>
                <option value="hindu">Hindu</option>
                <option value="budha">Budha</option>
                <option value="konghuchu">Konghuchu</option>
                <option value="lainnya">Lainnya</option>
              </FormSelect>
            )}
            name="agama"
            control={control}
            defaultValue="islam"
          />

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.agama?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="telepon">
            Telepon <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("telepon")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.telepon?.message}
          </div>
        </div>

        {/* DEPARTEMEN  */}
        <div className="col-span-4">
          <FormLabel htmlFor="departemen_id" className="mb-0">
            Unit Kerja <small className="text-danger">*</small>
          </FormLabel>
          {/* {isDepartmenFetch ? (
            <div className="w-full bg-slate-200 text-center h-8 rounded-md pt-1.5 font-semibold">
              Loading...
            </div>
          ) : ( */}
          <Controller
            render={({ field }) => (
              <TomSelect {...field} disabled={isDepartmenFetch}>
                {departementPayload?.data.map(
                  (departemen: DepartemenEntity) => (
                    <option value={departemen.id} className="capitalize">
                      {departemen.nama_departemen}
                    </option>
                  )
                )}
              </TomSelect>
            )}
            name="departemen_id"
            control={control}
          />

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.departemen_id?.message}
          </div>
        </div>

        {/* DIVISI  */}
        <div className="col-span-4">
          <FormLabel htmlFor="divisi_id" className="mb-0">
            Level <small className="text-danger">*</small>
          </FormLabel>
          <Controller
            render={({ field }) => (
              <TomSelect {...field}>
                {divisiPayload?.data.map((divisi: DivisiEntity) => (
                  <option value={divisi.id} className="capitalize">
                    {divisi.nama_divisi}
                  </option>
                ))}
              </TomSelect>
            )}
            name="divisi_id"
            control={control}
          />

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.divisi_id?.message}
          </div>
        </div>

        {/* JABATAN */}
        <div className="col-span-4">
          <FormLabel htmlFor="jabatan_id" className="mb-0">
            Jabatan <small className="text-danger">*</small>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <TomSelect {...field}>
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

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.jabatan_id?.message}
          </div>
        </div>

        {/* SHIFT */}
        <div className="col-span-4">
          <FormLabel htmlFor="shift_id">
            Shift <small className="text-danger">*</small>
          </FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="">Pilih Shift</option>
                {shiftPayload?.data.map((shift) => (
                  <option value={shift.id} className="capitalize">
                    {shift.nama_shift}
                  </option>
                ))}
              </FormSelect>
            )}
            name="shift_id"
            control={control}
          />

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.shift_id?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="username">
            Username <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("username")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.username?.message}
          </div>
        </div>

        <div className="col-span-4">
          <FormLabel htmlFor="password">
            Password <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="password" {...register("password")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.password?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
