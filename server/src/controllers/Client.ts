import {Request, Response} from "express";
import Client from "../models/Client";

export const getAll = async (req: Request, rep: Response) => {

    Client.findAll()
    .then((clients) => {
        rep.json(clients)
    })
    .catch((error) => { 
        rep.status(400).json({
            error: error,
        })
    });

};