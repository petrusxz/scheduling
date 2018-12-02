import { Day } from '../models/day.model';

export function getDaysOfTheWeek(dateParam: Date): Day[] {
    const days = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = dateParam;
    date.setDate(date.getDate() - date.getDay());
    date.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        const weekDay = new Date(date);
        const shortName = weekDay.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = weekDay.getDate();
        const isReadonly = weekDay < today;

        days.push({ weekDay, shortName, dayNumber, isReadonly });

        date.setDate(weekDay.getDate() + 1);
    }

    return days;
}