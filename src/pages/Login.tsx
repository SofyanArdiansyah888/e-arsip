import logoUrl from "@/assets/images/logo.png";
import Button from "@/base-components/Button";
import { FormCheck, FormInput } from "@/base-components/Form";
import { usePost } from "@/hooks/useApi";
import { UserEntity } from "@/models/User.entity";
import { useAuth } from "@/providers/AuthProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Login() {
  const auth = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = usePost<FormData>({
    endpoint: "login-admin",
    name: "login",
    onSuccessCallback: (data: UserEntity) => {
        auth.login(data)
    },
    onErrorCallback: (error: any) => {
      if (error.response.status == 422) {
        setError("name", { message: error.response?.data.errors.name[0] });
      }
    },
  });

  const handleLogin = (data: FormData) => {
    mutate(data);
  };
  return (
    <>
      <div
        className={clsx([
          "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            <LoginInfo />
            {/* BEGIN: Login Form */}

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0"
            >
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Sign In
                </h2>

                <div className="mt-8 intro-x">
                  <FormInput
                    type="text"
                    {...register("name")}
                    placeholder="Username..."
                  />
                  <div className="text-danger font-semibold text-xs mt-2">
                    {errors.name?.message}
                  </div>
                  <FormInput
                    type="password"
                    className="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                    placeholder="Your Password..."
                    {...register("password")}
                  />
                  <div className="text-danger font-semibold text-xs mt-2">
                    {errors.password?.message}
                  </div>
                </div>
                <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                  <div className="flex items-center mr-auto">
                    <FormCheck.Input
                      id="remember-me"
                      type="checkbox"
                      className="mr-2 border"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                  <Button
                    variant="primary"
                    className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>

            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

function LoginInfo() {
  return (
    <>
      {/* BEGIN: Login Info */}
      <div className="flex-col hidden min-h-screen xl:flex">
        {/* <a href="" className="flex items-center pt-5 -intro-x">
          <img
            alt="LOGO"
            className="w-24"
            src={logoUrl}
          />
          <span className="ml-3 text-lg text-white"> Rubick </span>
        </a> */}
        <div className="my-auto">
          <img
            alt="LOGO"
            className="w-1/3 ml-12 -mt-16 -intro-x "
            src={logoUrl}
          />
          <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
            Selamat Datang, <br />
            Di Dashboard
          </div>
        </div>
      </div>
      {/* END: Login Info */}
    </>
  );
}

export default Login;
