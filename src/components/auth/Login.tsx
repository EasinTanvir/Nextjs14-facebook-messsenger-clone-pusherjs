"use client";
import Link from "next/link";
import Inputs from "./Inputs";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmitHandler = (data: any) => {
    console.log(data);
  };
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center ">
      <div className="sm:w-[550px] w-[400px] flex flex-col gap-3 px-5 py-9 shadow-md bg-slate-200 rounded-md">
        <div className="text-center mb-4">
          <h1 className="font-semibold text-3xl">SignIn Now</h1>
        </div>
        <Inputs
          label="UserName"
          type="text"
          required
          id="userName"
          errors={errors}
          register={register}
          message="UserName is required"
          placeholder="Type your UserName"
        />{" "}
        <Inputs
          label="Password"
          type="password"
          required
          id="password"
          errors={errors}
          register={register}
          message="password is required"
          placeholder="Type your password"
          minLength={6}
        />
        <div className="text-start">
          <button
            className="bg-teal-700 text-white px-4 py-2 rounded-md hover:text-slate-400"
            onClick={handleSubmit(onSubmitHandler)}
          >
            Submit
          </button>
        </div>
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <span className="font-semibold">SignUp Now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
