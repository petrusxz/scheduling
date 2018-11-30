export class SchedulingResponse {
    professionalId: string;
    schedules: Date[];

    constructor() {
        this.professionalId = null;
        this.schedules = [];
    }
}