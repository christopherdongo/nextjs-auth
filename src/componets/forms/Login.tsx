import * as React from "react";
import {useState} from 'react';
import axios from 'axios';
import Input from "../inputs/Input";
import {FiMail, FiLock} from "react-icons/fi";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { SlideButton } from "../buttons/SlideButton";
import {useRouter} from 'next/router';
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";


interface IRegisterProps {
    callbackUrl: string;
    csrfToken: string;
}


const FormSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Pasword must be less than 52 characters"),
  })

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm: React.FunctionComponent<IRegisterProps> = (props) => {

    const {callbackUrl, csrfToken} = props;
  
    const router = useRouter();
    const path = router.pathname;
    console.log(`esto es el ${path}`)

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormSchemaType>({resolver: zodResolver(FormSchema)});

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {


        const res: any= await signIn('credentials',{
            redirect:false,
            email:values.email,
            password:values.password,
            callbackUrl
        })
         console.log(`se imprime el ${res}`)
        if(res.error){
            return toast.error(res.error);
        }else{
            return router.push("/");
        }
    

  };

  return (
    <div className="w-full px-12 py-4">
    <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
      Sign in
    </h2>
    <p className="text-center text-sm text-gray-600 mt-2">
      You do not have an account? &nbsp;
      <a
        className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        onClick={() => {
            router.push({
                pathname: path,
                query:{
                    tab:'signup',
                }
            })
        }}
      >
        Sign up
      </a>
    </p>
    <form 
    method="post"
    action="/api/auth/signin/email"
    className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
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


      <SlideButton 
       type="submit"
       text="Sign in"
       slide_text="Secure sign in"
       icon={<FiLock />}
       disabled={isSubmitting}
      />
     
      
    </form>
    </div>
  );
};

export default LoginForm;
