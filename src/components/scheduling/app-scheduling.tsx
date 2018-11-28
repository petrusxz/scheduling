import { Component, State, Prop, Event, EventEmitter } from '@stencil/core';
import { Day } from '../../models/day.model';

@Component({
  tag: 'app-scheduling',
  styleUrl: 'app-scheduling.css',
  shadow: false
})
export class AppScheduling {

  @Prop() data: Date[];

  @State() days: Day[] = [];
  @State() activeMonth: string = null;
  @State() selectedDate: Date = null;

  @State() availableSchedules: Date[] = [];

  @Event() onScheduleUpdated: EventEmitter;

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

    this.activeMonth = `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`
  }

  private previousWeek(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.days[0].weekDay <= today) { return; }

    const date = new Date(this.days[0].weekDay);
    date.setDate(date.getDate() - 1);

    this.setWeekDays(date);
  }

  private nextWeek(): void {
    const date = new Date(this.days[this.days.length - 1].weekDay);
    date.setDate(date.getDate() + 1);

    this.setWeekDays(date);
  }

  private isSelectedDate(date: Date): boolean {
    if (!this.selectedDate) { return false; }

    return date.getTime() === this.selectedDate.getTime();
  }

  private setSelectedDate(date: Day): void {
    if (date.isReadonly) { return; }
    
    this.selectedDate = date.weekDay;
    this.setAvailableSchedules();
  }

  private setAvailableSchedules(): void {
    this.availableSchedules = [];

    const startDate = new Date(this.selectedDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    this.availableSchedules = this.data
      .filter((schedule) => (schedule.getTime() >= startDate.getTime())
        && (schedule.getTime() < endDate.getTime()));
  }

  private renderDatePicker(): JSX.Element[] {
    return this.days.map((day) => {
      return (
        <div class="week-days">
          <div>{day.shortName}</div>
          <div
            class={{
              'highlight-selected-date': this.isSelectedDate(day.weekDay),
              'invalid-date': day.isReadonly
            }}
            onClick={() => this.setSelectedDate(day)}>
            {day.dayNumber}
          </div>
        </div>
      )
    });
  }

  private renderTimePicker(): JSX.Element[] {
    return this.availableSchedules.map((date) =>
      <span 
        class="schedules"
        onClick={() => this.onScheduleUpdated.emit({ value: date })}>
        {date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit' })}
      </span>
    );
  }

  render(): JSX.Element {
    return (
      <div class="date-picker-container">

        <div class="week-days-header">
          <label>{this.activeMonth}</label>
          <span onClick={() => this.setWeekDays()}>
            Today
          </span>
        </div>

        <div class="week-days-container">
          <div class="week-days-ctrl" onClick={() => this.previousWeek()}>&lt;</div>
          {this.renderDatePicker()}
          <div class="week-days-ctrl" onClick={() => this.nextWeek()}>&gt;</div>
        </div>

        {this.renderTimePicker()}

      </div>
    );
  }
}
