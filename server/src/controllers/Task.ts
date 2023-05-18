import { Request, Response } from 'express';
import { type } from 'os';
import Task  from '../models/Task';
import { error, log } from 'console';
import { col, fn } from 'sequelize';
import Employee from '../models/Employee';
import Site from '../models/Site';

export const getAllTasks = async (req: Request, rep: Response) => {

    Task.findAll({
        attributes: {
            include: [
                "idTask",
                "label",
                "description",
                "date",
                [
                    fn
                    (
                      "DATE_FORMAT", 
                      col("heureDeb"), 
                      "%d-%m-%Y %H:%i:%s"
                    ),
                    "heureDeb",
                ],
                [
                    fn
                    (
                      "DATE_FORMAT", 
                      col("heureFin"), 
                      "%d-%m-%Y %H:%i:%s"
                    ),
                    "heureFin",
                ],
            ]
        }
    })
    .then( data => {
        rep.json(data);
    })
    .catch( error => {
        rep.status(404).json(error);
    });

};

export const addTask = async (req: Request, rep: Response) => {

    const { label, description, date, heureDeb, heureFin, idEmployee, idSite } = req.body;

    Employee.findOne({
        where: {
            idEmployee: idEmployee,
        }
    })
    .then()
    .catch((error) => {
        rep.status(401).json({
            error: error,
        })
    });

    Site.findOne({
        where: {
            idSite: idSite,
        }
    }).then((site) => {

        if(site != null ) {
            Task.create({
                label: label,
                description: description,
                date: date,
                heureDeb: heureDeb,
                heureFin: heureFin,
                idEmployee: idEmployee,
                idClient: site.getDataValue('idClient'),
                idSite: idSite
            })
            .then(() => {
                rep.status(202).send();
            })
            .catch((error) => {
                rep.status(401).json({
                    error: error,
                });
            });
        }
        else {
            rep.status(401).send();
        }
        
    })
    .catch((error) => {
        rep.status(401).json({
            error: error,
        })
    });
    
}
