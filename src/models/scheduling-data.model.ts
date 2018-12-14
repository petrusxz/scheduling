import { Professional } from './professional.model';

export interface SchedulingData {
    professional: Professional;
    busySchedules: Date[];
    startWorkingTime: Date;
    endWorkingTime: Date;
    availableDays: number[];
}