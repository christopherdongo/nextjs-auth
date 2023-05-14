import { NextPageContext } from "next"
import { useSession, signIn, signOut, getSession } from "next-auth/react"


export default function Home() {

  const { data: session } = useSession()
  console.log(session)
  return (
    <div
    className="min-h-screen flex flex-col justify-center items-center content-center"
    >
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
        
        
    </div>
  )
}


export async function getServerSideProps(ctx: NextPageContext){

  const session = await getSession(ctx);

  return {
    props:{session},
  }
}