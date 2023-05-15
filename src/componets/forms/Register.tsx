import * as React from "react";
import Input from "../inputs/Input";
import {CiUser} from 'react-icons/ci';
import {FiMail} from 'react-icons/fi';
import { useForm } from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'

interface IRegisterProps {}


const FormSchema=z.object({
    first_name:z.string().min(2, "First name must be atleast 2 characters").max(32, "First name must be less than 32 characters")
    .regex(new RegExp("^[a-zA-z]+$"),"No special characters alloweb."),
    last_name:z.string().min(2, "First name must be atleast 2 characters").max(32, "First name must be less than 32 characters")
    .regex(new RegExp("^[a-zA-z]+$"),"No special characters alloweb."),
    email:z.string().email('Please enter a valid email address'),
})

type FormSchemaType = z.infer<typeof FormSchema>

const RegisterForm: React.FunctionComponent<IRegisterProps> = (props) => {

    const {register, handleSubmit, watch, formState:{errors, isSubmitting}} = useForm<FormSchemaType>({resolver:zodResolver(FormSchema)});

    const onSubmit = (data:any) => console.log(data);



  return (
    <form className="my-8 text-sm" 
    onSubmit={handleSubmit(onSubmit)}
    >
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
      <button 
        type="submit"
        >
            Submit
        </button>
    </form>
  );
};

export default RegisterForm;
