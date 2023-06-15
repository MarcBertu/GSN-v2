import {Request, Response} from "express";
import Employee from "../models/Employee";

export const getAll = async (req: Request, rep: Response) => {

    Employee.findAll()
    .then((employees) => {
        rep.json(employees)
    })
    .catch((error) => {
        rep.status(400).json({
            error: error,
        })
    });
    
};