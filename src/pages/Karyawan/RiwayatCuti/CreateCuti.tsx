import Dropzone from "@/base-components/Dropzone";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
} from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import TomSelect from "@/base-components/TomSelect";

import { BaseModal } from "@/components/Modals/Modals";
import { useGet, usePost } from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { GetDetailPayload, GetPayload } from "@/models/GenericPayload";
import { IzinEntity } from "@/models/Izin.entity";
import { IzinKaryawanEntity } from "@/models/IzinKaryawan.entity";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
interface ICreateCuti {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    karyawan_id: yup.string().required(),
    izin_id: yup.string().required(),
    status: yup.string().required(),
    nama_jabatan: yup.string().nullable(),
    sisa_cuti: yup.number().nullable(),
    tanggal_izin: yup.string().required(),
    keterangan: yup.string().required(),
    telepon: yup.string().required(),
    nama_file: yup.string().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export function CreateCuti(props: ICreateCuti) {
  const [user] = useLocalStorage("user");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [props.isModal]);

  const { data: izinPayload } = useGet<GetPayload<IzinEntity>>({
    name: "izins",
    endpoint: "izins",
    page: 0,
    limit: 0,
    filter: {
      jenis_izin: "cuti",
    },
  });

  const { data: karyawanPayload } = useGet<GetPayload<KaryawanEntity>>({
    name: "karyawans",
    endpoint: "karyawans",
    page: 0,
    limit: 0,
    filter: {
      limit: 0,
    },
  });

  const dispatch = useAppDispatch();
  const { mutate, isLoading } = usePost<
    Omit<FormData, "nama_jabatan" | "tanggal_izin"> & {
      tanggal_mulai: string;
      tanggal_selesai: string;
    }
  >({
    endpoint: "riwayat-izins",
    name: "riwayat-cutis",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Cuti Karyawan",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateIzin({
    nama_jabatan,
    tanggal_izin,
    ...data
  }: FormData): void {
    let diff = 0;

    const tanggal = tanggal_izin.split("-");
    diff = dayjs(tanggal[1]).diff(tanggal[0], "days");
    diff += 1
    if (sisaCuti !== null && sisaCuti !== undefined) {
      if (diff > sisaCuti) {
        dispatch(
          setNotification({
            message: "Sisa Cuti Tidak Cukup",
            status: "warning",
          })
        );
        props.handleCancel();
      } else {
        mutate({
          ...data,
          tanggal_mulai: tanggal[0],
          tanggal_selesai: tanggal[1],
        });
      }
    }
  }

  const karyawanWatch = watch("karyawan_id");
  const izinWatch = watch("izin_id");
  const sisaCuti = watch("sisa_cuti");

  const { data: karyawanIzinPayload, refetch: refetchKaryawanIzin } = useGet<
    GetDetailPayload<IzinKaryawanEntity>
  >({
    name: "karyawan-izins",
    endpoint: `karyawans/${karyawanWatch}/izins/${izinWatch}`,
    page: 0,
    limit: 0,
    filter: {
      izin_id: izinWatch,
      karyawan_id: karyawanWatch,
    },

  });
  useEffect(() => {
    if (izinWatch) {
      refetchKaryawanIzin();
    }
  }, [karyawanWatch, izinWatch]);

