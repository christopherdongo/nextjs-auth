import * as React from "react";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Input from "../inputs/Input";
import {CiUser} from "react-icons/ci";
import {FiMail, FiLock} from "react-icons/fi";
import {BsTelephone} from "react-icons/bs";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import validator from "validator";
import zxcvbn from 'zxcvbn';
import {SlideButton} from '../buttons/SlideButton';
import {toast} from 'react-toastify'
import { error } from "console";
import Link from "next/link";

interface IRegisterProps {}


const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(32, "First name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters alloweb."),
    last_name: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(32, "First name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters alloweb."),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().refine(validator.isMobilePhone, {
      message: "Please enter a valid phone number",
    }),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Pasword must be less than 52 characters"),
    confirmPassword: z.string(),
    accept: z.literal(true,{
      errorMap:() => ({
        message: 'Please agree to all the terms and conditions before continuing.'
      })
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterProps> = (props) => {
  const [passwordScore, setPasswordScore ] = useState(0);



  const {
    register,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<FormSchemaType>({resolver: zodResolver(FormSchema)});

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {

    try{
      const {data} = await axios.post("/api/auth/signup",{
        ...values
      })
      console.log(data)
      toast.success(data.message)
    }catch(err:any){
       toast.error(err.response.data.message)
    }
  };

  const validatePasswordStreanght=()=>{
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  }

  useEffect(() => {
     setPasswordScore(validatePasswordStreanght)
  },[watch().password])

  return (
    <div className="w-full px-12 py-4">
    <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
      Sign up
    </h2>
    <p className="text-center text-sm text-gray-600 mt-2">
      You already have an account? &nbsp;
      <Link
        href="/auth"
        className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
      >
        Sign in
      </Link>
    </p>
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          // error={errors?.first_name?.message}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="last_name"
          label="Last name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          // error={errors?.first_name?.message}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
      </div>
      <Input
        name="email"
        label="Email address"
        type="text"
        icon={<FiMail />}
        placeholder="example@emaple.com"
        register={register}
        // error={errors?.first_name?.message}
        error={errors?.email?.message}
        disabled={isSubmitting}
      />
      <Input
        name="phone"
        label="Number of Phone"
        type="text"
        icon={<BsTelephone />}
        placeholder="+(xxx) xxxxxxxxx"
        register={register}
        // error={errors?.first_name?.message}
        error={errors?.phone?.message}
        disabled={isSubmitting}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        autocomplete="on"
        icon={<FiLock />}
        placeholder="************"
        register={register}
        error={errors?.password?.message}
        disabled={isSubmitting}
      />
      {
        watch().password?.length > 0 && <div className="flex mt-2">
          {Array.from(Array(5).keys()).map((sapn, i) => (
            <span className="w-1/5 px-1" key={i}>
              <div className={
                 `h-2 rounded-x1 b  ${
                  passwordScore<=2 
                  ? "bg-red-400" 
                  : passwordScore < 4 
                  ? "bg-yellow-400" 
                  : "bg-green-500"  
              }`

              }
            >
            </div>
            </span>
          ))}
        </div>
      }
      <Input
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autocomplete="on"
        icon={<FiLock />}
        placeholder="************"
        register={register}
        error={errors?.confirmPassword?.message}
        disabled={isSubmitting}
      />
      <div
      className="flex items-center"
      >
      <input 
      type="checkbox"
      id="accept"
      className="mr-2 focus:ring-0 rounded"
      {...register("accept")}
      />
      <label htmlFor="accept" className="text-gray-700">
        I accept the&nbsp; <a href="" target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline">terms</a>
        &nbsp;and&nbsp;
        <a href="" target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline">privacy policy</a>
      </label>
      </div>
      <div>
        {
          errors?.accept && (<p className="text-sm text-red-600 mt-1">{errors?.accept?.message}</p>)
        }
      </div>
      <SlideButton 
       type="submit"
       text="Sign up"
       slide_text="Secure sign up"
       icon={<FiLock />}
       disabled={isSubmitting}
      />
     
      
    </form>
    </div>
  );
};

export default RegisterForm;
