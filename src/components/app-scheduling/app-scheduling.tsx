import { Component, Prop, Listen, State } from '@stencil/core';

@Component({
  tag: 'app-scheduling',
  styleUrl: 'app-scheduling.css',
  shadow: false
})
export class AppScheduling {

  @Prop() data: Date[] = [];

  @State() availableTimes: Date[] = [];
  @State() schedules: Date[] = [];

  @Listen('onDateUpdated')
  handleOnDateUpdated(event: CustomEvent): void {
    this.availableTimes = [];
    const selectedDate = event.detail as Date;

    const startDate = new Date(selectedDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    this.availableTimes = this.data
      .filter((schedule) => (schedule.getTime() >= startDate.getTime())
        && (schedule.getTime() < endDate.getTime()));
  }

  @Listen('onTimeUpdated')
  handleOnTimeUpdated(event: CustomEvent): void {
    const selectedDate = event.detail as Date;
    const scheduleIndex = this.schedules.findIndex(el => el.getTime() === selectedDate.getTime());
    
    if (scheduleIndex !== -1) {
      this.schedules = this.schedules.filter(e => e.getTime() !== selectedDate.getTime())
    } else {
      this.schedules.push(selectedDate);
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <professional-picker></professional-picker>
        <date-picker></date-picker>
        <time-picker availableTimes={this.availableTimes}></time-picker>
      </div>
    );
  }
}
