export interface Task {
    idTask : number | undefined;
    label : string;
    description : string;
    date: Date;
    heureDeb : Date;
    heureFin : Date;
    idEmployee : number | undefined;
    idClient: number | undefined;
    idSite : number | undefined;
}
