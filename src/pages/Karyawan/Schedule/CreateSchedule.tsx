import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import TomSelect from "@/base-components/TomSelect";
import { BaseModal } from "@/components/Modals/Modals";
import { useGet, usePost } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { now } from "lodash";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateSchedule {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    karyawan_id: yup.string().required(),
    tanggal: yup.string().required(),
    hari: yup
      .mixed()
      .oneOf(["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"]),
    masuk: yup.string().required(),
    keluar: yup.string().required(),
    toleransi: yup.number().required(),
    periode_istirahat: yup.number().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateSchedule(props: ICreateSchedule) {
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
    defaultValues:{
        hari: 'senin',
        periode_istirahat: 60,
        toleransi: 15,
        masuk: '08:00:00',
        keluar: '17:00:00'
    }
  });

  const { data: karyawanPayload } = useGet<GetPayload<KaryawanEntity>>({
    name: "karyawans",
    endpoint: "karyawans",
    page: 0,
    limit: 0,
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<FormData>({
    endpoint: "schedules",
    name: "schedules",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Schedule",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateSchedule(data: FormData) {
    mutate({
      ...data,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Schedule",
        handleSubmit,
        submitCallback: handleCreateSchedule,
        control,
        isLoading,
        size: "lg",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        {/* TANGGAL */}
        <div className="col-span-6">
          <FormLabel htmlFor="tanggal">
            Tanggal <small className="text-danger">*</small>
          </FormLabel>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Litepicker
                value={value}
                onChange={onChange}
                options={{
                  autoApply: false,
                  singleMode: true,
                  numberOfColumns: 1,
                  numberOfMonths: 1,
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
            name="tanggal"
            control={control}
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal?.message}
          </div>
        </div>

        {/* HARI */}
        <div className="col-span-6">
          <FormLabel htmlFor="hari">
            Hari <small className="text-danger">*</small>
          </FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="senin">Senin</option>
                <option value="selasa">Selasa</option>
                <option value="rabu">Rabu</option>
                <option value="kamis">Kamis</option>
                <option value="jumat">Jumat</option>
                <option value="sabtu">sabtu</option>
                <option value="minggu">miggu</option>
              </FormSelect>
            )}
            name="hari"
            control={control}
            defaultValue="senin"
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.hari?.message?.toString()}
          </div>
        </div>
        {/* KARYAWAN  */}
        <div className="col-span-6">
          <FormLabel htmlFor="karyawan_id">
            Karyawan <small className="text-danger">*</small>
          </FormLabel>
          <div>
            <Controller
              render={({ field }) => (
                <TomSelect {...field}>
                  <option value="">Select</option>
                  {karyawanPayload?.data.map((karyawan, index) => (
                    <option key={index} value={karyawan.id.toString()}>
                      {karyawan.nama_lengkap}
                    </option>
                  ))}
                </TomSelect>
              )}
              name="karyawan_id"
              control={control}
            />
          </div>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.karyawan_id?.message}
          </div>
        </div>

        {/* MASUK  */}
        <div className="col-span-6">
          <FormLabel htmlFor="masuk">
            Masuk <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("masuk")} placeholder="hh:mm" />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.masuk?.message}
          </div>
        </div>

        {/* KELUAR  */}
        <div className="col-span-6">
          <FormLabel htmlFor="keluar">
            Pulang <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("keluar")} placeholder="hh:mm" />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.keluar?.message}
          </div>
        </div>

        {/* TOLERANSI  */}
        <div className="col-span-6">
          <FormLabel htmlFor="toleransi">
            Toleransi <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="number" {...register("toleransi")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.toleransi?.message}
          </div>
        </div>

        {/* PERIODE ISTIRAHAT  */}
        <div className="col-span-6">
          <FormLabel htmlFor="periode_istirahat">
            Periode Istirahat <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="number" {...register("periode_istirahat")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.periode_istirahat?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
