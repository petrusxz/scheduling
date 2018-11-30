import { Professional } from './professional.model';

export interface SchedulingData {
    professional: Professional;
    availableTimes: Date[];
}