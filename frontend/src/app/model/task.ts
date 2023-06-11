import { Time } from "@angular/common";

export class Task {

    heureDebut : number;
    heureFin : number;
    date : Date;
    label : string;
    employee: string;

    constructor(
        label : string,
        employee : string,
        date : string,
        heureDebut : number,
        heureFin : number
    ) { 
        this.label = label;
        this.employee = employee;
        this.date = new Date(date);
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
    }

    static tasksSample() : Array<Task> {
        let liste : Array<Task> = new Array();

        let date : Date = new Date();

        let heureDeb : number = date?.getHours();
        let heureFin : number = date?.getHours();

        let employee : string = "Yannick";

        liste.push(new Task("Chambre", employee, date.toDateString(), heureDeb, heureFin));
        liste.push(new Task("Vaiselle", employee, date.toDateString(), heureDeb, heureFin));
        liste.push(new Task("Travail", employee, date.toDateString(), heureDeb, heureFin));

        return liste;
    }

}
