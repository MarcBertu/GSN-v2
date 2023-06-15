import { Task } from "../interface/task";

export class WeekElement {

    label : string;
    tasks : Array<Task>;
    date : Date;

    constructor(label : string, tasks : Array<Task>, date : Date) {
        this.label = label;
        this.tasks = tasks;
        this.date = date;
    }

}