import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah, sanitizeNumber } from "@/utils/helper";

interface ICreatePotongan {
  isModal: boolean;
  handleCancel(): void;
}
const schema = yup
  .object({
    nama_potongan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreatePotongan(props: ICreatePotongan) {
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
    reset();
  }, [props.isModal]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<FormData & {nominal_bawaan: number}>({
    endpoint: "potongans",
    name: "potongans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Potongan Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreatePotongan(data: FormData ) {
    mutate({
      ...data,
      nominal_bawaan: 0,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Potongan Baru",
        handleSubmit,
        submitCallback: handleCreatePotongan,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_potongan">
            Nama Potongan <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama_potongan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_potongan?.message}
          </div>
        </div>

        {/* <div className="col-span-6">
          <FormLabel htmlFor="nominal_bawaan">
            Nominal Bawaan <small className="text-danger">*</small>
          </FormLabel>
          <FormInput
            type="text"
            {...register("nominal_bawaan")}
            onChange={(e) =>
              setValue("nominal_bawaan", formatRupiah(e.target.value))
            }
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nominal_bawaan?.message}
          </div>
        </div> */}
      </div>
    </BaseModal>
  );
}
