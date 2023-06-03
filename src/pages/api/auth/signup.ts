// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '@/utils/connectDb';
import validator from 'validator';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import {createActivationToken} from '@/utils/tokens';
import sendMail from '@/utils/sendMail';
import { activateTemplateEmail } from '@/componets/emailTemplates/activate';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

   
 await connectDb();

 const {first_name, last_name, email, phone, password} = req.body;
 console.log(req.body)

 if(!first_name || !last_name || !email || !phone || !password) {
    return res.status(400).json({message: "Please fill in all fields"});
 }

 if(!validator.isEmail(email)){
   return res.status(400).json({message:"Please a valid email address"})
 }
 if(!validator.isMobilePhone(phone)){
    return res.status(400).json({message:"Please a valid phone number"})
  }

  const user = await User.findOne({email:email})

  if(user){
    return res.status(400).json({message: "this email address already exists"})
  }

  if(password.length < 6){
    return res.status(400).json({message: "Password must be atleast 6 characters"})
  }

  const crytedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name: `${first_name +" "+ last_name}`,
    email,
    phone,
    password: crytedPassword
  })
 
  await newUser.save();
  const activation_token = createActivationToken({
   id:newUser._id.toString(),
  })
  const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;
  await sendMail(newUser.email, newUser.name, url, "Activate your account - authNext", activateTemplateEmail)

  res.status(200).json({message: 'Register success! Please active your account to start'})

} catch(err){
    res.status(500).json({message: (err as Error).message})
}
  
}
