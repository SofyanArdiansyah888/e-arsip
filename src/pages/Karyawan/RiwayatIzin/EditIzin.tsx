import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea
} from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import TomSelect from "@/base-components/TomSelect";
import { BaseModal } from "@/components/Modals/Modals";
import { useGet, usePut } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { IzinEntity } from "@/models/Izin.entity";
import { RiwayatIzinEntity } from "@/models/RiwayatIzin.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatDate } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
interface IEditIzinTelat {
  isModal: boolean;
  selectedItem: RiwayatIzinEntity | undefined;
  handleCancel(): void;
}

const schema = yup
  .object({
    karyawan_id: yup.string().required(),
    izin_id: yup.string().required(),
    status: yup.string().required(),
    nama_jabatan: yup.string().nullable(),
    tanggal_izin: yup.string().required(),
    keterangan: yup.string().required(),
    telepon: yup.string().required(),
    nama_file: yup.string().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export function EditIzinTelat(props: IEditIzinTelat) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (props.selectedItem) {
      const {
        karyawan,
        status,
        izin_id,
        telepon,
        keterangan,
        tanggal_mulai,
        tanggal_selesai,
      } = props.selectedItem;
      setValue("karyawan_id", karyawan.id.toString());
      setValue("nama_jabatan", karyawan.jabatan?.nama_jabatan);
      setValue("status", status);
      setValue("izin_id", izin_id.toString());
      setValue("telepon", telepon);
      setValue("keterangan", keterangan);
      setValue(
        "tanggal_izin",
        `${formatDate(tanggal_mulai, "DD MMM YYYY")} - ${formatDate(
          tanggal_selesai,
          "DD MMM YYYY"
        )}`
      );
    }
    if (!props.isModal) reset();
  }, [props.isModal]);

  const dispatch = useAppDispatch();
  const { mutate, isLoading } = usePut<
    Omit<FormData, "nama_jabatan" | "tanggal_izin"> & {
      tanggal_mulai: string;
      tanggal_selesai: string;
    }
  >({
    endpoint: `riwayat-izins/${props.selectedItem?.id}`,
    name: "riwayat-izins",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Izin Karyawan",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  const { data: izinPayload } = useGet<GetPayload<IzinEntity>>({
    name: "izins",
    endpoint: "izins",
    page: 0,
    limit: 0,
    filter: {
      jenis_izin: "izin",
    },
  });

  function handleEditIzin({ nama_jabatan, tanggal_izin, ...data }: FormData) {
    const tanggals = tanggal_izin.split("-");
    mutate({
      ...data,
      tanggal_mulai: tanggals[0],
      tanggal_selesai: tanggals[1],
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Izin Karyawan",
        submitCallback: handleEditIzin,
        handleSubmit,
        control,
        isLoading,
        size: "lg",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        {/* STATUS  */}
        <div className="col-span-6">
          <FormLabel htmlFor="status">
            Status Izin <small className="text-danger">*</small>
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
            Jenis Izin<small className="text-danger">*</small>
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
                <TomSelect {...field} disabled>
                  <option value={props.selectedItem?.karyawan.id}>
                    {props.selectedItem?.karyawan.nama_lengkap}
                  </option>
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
        <div className="col-span-6">
          <a
            href={`${import.meta.env.VITE_BASE_IMAGE_URL}izin/${
              props.selectedItem?.nama_file
            }`}
            target="_blank"
          >
            
            {props.selectedItem?.nama_file && <img
              className="max-w-md max-h-32 rounded-lg shadow-sm"
              src={`${import.meta.env.VITE_BASE_IMAGE_URL}izin/${
                props.selectedItem?.nama_file
              }`}
            />}
          </a>
        </div>
      </div>
    </BaseModal>
  );
}
