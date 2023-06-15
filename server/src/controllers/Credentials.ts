import { Request, Response } from 'express';
import { type } from 'os';
import Credential from '../models/Credential';
import Employee from '../models/Employee';
import Client from '../models/Client';
import { log } from 'console';

export const getAllUsers = async (req: Request, rep: Response) => {

    Credential.findAll({
        where: {
            isVerified: -1,
        }
    })
    .then( data => {
        rep.json(data);
    })
    .catch( error => {
        rep.status(400).json(error);
    });

};

export const login = async (req: Request, rep: Response) => {
    
    console.log("Ici");

    const { login, hashPassword } = req.body;

    Credential.findAll({
        where: {
            login : login,
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

                Employee.findOne({
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
                    rep.status(400).json(error)
                });
            }
            else if(typeUserInt == 2) {

                Client.findOne({
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
                isVerified: 0
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
                isVerified: 0
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

export const unregister = async (req: Request, rep: Response) => {

    const {email, hashPassword, isAdmin} = req.body;

    if(isAdmin) {        
        Credential.findOne({
            where: {
                login: email,
            }
        })
        .then((cred) => {
            const userType = cred?.getDataValue("type");

            if(userType == 1) {
                Employee.destroy({
                    where: {
                        email: email,
                    }
                })
                .then((result) => {
                    cred?.destroy();
                    rep.json({
                        isAdmin: isAdmin,
                        data: result,
                    })
                })
                .catch((error) => {
                    rep.status(400).json({
                        error : error,
                    })
                });
            }
            else if(userType == 2) {
                Client.destroy({
                    where: {
                        email: email,
                    }
                })
                .then((result) => {
                    cred?.destroy();
                    rep.json({
                        isAdmin: isAdmin,
                        data: result,
                    })
                })
                .catch((error) => {
                    rep.status(400).json({
                        error : error,
                    })
                });
            }
        })
        .catch((error) => {
            rep.status(400).json({
                error: error
            });
        });
    }
    else{
        Credential.findOne({
            where: {
                login: email,
                hashPassword: hashPassword,
            }
        })
        .then((cred) => {
            const userType = cred?.getDataValue("type");

            if(userType == 1) {
                Employee.destroy({
                    where: {
                        email: email,
                    }
                })
                .then((result) => {
                    cred?.destroy();
                    rep.json({
                        isAdmin: isAdmin,
                        data: result,
                    })
                })
                .catch((error) => {
                    rep.status(400).json({
                        error : error,
                    })
                });
            }
            else if(userType == 2) {
                Client.destroy({
                    where: {
                        email: email,
                    }
                })
                .then((result) => {
                    cred?.destroy();
                    rep.json({
                        isAdmin: isAdmin,
                        data: result,
                    })
                })
                .catch((error) => {
                    rep.status(400).json({
                        error : error,
                    })
                });
            }
        })
        .catch((error) => {
            rep.status(400).json({
                error: error
            });
        });
    }

};

export const checkEmail = async (req: Request, rep: Response) => {

    const {email} = req.body;
    
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

export const allowUser = async (req: Request, rep: Response) => {

    const {email} = req.body;

    Credential.findOne({
        where: {
            login: email,
        }
    })
    .then( (cred) => {
        cred?.update({
            isVerified: 1,
        })
        .then( (result) => {
            rep.status(200).send();
        })
        .catch( (error) => {
            rep.status(400).json(error);
        })
    })
    .catch( (error) => {
        rep.status(400).json(error);
    });
};