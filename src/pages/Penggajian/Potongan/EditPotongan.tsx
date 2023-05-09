import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  FormInput,
  FormLabel,
  FormSelect,
} from "../../../base-components/Form";
import Litepicker from "../../../base-components/Litepicker";
import Lucide from "../../../base-components/Lucide";
import { BaseModal } from "../../../components/Modals/Modals";
import { usePut } from "../../../hooks/useApi";
import { PotonganEntity } from "../../../models/Potongan.entity";
import { setNotification } from "../../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../../stores/hooks";
import { formatRupiah, sanitizeNumber } from "../../../utils/helper";

interface IEditPotongan {
  isModal: boolean;
  selectedItem: PotonganEntity | undefined;
  handleCancel(): void;
}
const schema = yup
  .object({
    nama_potongan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreatePotongan(props: IEditPotongan) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    unregister,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // const watchPermanent = watch("permanent");

  useEffect(() => {
    const { selectedItem } = props;
    if (selectedItem) {
      setValue("nama_potongan", selectedItem.nama_potongan);
    }
  }, [props.isModal]);

  

  useEffect(() => {
    if (!props.isModal) reset();
  }, [props.isModal]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<FormData & {nominal_bawaan:number}>({
    endpoint: `potongans/${props.selectedItem?.id}`,
    name: "potongans",
    onSuccessCallback: () => { 
      dispatch(
        setNotification({
          message: "Berhasil Mengedi Potongan",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleUpdatePotongan(data: FormData) {
    mutate({
      ...data,
      nominal_bawaan: 0,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Potongan",
        handleSubmit,
        submitCallback: handleUpdatePotongan,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-6">
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
