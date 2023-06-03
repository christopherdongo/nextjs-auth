import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars'


export default async function sendMail(
    to:string,
    name:string,
    url:string,
    subject:string,
    template:string
){
const {SMTP_EMAIL,SMTP_PASSWORD, SMTP_HOST,MAILING_EMAIL, PASSWORD_EMAIL, SMTP_PORT } = process.env;

let transportter = await nodemailer.createTransport({
    /* port:Number(SMTP_PORT),
    host:SMTP_HOST,
    auth:{
        user:SMTP_EMAIL,
        pass:SMTP_PASSWORD
    }*/
    service: "gmail",
    auth:{
        user:MAILING_EMAIL,
        pass:PASSWORD_EMAIL,
    },
})
//html replace
const data = handlebars.compile(template);
const replacements={
    name:name,
    email_link:url
};

const html = data(replacements);

//--verify
await new Promise((resolve, reject) =>{
    transportter.verify((error, success) => {
        if(error){
            console.log(error);
            reject(error);
        }else{
            console.log('server is listening');
            resolve(success);
        }
    })
});

//send email

const options={
    from:MAILING_EMAIL,
    to,
    subject,
    html,
};

await new Promise((resolve, reject) => {
    transportter.sendMail(options, (error, info) => {
        if(error){
     console.error(error)
     reject(error)
        }else{
            console.log(info)
            resolve(info)
        }
    })
})

}