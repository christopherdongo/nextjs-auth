import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FaDiscord, FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import { SiAuth0 } from 'react-icons/si';


interface ISocialButtonProps {
key: string;
text: string;
id: string;
csrfToken: string;
}


const SocialButton: React.FunctionComponent<ISocialButtonProps> = (props) =>{

    const {id, text, csrfToken} = props;


    const createIconJsx=(id:string)=>{
    switch(id){
        case "google":
         return <FaGoogle />;
        case "facebook":
         return <FaFacebook />
        case "auth0":
         return <SiAuth0 />;
        case "github":
         return <FaGithub />;
        case "discord":
         return <FaDiscord />;
        case "spotify":
         return <FaDiscord />;
        case "twitter":
        return <FaTwitter />;
        default:
        return;
    }
    }


    const colors:any={
        google:"#db4437",
        facebook:"#4285f4",
        auth0:"#eb5424",
        github: "#333",
        discord: "#7289da",
        spotify:"#1db954",
        twitter: "#1da1f2",
    }



    return<form
     method='post'
     action={`/api/auth/signin/${id}`}
     
    >
        <input type='hidden' name="csrfToken" defaultValue={csrfToken} />
        <button
        className='w-full mb-2 py-2 px-4 flex justify-center items-center gap-2 hover:bg-gray-700 rounded-lg text-white font-semibold shadow-mb focus:outline-none focus:ring-2 focus:ring-offset-2 row text-base'
        type="button"
        style={{background: `${colors[id]}`}}
        onClick={() => signIn(id)}
        
        >
            {createIconJsx(id)}
            {text}</button>
    
    </form>
}

export default SocialButton