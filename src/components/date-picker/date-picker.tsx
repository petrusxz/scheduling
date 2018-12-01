import { Component, State, Event, EventEmitter } from '@stencil/core';
import { Day } from '../../models/day.model';

@Component({
    tag: 'date-picker',
    styleUrl: 'date-picker.css',
    shadow: false
})
export class DatePicker {

    @State() days: Day[] = [];
    @State() activeMonth: string = null;
    @State() selectedDate: Date = null;

    @Event() onDateUpdated: EventEmitter;

    componentWillLoad(): void {
        this.setWeekDays();
    }

    private setWeekDays(dateParam: Date = new Date()): void {
        this.days = [];

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

            this.days.push({ weekDay, shortName, dayNumber, isReadonly });

            date.setDate(weekDay.getDate() + 1);
        }

        this.activeMonth = `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;
        this.selectedDate = this.days.find(e => !e.isReadonly).weekDay;
        this.onDateUpdated.emit(this.selectedDate);
    }

    private previousWeek(): void {
        if (this.isCurrentWeek()) { return; }

        const date = new Date(this.days[0].weekDay);
        date.setDate(date.getDate() - 1);

        this.setWeekDays(date);
    }

    private nextWeek(): void {
        const date = new Date(this.days[this.days.length - 1].weekDay);
        date.setDate(date.getDate() + 1);

        this.setWeekDays(date);
    }

    private isCurrentWeek(): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.days[0].weekDay <= today;
    }

    private isSelectedDate(date: Date): boolean {
        if (!this.selectedDate) { return false; }

        return date.getTime() === this.selectedDate.getTime();
    }

    private setSelectedDate(date: Day): void {
        if (date.isReadonly) { return; }

        this.selectedDate = date.weekDay;
        this.onDateUpdated.emit(this.selectedDate);
    }

    render(): JSX.Element {
        return (
            <div class="picker-container">
                <div class="week-days-header">
                    <label>{this.activeMonth}</label>
                    <span onClick={() => this.setWeekDays()}>
                        Today
                    </span>
                </div>

                <div class="week-days-container">
                    <button
                        disabled={this.isCurrentWeek()}
                        class="week-days-ctrl"
                        onClick={() => this.previousWeek()}>
                        &lt;
                    </button>

                    {this.days.map((day) =>
                        <div class="week-days">
                            <div class="name">{day.shortName}</div>
                            <div
                                class={{
                                    'date-number': true,
                                    'selected': this.isSelectedDate(day.weekDay),
                                    'invalid-date': day.isReadonly
                                }}
                                onClick={() => this.setSelectedDate(day)}>
                                {day.dayNumber}
                            </div>
                        </div>
                    )}

                    <button
                        class="week-days-ctrl"
                        onClick={() => this.nextWeek()}>
                        &gt;
                    </button>
                </div>
            </div>
        );
    }
}
