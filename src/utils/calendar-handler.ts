import { Day } from '../models/day.model';

/**
 * @description Returns an array with the days of the week from the dateParam
 */
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

/**
 * @description If the date doesn't exist in the array, it will insert it. Otherwise, it will remove it.  
 */
export function manageSelectedDate(selectedDate: Date, datesParam: Date[]): Date[] {
    let dates = [...datesParam];

    const dateIdx = dates.findIndex(el => el.getTime() === selectedDate.getTime());

    if (dateIdx !== -1) {
        dates = dates.filter(e => e.getTime() !== selectedDate.getTime())
    } else {
        dates.push(selectedDate);
    }

    return dates;
}