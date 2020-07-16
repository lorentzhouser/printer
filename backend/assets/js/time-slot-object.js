class TimeSlot {
    constructor (startTime, duration, printer = 1) {
        this.startTime = startTime;
        this.duration = duration;
        this.printer = printer;
    }

    getStartTime() { return this.startTime; }
    getDuration() { return this.duration; }
    getPrinter() { return this.printer; }
}