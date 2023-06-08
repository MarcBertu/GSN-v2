import { sha512 } from "js-sha512";

export class Utils {

    static getWeekNumber() : number {
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate.getTime() - startDate.getTime()) /
            (24 * 60 * 60 * 1000));
        
        var weekNumber = Math.ceil(days / 7);
        
        return weekNumber;
    }

    static getWeekNumberFromDate(date : Date) : number {
        let currentDate = date;
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate.getTime() - startDate.getTime()) /
            (24 * 60 * 60 * 1000));
        
        var weekNumber = Math.ceil(days / 7);
        
        return weekNumber;
    }

    static sha512(password : string) : string {
        return sha512(password);
    }

}