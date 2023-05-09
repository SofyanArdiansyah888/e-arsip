import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface ICreatePendidikanFormal {
  isModal: boolean;
  handleCancel(): void;
}
const schema = yup
  .object({
    nama_sekolah: yup.string().required(),
    jenjang: yup.string().required(),
    tahun_masuk: yup.number().required(),
    tahun_keluar: yup.number().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreatePendidikanFormal(props: ICreatePendidikanFormal) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );

  const { mutate, isLoading } = usePost<FormData & { karyawan_id: number }>({
    endpoint: "pendidikan-karyawans",
    name: "karyawan-details",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menambahkan Pendidikan  Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreatePendidikanFormal(data: FormData) {
    if (selectedKaryawan?.id)
      mutate({
        ...data,
        karyawan_id: selectedKaryawan.id,
      });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Tambahan Pendidikan Formal",
        handleSubmit,
        submitCallback: handleCreatePendidikanFormal,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_sekolah">
            Nama Sekolah <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama_sekolah")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_sekolah?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="jenjang">
            Jenjang <small className="text-danger">*</small>
          </FormLabel>
          <select
            {...register("jenjang")}
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
            {errors.jenjang?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="tahun_masuk">
            Tahun Masuk <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="number" {...register("tahun_masuk")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tahun_masuk?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="tahun_keluar">
            Tahun Keluar <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="number" {...register("tahun_keluar")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tahun_keluar?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
