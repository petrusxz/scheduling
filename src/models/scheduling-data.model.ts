import { Professional } from './professional.model';

export interface SchedulingData {
    professional: Professional;
    busySchedules: Date[];
    startWorkingTime: number;
    endWorkingTime: number;
}