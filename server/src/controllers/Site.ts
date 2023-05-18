import { Request, Response } from "express";
import Site from "../models/Site";
import Client from "../models/Client";
import { error } from "console";

export const getAllSite = (req: Request, rep: Response) => {
    
    Site.findAll()
    .then((result) => {
        rep.json({
            data: result,
        })
    })
    .catch((error) => {
        rep.status(400).json({
            error: error,
        })
    });

};

export const addSite = (req: Request, rep: Response) => {

    const {address, idClient} = req.body;

    Client.findOne({
        where: {
            idClient: idClient,
        }
    })
    .then(() => {
        Site.create({
            address: address,
            idClient: idClient,
        })
        .then((result) => {
            rep.status(201).json({
                data: result,
            });
        })
        .catch((error) => {
            rep.status(400).json({
                error: error,
            });
        });
    })
    .catch((error) => {
        rep.status(400).json({
            error: error,
        })
    });

};

export const deleteSite = (req: Request, rep: Response) => {

    const {idSite} = req.body;

    Site.findOne({
        where: {
            idSite: idSite
        }
    })
    .then((site) => {
        if(site != null) {
            site.destroy();
            rep.status(202).send();
        }
        else {
            rep.status(404).send();
        }
    })
    .catch((error) => {
        rep.status(400).json({
            error: error,
        })
    });

};