import axios from "axios";
import {NextPageContext} from "next";
import {useEffect, useState} from "react";
import {signIn} from 'next-auth/react'

export default function Activate({token}: {token: string}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
      activateAccount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const activateAccount = async () => {
    try {
      const {data} = await axios.put("/api/auth/activate", {token});
      console.log(data.message);
      setSuccess(data.message);
    } catch (error: any) {
      setError((error?.response?.data as Error).message);
    }
  };

  
  return <div className="h-screen bg-black flex items-center justify-center">
    {error && (
      <div 
      className="flex justify-center items-center flex-col gap-3"
      >
        <p className="text-red-500 text-xl font-bold">{error}</p>
        <button
        className="bg-blue-500 text-white hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-lg"
        onClick={() => signIn()}
        >Sign in instead</button>
      </div>
    )}
    {success && (
      <div
      className="flex justify-center items-center flex-col"
      >
        <p className="text-green-500 text-xl font-bold">{success}</p>
        <button
        className="bg-blue-500 text-white hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-lg"
        onClick={() => signIn()}
        >Sign in</button>
      </div>
    )}
  </div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  const {query} = ctx;

  const token = query.token;
  console.log(token);

  return {
    props: {
      token,
    },
  };
}
