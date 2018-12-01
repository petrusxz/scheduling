import { Component, Prop, Listen, State, Event, EventEmitter, Element } from '@stencil/core';
import { SchedulingData } from '../../models/scheduling-data.model';
import { SchedulingResponse } from '../../models/scheduling-response.model';
import { Professional } from '../../models/professional.model';

@Component({
  tag: 'app-scheduling',
  styleUrl: 'app-scheduling.css',
  shadow: false
})
export class AppScheduling {

  @Element() appSchedulingEl: HTMLElement;

  @Prop() data: SchedulingData[] = [];

  @State() professionals: Professional[] = [];
  @State() availableDates: Date[] = [];
  @State() availableTimes: Date[] = [];
  @State() scheduling: SchedulingResponse = new SchedulingResponse();

  @Event() onScheduleUpdated: EventEmitter;

  componentDidLoad(): void {
    this.professionals = this.data.map((el) => el.professional);
    this.scheduling.professionalId = this.professionals[1].id;
    this.availableDates = this.data[1].availableTimes;

    this.handleOnDateUpdated();
  }

  @Listen('onProfessionalUpdated')
  handleOnProfessionalUpdated(event: CustomEvent): void {
    const selectedProfessional = event.detail as Professional;
    this.scheduling.professionalId = selectedProfessional.id;

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].professional.id === selectedProfessional.id) {
        this.availableDates = this.data[i].availableTimes;
        this.handleOnDateUpdated();
        const timePickerEl = this.appSchedulingEl.querySelector('time-picker');
        timePickerEl.resetSchedules();
        break;
      }
    }
  }

  @Listen('onDateUpdated')
  handleOnDateUpdated(event: CustomEvent = null): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.availableTimes = [];
    const selectedDate: Date = event ? event.detail : today;

    const startDate = new Date(selectedDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    this.availableTimes = this.availableDates
      .filter((schedule) => (schedule.getTime() >= startDate.getTime())
        && (schedule.getTime() < endDate.getTime()));
  }

  @Listen('onTimeUpdated')
  handleOnTimeUpdated(event: CustomEvent): void {
    const selectedDate = event.detail as Date;
    const scheduleIndex = this.scheduling.schedules.findIndex(el => el.getTime() === selectedDate.getTime());

    if (scheduleIndex !== -1) {
      this.scheduling.schedules = this.scheduling.schedules.filter(e => e.getTime() !== selectedDate.getTime())
    } else {
      this.scheduling.schedules.push(selectedDate);
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <professional-picker professionals={this.professionals}></professional-picker>
        <date-picker></date-picker>
        <time-picker availableTimes={this.availableTimes}></time-picker>

        <button onClick={() => this.onScheduleUpdated.emit(this.scheduling)}>Finish</button>
      </div>
    );
  }
}
