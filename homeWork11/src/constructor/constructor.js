// --------------- Class

export class InfoRoute {
    constructor (way, wayIn, wayTo, timeIn, timeTo, dateIn, dateTo, cost, star) {
        this.way = way;
        this.wayIn = wayIn;
        this.wayTo = wayTo;
        this.timeIn = timeIn;
        this.timeTo = timeTo;
        this.dateIn = dateIn;
        this.dateTo = dateTo;
        this.cost = cost;
        this.star = star;
    }
    get getInfoRoute() {
        return `${this.cost} $`
    }
    get getDateInRoute() {
        return `${this.timeIn} ${this.dateIn}`
    }
    get getDateToRoute() {
        return `${this.timeTo} ${this.dateTo}`
    }
    get getStarIcon() {
        if (this.star === 1){
            return `<td class="td-i"><i class="fa fa-angellist
                    fa-angellist-tbl"></i></td>`
        } else {
            return ``
        }
    }
}