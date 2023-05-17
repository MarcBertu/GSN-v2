import { Request, Response } from 'express';
import { type } from 'os';
import Credential from '../models/Credential';
import Employee from '../models/Employee';
import Client from '../models/Client';
import { log } from 'console';

export const login = async (req: Request, rep: Response) => {

    const { mail, hashPassword } = req.body;

    console.log(mail, hashPassword);

    Credential.findAll({
        where: {
            login : mail,
            hashPassword: hashPassword
        }
    })
    .then( data => {
        if(data.length > 0) {

            const cred = data[0];

            const typeUserInt = cred.getDataValue("type");

            /**
             * Si typeUserInt vaut 0 -> Admin soit 1 -> Employé
             * Si typeUserInt vaut 2 le user est un client
             */

            if(typeUserInt == 0 || typeUserInt == 1) {

                Employee.findAll({
                    where: {
                        email: cred.getDataValue("login")
                    }
                })
                .then( (model) => {

                    log(model);

                    rep.json({
                        userType: typeUserInt,
                        data: model,
                    });
                })
                .catch( (error) => {
                    rep.status(400).json(error)
                });
            }
            else if(typeUserInt == 2) {

                Client.findAll({
                    where: {
                        email: cred.getDataValue("login")
                    }
                })
                .then( (model) => {
                    rep.json({
                        userType: typeUserInt,
                        data: model,
                    });
                })
                .catch( (error) => {
                    rep.status(400).json(error);
                });
            }

        }
        else {
            rep.status(404).json({
                cause : "cred_not_found"
            });
        }
    })
    .catch( error => {
        rep.status(400).json(error);
    })

};

export const register = async (req: Request, rep: Response) => {

    const { mail, hashPassword, typeUser} = req.body;

    Credential.create({
        login: mail,
        hashPassword: hashPassword,
        type: typeUser,
    })
    .then( creds => {

        const credType = creds.getDataValue("type");

        if(credType == 1) {

            const { firstname, lastname, birthDate, phone } = req.body;
            Employee.create({
                lastname: lastname,
                firstname: firstname,
                birthDate: birthDate,
                email: creds.getDataValue("login"),
                phone: phone,
            })
            .then( model => {
                rep.status(201).json({
                    userType: credType,
                    data: model,
                });
            })
            .catch( error => {
                creds.destroy();
                rep.status(400).json({
                    message: error
                })
            });
        }
        else if(credType == 2) {

            const { firstname, lastname, phone, fax, siret, siren } = req.body;

            Client.create({
                lastname: lastname,
                firstname: firstname,
                email: creds.getDataValue("login"),
                phone: phone,
                fax: fax,
                siret: siret,
                siren: siren,
            })
            .then( model => {
                rep.status(201).json({
                    userType: credType,
                    data: model,
                });
            })
            .catch( error => {    
                creds.destroy();    
                rep.status(400).json({
                    message: error
                })
            });
        }

    })
    .catch( error => {
        rep.status(400).json({
            message: error
        })
    });

};

export const unregister = (req: Request, rep: Response) => {

};

export const checkEmail = (req: Request, rep: Response) => {

    const {email} = req.body;

    log(email);
    
    Credential.findAll({
        where: {
            login: email
        }
    })
    .then( (data) => {
        let bool: boolean = data.length > 0;

        rep.json({
            data: bool,
        })
    })
    .catch( (error) => {
        rep.status(400).json(error);
    })

};