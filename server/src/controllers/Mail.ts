import { Request, Response } from "express";
import { Mail } from "../interfaces/mail";
import { error, log } from "console";
import Employee from "../models/Employee";
import Client from "../models/Client";
const nodemailer = require('nodemailer');

export const sendEmail = async (req: Request, rep: Response) => {

    const {receiver, id, userType} = req.body;

    var date = new Date();

    var subject = date.toUTCString() + " - " + "GSN -Vérification de votre adresse mail";

    var message : Mail = {
        from: process.env.EMAIL_LOGIN!!,
        to: receiver,
        subject: subject,
        html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            
                <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Please activate your account</title>
                <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
                </head>
                
                <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
                <table role="presentation"
                    style="width: 100%; border-collapse: collapse; border: 0px none; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
                    <tbody>
                    <tr>
                        <td style="padding: 1rem 2rem; vertical-align: top; width: 100%;" align="center">
                        <table role="presentation"
                            style="max-width: 600px; border-collapse: collapse; border: 0px none; border-spacing: 0px; text-align: left;">
                            <tbody>
                            <tr>
                                <td style="padding: 40px 0px 0px;">
                                <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                                    <div style="color: rgb(0, 0, 0); text-align: left;">
                                    <h1 style="margin: 1rem 0">Valider votre adresse mail</h1>
                                    <p style="padding-bottom: 16px">Cliquez sur le lien suivant afin de valider votre adresse mail</p>
                                    <p style="padding-bottom: 16px"><a href="${process.env.UrlEmailVerified}?id=${id}&type=${userType}" target="_blank" style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Confirmer mon adresse mail</a></p>
                                    <p style="padding-bottom: 16px">Cordialement,<br>L'équipe GSN</p>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </body>
            
            </html>
        `
    };
 
    var transporter = nodemailer.createTransport({ // configuration de nodemailer
        service: "gmail", // service de messagerie
        auth: { // authentification
            user: process.env.EMAIL_LOGIN, // email
            pass: process.env.EMAIL_PASSWORD, // mot de passe
        },
    });

    transporter.sendMail(message)
    .then( (info: any) => {
        rep.status(202).send();
    })
    .catch((error: Error) => {
        rep.status(400).json(error);
    })
};

export const emailIsVerified = async (req: Request, rep: Response) => {

    const {userId, userType} = req.body;

    if(userType == "1") {
        Employee.findOne({
            where: {
                idEmployee: userId
            }
        })
        .then( user => {
            if(user != null ) {
                user.setDataValue('isVerified', -1);
                user.save();
            }

            rep.status(202).send();
        })
        .catch( (error) => rep.status(400).json(error) );
    }
    else if (userType == "2") {
        Client.findOne({
            where: {
                idClient: userId
            }
        })
        .then( user => {
            if(user != null ) {
                user.setDataValue('isVerified', -1);
                user.save();
            }

            rep.status(202).send();
        })
        .catch( (error) => rep.status(400).json(error) );
    }
}