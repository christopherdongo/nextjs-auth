import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import {
  AiFillGithub,
} from "react-icons/ai";
import {SiUdemy} from 'react-icons/si'
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from 'react-icons/fa'

export default function Home() {
  const { data: session } = useSession();

  const text1 =
    "Proident in nisi sit aliqua dolor aliquip tempor minim reprehenderit do sint. Et ad sint anim magna in duis anim veniam ad mollit sint consectetur. Ad commodo esse ullamco commodo reprehenderit proident ea commodo consequat adipisicing mollit ea.Pariatur commodo ea magna ex nulla incididunt ut. Aute labore velit qui consectetur Lorem ad reprehenderit ex consequat tempor in ex. Ullamco quis anim voluptate magna aute irure ad excepteur cillum anim cupidatat. Id dolor velit proident in";

  const text2 =
    "Nostrud occaecat ex mollit eiusmod aliquip deserunt. Dolor exercitation consequat irure commodo ad id in magna. Amet consectetur duis nostrud est pariatur sit mollit non. Excepteur nostrud officia laboris duis laborum voluptate nulla mollit nulla ipsum officia excepteur commodo dolore. Sit minim labore minim aute ea. Laborum anim cupidatat ea non eiusmod";

  return (
    <div className="home bg-black min-h-screen text-with flex flex-col justify-center items-center content-center mt-4">
      <div className="max-auto">
        <div className="border border-white relative flex flex-col w-full rounded-lg">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full text-right">
              <div className="py-6 px-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  onClick={session?.user ? () => signOut() : () => signIn()}
                >
                  {session?.user ? "Log Out" : "Sign In"}
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <img
                src={session?.user?.image!}
                alt={`${session?.user?.name} image`}
                className="rounded-full h-40 w-40"
              />
            </div>

            <div className="text-center mt-12 text-white">
              <h3 className="text-4xl font-semibold mb-2">
                {session?.user?.name}
              </h3>
              <div className="text-sm mb-2 font-bold">
                {session?.user?.email}
              </div>
              <div className="mb-2 mt-10">
                You logged in using &nbsp;
                <span className="capitalize bg-blue-400 text-white px-4 py-1 m1-2 font-bold italic text-lg rounded-md">
                  {session?.user?.provider}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 py-10 border-t text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="mb-4 text-sm">{text1}</p>
                <p className="font-bold text-xs">{text2}</p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  Source code her : &nbsp;
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-4xl hover:-translate-y-2 ease-out transition duration-300 hover:ease-in"
                  >
                    <AiFillGithub />
                  </a>
                </div>
                <div className="flex justify-center gap-4 mt-4 pt-6 text-3xl">
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:Scale-125 hover:-translate-y-2 ease-out transition duration-300 hover:ease-in"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:Scale-125 hover:-translate-y-2 ease-out transition duration-300 hover:ease-in"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:Scale-125 hover:-translate-y-2 ease-out transition duration-300 hover:ease-in"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:Scale-125 hover:-translate-y-2 ease-out transition duration-300 hover:ease-in"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:Scale-125 hover:-translate-y-2 ease-out transition duration-300 hover:ease-in"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:Scale-125 hover:-translate-y-2 ease-out transition duration-300 hover:ease-in"
                  >
                    <SiUdemy />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        <h1
        className="font-bold underline text-red-600 text-4xl"
        >{session?.user?.name}</h1>
        {
          session?.user?.image ? <img 
          src={session?.user?.image!}
          alt="imagen"
          className="w-[128px] h-32 rounded-full border-collapse"
          /> : false
        }
        <h6>{session?.user?.email}</h6>
        <span>Provider:<b>{session?.user?.provider}</b></span>
        {
          session ? (
<button onClick={() => signOut()}>Sign Out</button>
          ) : (
<button onClick={() => signIn()}>Sign In</button>
          )
        }

      */}
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return {
    props: { session },
  };
}