  useEffect(() => {
    if (!karyawanIzinPayload?.data) {
      setValue("sisa_cuti", 0);
    } else {
      setValue("sisa_cuti", karyawanIzinPayload?.data?.sisa_quota);
    }
  }, [karyawanIzinPayload]);

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Cuti Karyawan",
        submitCallback: handleCreateIzin,
        handleSubmit,
        control,
        isLoading,
        size: "lg",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-2 overflow-y-auto max-h-[70vh]">
        {/* STATUS  */}
        <div className="col-span-6">
          <FormLabel htmlFor="status">
            Status Cuti <small className="text-danger">*</small>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="pengajuan">Pengajuan</option>
                <option value="disetujui atasan">Disetujui Atasan</option>
                <option value="disetujui hrd">Disetujui HRD</option>
                <option value="disetujui">Disetujui</option>
              </FormSelect>
            )}
            name="status"
            control={control}
            defaultValue="pengajuan"
          />

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.status?.message}
          </div>
        </div>
        {/* JENIS IZIN */}
        <div className="col-span-6">
          <FormLabel htmlFor="izin">
            Jenis Cuti<small className="text-danger">*</small>
          </FormLabel>
          <div>
            <Controller
              render={({ field }) => (
                <FormSelect {...field}>
                  <option value="">Select</option>
                  {izinPayload?.data.map((izin, index) => (
                    <option key={index} value={izin.id}>
                      {izin.nama_izin}
                    </option>
                  ))}
                </FormSelect>
              )}
              name="izin_id"
              control={control}
              defaultValue={""}
            />
          </div>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.izin_id?.message}
          </div>
        </div>

        {/* KARYAWAN  */}
        <div className="col-span-6">
          <FormLabel htmlFor="karyawan_id">
            Karyawan<small className="text-danger">*</small>
          </FormLabel>
          <div>
            <Controller
              render={({ field }) => (
                <TomSelect
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    const karyawan = karyawanPayload?.data.find(
                      (item) => item.id.toString() === e
                    );
                    setValue("nama_jabatan", karyawan?.jabatan?.nama_jabatan);
                  }}
                >
                  <option value="">Select</option>
                  {karyawanPayload?.data.map((karyawan, index) => (
                    <option key={index} value={karyawan.id}>
                      {karyawan.nama_lengkap}
                    </option>
                  ))}
                </TomSelect>
              )}
              name="karyawan_id"
              control={control}
              defaultValue={""}
            />
          </div>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.karyawan_id?.message}
          </div>
        </div>

        {/* NAMA JABATAN  */}
        <div className="col-span-6">
          <FormLabel htmlFor="nama_jabatan">Jabatan</FormLabel>
          <FormInput type="text" {...register("nama_jabatan")} disabled />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_jabatan?.message}
          </div>
        </div>

        {/* NAMA JABATAN  */}
        <div className="col-span-6">
          <FormLabel htmlFor="nama_jabatan">Sisa Cuti</FormLabel>
          <FormInput type="text" disabled {...register("sisa_cuti")} />
        </div>

        {/* TANGGAL */}
        <div className="col-span-6">
          <FormLabel htmlFor="tanggal_izin">
            Tanggal Mulai - Tanggal Selesai
          </FormLabel>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Litepicker
                value={value}
                onChange={onChange}
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="block  mx-auto"
              />
            )}
            name="tanggal_izin"
            control={control}
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal_izin?.message}
          </div>
        </div>

        {/* TELEPON */}
        <div className="col-span-6">
          <FormLabel htmlFor="telepon">Telepon</FormLabel>
          <FormInput type="tel" {...register("telepon")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.telepon?.message}
          </div>
        </div>

        {/* KETERANGAN */}
        <div className="col-span-6">
          <FormLabel htmlFor="keterangan">Alasan</FormLabel>
          <FormTextarea {...register("keterangan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.keterangan?.message}
          </div>
        </div>

        {/* FILE  */}
        {/* <div className="col-span-6">
          <Dropzone
            options={{
              url: `${import.meta.env.VITE_BASE_URL}upload-izin`,
              acceptedFiles: "image/*",
              maxFilesize: 2,
              maxFiles: 1,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              addRemoveLinks: true,
              success: (file) => {
                const filename = JSON.parse(file.xhr?.response);
                setValue("nama_file", filename.data);
              },
              removedfile: (file) => {
                file.previewElement.remove();
                setValue("nama_file", undefined);
              },
            }}
            className="dropzone"
          >
            <div className="text-md font-medium">Upload Foto Izin</div>
            <div className="text-gray-600">Maximal 2 Mb</div>
          </Dropzone>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_file?.message}
          </div>
        </div> */}
      </div>
    </BaseModal>
  );
}
