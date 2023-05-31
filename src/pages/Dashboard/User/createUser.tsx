import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateUser {
  isModal: boolean;
  handleCancel(): void;
}

interface IStoreUser {
  name: string;
  email: string;
  password: string
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().notRequired(),
    password: yup.string().min(3).required()
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateUser(props: ICreateUser) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<IStoreUser>({
    endpoint: "users",
    name: "users",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat User Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateUser(data: any) {
    mutate({
      ...data,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat User",
        handleSubmit,
        submitCallback: handleCreateUser,
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
