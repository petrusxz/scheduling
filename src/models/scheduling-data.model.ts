import { Professional } from './professional.model';

export class SchedulingData {
    professional: Professional = null;
    busySchedules: Date[] = null;
    startWorkingTime: number = null;
    endWorkingTime: number = null;
}