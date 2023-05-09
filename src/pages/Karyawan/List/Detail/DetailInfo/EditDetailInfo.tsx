import {
  FormInput,
  FormLabel,
  FormSelect
} from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import TomSelect from "@/base-components/TomSelect";
import { BaseModal } from "@/components/Modals/Modals";
import { useGet, usePut } from "@/hooks/useApi";
import { DepartemenEntity } from "@/models/Departemen.entity";
import { DivisiEntity } from "@/models/Divisi.entity";
import { GetPayload } from "@/models/GenericPayload";
import { JabatanEntity } from "@/models/Jabatan.entity";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { ShiftEntity } from "@/models/Shift.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface IEditDetailInfo {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_lengkap: yup.string().required(),
    tanggal_bergabung: yup.string().required(),
    tempat_lahir: yup.string().required(),
    tanggal_lahir: yup.string().required(),
    jenis_kelamin: yup.string().nullable(),
    agama: yup.string().nullable(),
    status_pernikahan: yup.string().nullable(),
    jumlah_anak: yup.number().required(),
    golongan_darah: yup.string().nullable(),
    pendidikan_terakhir: yup.string().nullable(),
    nik: yup.string().nullable(),
    nip: yup.string().nullable(),
    npwp: yup.string().nullable(),
    departemen_id: yup.string().required(),
    divisi_id: yup.string().required(),
    jabatan_id: yup.string().required(),
    shift_id: yup.string().required(),
    atasan_id: yup.string().required(),
    telepon: yup.string().nullable(),
    email: yup.string().nullable(),
    alamat_lengkap: yup.string().nullable(),
    status_karyawan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditDetailInfo(props: IEditDetailInfo) {
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

  const { data: departementPayload } = useGet<
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
  } = useGet<GetPayload<DivisiEntity>>({
    name: "divisis",
    endpoint: "divisis",
    filter: {
      limit: 200,
    },
  });

  const { data: jabatanPayload } = useGet<GetPayload<JabatanEntity>>({
    name: "jabatans",
    endpoint: "jabatans",
    filter: {
      limit: 200,
    },
  });
  

  const { data: shiftPayload } = useGet<
    GetPayload<ShiftEntity>
  >({
    name: "shifts",
    endpoint: "shifts",
    filter: {
      limit: 200,
    },
  });

  const { data: atasanPayload} = useGet<
    GetPayload<KaryawanEntity>
  >({
    name: "karyawans",
    endpoint: "karyawans",
    filter: {
      limit: 200,
    },
  });

  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );

  useEffect(() => {
    if (selectedKaryawan) {
      setValue("nama_lengkap", selectedKaryawan.nama_lengkap);
      setValue("tanggal_bergabung", selectedKaryawan.tanggal_bergabung);
      setValue("tempat_lahir", selectedKaryawan.tempat_lahir);
      setValue("tanggal_lahir", selectedKaryawan.tanggal_lahir);
      setValue("jenis_kelamin", selectedKaryawan.jenis_kelamin);
      setValue("agama", selectedKaryawan.agama);
      setValue("status_pernikahan", selectedKaryawan.status_pernikahan);
      setValue("jumlah_anak", selectedKaryawan.jumlah_anak);
      setValue("golongan_darah", selectedKaryawan.golongan_darah);
      setValue("pendidikan_terakhir", selectedKaryawan.pendidikan_terakhir);
      setValue("nik", selectedKaryawan.nik);
      setValue("nip", selectedKaryawan.nip);
      setValue("npwp", selectedKaryawan.npwp);
      setValue("jabatan_id", selectedKaryawan.jabatan_id?.toString());
      setValue("divisi_id", selectedKaryawan.divisi_id?.toString());
      setValue("departemen_id", selectedKaryawan.departemen_id?.toString());
      setValue("shift_id", selectedKaryawan.shift_id?.toString());
      setValue("atasan_id", selectedKaryawan.atasan_id?.toString());
      setValue("telepon", selectedKaryawan.telepon);
      setValue("email", selectedKaryawan.user.email);
      setValue("alamat_lengkap", selectedKaryawan.alamat_lengkap);
      setValue("status_karyawan", selectedKaryawan.status_karyawan);
    }
  }, [props.isModal]);

  const { mutate, isLoading } = usePut<FormData>({
    endpoint: `karyawans/${selectedKaryawan?.id}/update-profil`,
    name: "karyawan-details",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Data Karyawan",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
    onErrorCallback: (error) => {
      if (error.response.status === 500) {
        setNotification({
          message: "Gagal Mengupdate Data Karyawan",
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

  function handleEditDetailInfo(data: any) {
    mutate({
      ...data,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Detail Karyawan",
        handleSubmit,
        submitCallback: handleEditDetailInfo,
        control,
        isLoading,
        size: "2xl",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4 max-h-[65vh] overflow-auto">
        {/* NAMA LENGKAP */}
        <div className="col-span-3">
          <FormLabel htmlFor="nama_lengkap">
            Nama Lengkap <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama_lengkap")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_lengkap?.message}
          </div>
        </div>

        {/* TANGGAL BERGABUNG */}
        <div className="col-span-3">
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

        {/* TEMPAT LAHIR */}
        <div className="col-span-3">
          <FormLabel htmlFor="tempat_lahir">
            Tempat Lahir <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("tempat_lahir")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tempat_lahir?.message}
          </div>
        </div>

        {/* TANGGAL LAHIR */}
        <div className="col-span-3">
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
                      minYear: 1990,
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

        {/* JENIS KELAMIN */}
        <div className="col-span-3">
          <FormLabel htmlFor="jenis_kelamin">
            Jenis Kelamin <small className="text-danger">*</small>
          </FormLabel>

          <select className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm">
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-Laki</option>
            <option value="perempuan">Perempuan</option>
          </select>

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.jenis_kelamin?.message}
          </div>
        </div>

        {/* AGAMA */}
        <div className="col-span-3">
          <FormLabel htmlFor="agama">
            Agama <small className="text-danger">*</small>
          </FormLabel>

          <select className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm">
            <option value="islam">Islam</option>
            <option value="kristen protestan">Kristen Protestan</option>
            <option value="kristen katolik">Kristen Katolik</option>
            <option value="hindu">Hindu</option>
            <option value="budha">Budha</option>
            <option value="konghuchu">Konghuchu</option>
            <option value="lainnya">Lainnya</option>
          </select>

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.agama?.message}
          </div>
        </div>

        {/* STATUS PERNIKAHAN */}
        <div className="col-span-3">
          <FormLabel htmlFor="status_pernikahan">
            Status Pernikahan <small className="text-danger">*</small>
          </FormLabel>

          <select className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm">
            <option value="menikah">Menikah</option>
            <option value="belum menikah">Belum Menikah</option>
          </select>

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.status_pernikahan?.message}
          </div>
        </div>

        {/* JUMLAH ANAK */}
        <div className="col-span-3">
          <FormLabel htmlFor="jumlah_anak">
            Jumlah Anak <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="number" {...register("jumlah_anak")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.jumlah_anak?.message}
          </div>
        </div>

        {/* GOLONGAN DARAH */}
        <div className="col-span-3">
          <FormLabel htmlFor="golongan_darah">
            Golongan Darah <small className="text-danger">*</small>
          </FormLabel>

          <select className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="ab">AB</option>
            <option value="o">O</option>
          </select>

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.golongan_darah?.message}
          </div>
        </div>

        {/* PENDIDIKAN TERAKHIR */}
        <div className="col-span-3">
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

        {/* NIK */}
        <div className="col-span-3">
          <FormLabel htmlFor="nik">
            Nik 
          </FormLabel>
          <FormInput type="text" {...register("nik")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nik?.message}
          </div>
        </div>

        {/* NIP */}
        <div className="col-span-3">
          <FormLabel htmlFor="nip">
            Nip 
          </FormLabel>
          <FormInput type="text" {...register("nip")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nip?.message}
          </div>
        </div>

        {/* NPWP */}
        <div className="col-span-3">
          <FormLabel htmlFor="npwp">
            NPWP 
          </FormLabel>
          <FormInput type="text" {...register("npwp")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.npwp?.message}
          </div>
        </div>

        {/* DEPARTEMEN  */}
        <div className="col-span-3">
          <FormLabel htmlFor="departemen_id">
            Unit Kerja <small className="text-danger">*</small>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <TomSelect {...field} className="-mt-2">
                <option value="">Pilih Departemen</option>
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
        <div className="col-span-3">
          <FormLabel htmlFor="divisi_id">
            Level <small className="text-danger">*</small>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <TomSelect {...field} className="-mt-2">
                <option value="">Pilih Level</option>
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
        <div className="col-span-3">
          <FormLabel htmlFor="jabatan_id">
            Jabatan <small className="text-danger">*</small>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <TomSelect {...field} className="-mt-2">
                <option value="" className="-mt-2">Pilih Jabatan</option>
                {jabatanPayload?.data.map((jabatan: JabatanEntity) => { 
                  return (
                  <option value={jabatan.id} className="capitalize">
                    {jabatan.nama_jabatan}
                  </option>
                )})
                }
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

        {/* ATASAN */}
        <div className="col-span-4">
          <FormLabel htmlFor="atasan_id">
            Atasan <small className="text-danger">*</small>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <>
                <TomSelect {...field}   className="-mt-2">
                  <option>Pilih Atasan</option>
                  {atasanPayload?.data.map((karyawan) => (
                    <option value={karyawan.id} className="capitalize">
                      {karyawan.nama_lengkap}
                    </option>
                  ))}
                </TomSelect>
                <div className="text-danger font-semibold text-xs mt-2">
                  {errors.atasan_id?.message}
                </div>
              </>
            )}
            name="atasan_id"
            control={control}
          />
        </div>

        {/* TELEPON  */}
        <div className="col-span-4">
          <FormLabel htmlFor="telepon">
            Telepon 
          </FormLabel>
          <FormInput type="text" {...register("telepon")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.telepon?.message}
          </div>
        </div>

        {/* EMAIL  */}
        <div className="col-span-4">
          <FormLabel htmlFor="email">
            Email 
          </FormLabel>
          <FormInput type="text" {...register("email")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.email?.message}
          </div>
        </div>

        {/* ALAMAT */}
        <div className="col-span-4">
          <FormLabel htmlFor="alamat_lengkap">
            Alamat Lengkap 
          </FormLabel>
          <textarea
            className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm"
            {...register("alamat_lengkap")}
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.alamat_lengkap?.message}
          </div>
        </div>

        {/* STATUS KARYAWAN */}
        <div className="col-span-4">
          <FormLabel htmlFor="status_karyawan">
            Status Karyawan <small className="text-danger">*</small>
          </FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="aktif">Aktif</option>
                <option value="tidak_aktif">Tidak Aktif</option>
              </FormSelect>
            )}
            name="status_karyawan"
            control={control}
            defaultValue="islam"
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.status_karyawan?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
