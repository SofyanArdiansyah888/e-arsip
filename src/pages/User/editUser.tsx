import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { UserEntity } from "@/models/User.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().notRequired(),
    password: yup.string().nullable()
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface IEditUser {
  isModal: boolean;
  selectedItem: UserEntity | undefined;
  handleCancel(): void;
}

export default function EditUser(props: IEditUser) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<IEditUser>({
    endpoint: `users/${props.selectedItem?.id}`,
    name: "users",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengedit User",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  useEffect(() => {
    if (props.selectedItem) {
      setValue("name", props.selectedItem?.name);
      setValue('email',props.selectedItem?.email)
    }
  }, [props.isModal]);

  function handleEditUser(data: any) {
    mutate({ ...data });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit User",
        handleSubmit,
        submitCallback: handleEditUser,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
      <div className="col-span-12">
          <FormLabel htmlFor="name">Username</FormLabel>
          <FormInput type="text" {...register("name")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.name?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput type="text" {...register("email")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.email?.message}
          </div>
        </div>


        <div className="col-span-12">
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput type="password" {...register("password")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.password?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
