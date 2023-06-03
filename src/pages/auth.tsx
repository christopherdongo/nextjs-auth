import RegisterForm from "@/componets/forms/Register";
import React from "react";
import {Background} from "@/componets/Backgrounds/Background";
import LoginForm from "@/componets/forms/Login";
import { NextPageContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";
import SocialButton from "@/componets/buttons/SocialButton";


type Props = {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
  providers: any

};

export default function auth({tab, callbackUrl, csrfToken, providers}: Props) {
  console.log(`el siguiente es ${tab}`)
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="w-full h-100 flex items-center justify-center">
        {/*----Form----*/}
        <div className="w-full sm:w-auto sm:w5/6 md:w-2/3 lg:w1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex items-center justify-center flex-col">
            {/*----SIGN UP FORM----*/}
            {/*<RegisterForm />*/}
            {
              tab=="signin" ? <LoginForm  callbackUrl={callbackUrl} csrfToken={csrfToken} /> : <RegisterForm />
            }
            <div className="flex items-center justify-center">
              <div className="w-[100px] h-[1px] bg-gray-300"></div>
              <span className="text-sm uppercase mx-6">Or</span>
              <div className="w-[100px] h-[1px] bg-gray-300"></div>
            </div>
            <div className="w-full px-12 mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 sm:px-0 sm:w-auto">
              {
                providers.map((provider:any) => {
                  if(provider.name == "Credentials") return;

                  return( <SocialButton 
                  key={provider.id}
                  id={provider.id}
                  text={tab=="signup" ? `Sign up with ${provider.id}` : `Sign in with ${provider.id}`}
                  csrfToken={csrfToken}
                  />
                  );
                })

              }
               </div>
          </div>
        
        {/*----Background----*/}
        <Background image={`"../../auth/${tab=="signup" ? 'register' : 'login'}.jpg"`} />
      </div>
    </div>
  );
}


export async function getServerSideProps(ctx:NextPageContext) {
  const { req, query} = ctx;
   console.log(`imprimir el ${query}`)
  const tab= query.tab ? query.tab : "signin"
  const callbackUrl=query.callbackUrl ? query.callbackUrl : process.env.NEXTAUTH_URL;
  const csrfToken = await getCsrfToken(ctx);
  const providers = await getProviders();
  console.log(providers)
 
  return {
    props:{
      providers: Object.values(providers!),
      tab:JSON.parse(JSON.stringify(tab), ),callbackUrl, csrfToken
    }
  }

}