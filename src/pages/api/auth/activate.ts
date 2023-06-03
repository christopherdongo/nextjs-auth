// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '@/utils/connectDb';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
const {ACTIVATION_TOKEN_SECRET} = process.env;
import { activateTemplateEmail } from '@/componets/emailTemplates/activate';

interface UserToken{
  id:string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

 await connectDb();
 const {token} = req.body;

 const userToken = await jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as UserToken;
 const userDb = await User.findById(userToken?.id);
 console.log(userDb)

 

 if(userDb.emailVerified === false){
  res.status(400).json({message:"Email address already verifies."});
 }
 await User.findByIdAndUpdate(userDb.id,{emailVerified: true});
 res.status(400).json({message:"Account has been successfully verified."});

} catch(err){
    res.status(500).json({message: (err as Error).message})
}
  
}
