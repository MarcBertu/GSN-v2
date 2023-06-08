import { Task } from "../interfaces/task";

export class DayTab {

    label : string;
    tasks : Array<Task>;
    date : Date;

    constructor(label : string, tasks : Array<Task>, date : Date) {
        this.label = label;
        this.tasks = tasks;
        this.date = date;
    }

}
