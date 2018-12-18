import { Component, Prop, Listen, State, Event, EventEmitter, Watch } from '@stencil/core';
import { SchedulingData } from '../../models/scheduling-data.model';
import { SchedulingResponse } from '../../models/scheduling-response.model';
import { Professional } from '../../models/professional.model';
import { manageSelectedDate, getAvailableSchedules } from '../../utils/calendar-handler';

/**
 * @description App entry point called at index.html and used as a 
 * tag <app-scheduling></app-scheduling>.
 */
@Component({
  tag: 'app-scheduling',
  styleUrl: 'app-scheduling.css',
  shadow: true
})
export class AppScheduling {

  @Prop({ mutable: true }) schedulingData: SchedulingData[] = [];

  @State() professionals: Professional[] = [];
  @State() selectedProfessional: Professional = null;
  @State() selectedDate: Date = new Date();
  @State() busySchedules: Date[] = [];
  @State() startWorkingTime: Date;
  @State() endWorkingTime: Date;
  @State() availableTimes: Date[] = [];
  @State() scheduling: SchedulingResponse = new SchedulingResponse();

  @Event() onScheduleUpdated: EventEmitter;

  /**
   * @description Watching for changes to re-initialize the component.
   */
  @Watch('schedulingData')
  schedulingDataOnChange() {
    this.initialize();
  }

  componentDidLoad(): void {
    this.initialize();
  }

  /**
   * @description Assigning values to separated variables to facilitate data management for each child component.
   */
  private initialize(): void {
    this.professionals = this.schedulingData.map((el) => el.professional);
    this.selectedDate.setHours(0, 0, 0, 0);

    if (this.professionals.length) {
      this.scheduling.professionalId = this.professionals[0].id;
      this.selectedProfessional = this.professionals[0];
      this.busySchedules = this.schedulingData[0].busySchedules;

      this.setWorkingTime(this.schedulingData[0].startWorkingTime, this.schedulingData[0].endWorkingTime);
      this.updateAvailableTime();
    }
  }

  /**
   * @description Listening EventEmitter from professional-picker component, 
   * then handling values to filter the available dates for the selected professional.
   */
  @Listen('onProfessionalUpdated')
  handleOnProfessionalUpdated(event: CustomEvent): void {
    this.selectedProfessional = event.detail as Professional;
    this.scheduling.professionalId = this.selectedProfessional.id;
    this.scheduling.schedules = [];

    const scheduling = this.schedulingData.find((data) => data.professional.id === this.selectedProfessional.id);

    this.busySchedules = scheduling.busySchedules;
    this.setWorkingTime(scheduling.startWorkingTime, scheduling.endWorkingTime);

    this.updateAvailableTime();
  }

  /**
   * @description Listening EventEmitter from date-picker component, 
   * then handling values to filter the available times for the selected day.
   */
  @Listen('onDateUpdated')
  handleOnDateUpdated(event: CustomEvent): void {
    this.selectedDate = event.detail as Date;
    this.updateAvailableTime();
  }

  /**
   * @description Listening EventEmitter from date-picker component, 
   * then assigning the schedules to response object.
   */
  @Listen('onTimeUpdated')
  handleOnTimeUpdated(event: CustomEvent): void {
    const selectedDate = event.detail as Date;
    const schedulingHelper = Object.assign({}, this.scheduling);

    schedulingHelper.schedules = manageSelectedDate(selectedDate, schedulingHelper.schedules);
    this.scheduling = schedulingHelper;
  }

  private updateAvailableTime(): void {
    const startDate = new Date(this.selectedDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const busySchedulesFromSelectedDate = this.busySchedules.filter((schedule) =>
      (schedule.getTime() >= startDate.getTime())
      && (schedule.getTime() < endDate.getTime())
    );

    this.availableTimes = getAvailableSchedules(busySchedulesFromSelectedDate, this.startWorkingTime, this.endWorkingTime);
  }


  private setWorkingTime(startTime: number, endTime: number): void {
    const stWorkingTime = new Date(this.selectedDate);
    stWorkingTime.setHours(startTime);
    this.startWorkingTime = stWorkingTime;
    const edWorkingTime = new Date(stWorkingTime);
    edWorkingTime.setHours(endTime);
    this.endWorkingTime = edWorkingTime;
  }

  render(): JSX.Element {
    return (
      <div class="app-container">
        {this.scheduling.schedules.length > 0 &&
          <schedules-overview professional={this.selectedProfessional} scheduling={this.scheduling}></schedules-overview>
        }

        <professional-picker professionals={this.professionals} selectedProfessionalId={this.scheduling.professionalId}></professional-picker>
        <date-picker></date-picker>
        <time-picker availableTimes={this.availableTimes} selectedTimes={this.scheduling.schedules}></time-picker>

        {this.scheduling.schedules.length > 0 &&
          <button
            class="confirm"
            onClick={() => this.onScheduleUpdated.emit(this.scheduling)}>
            Confirm
          </button>
        }
      </div>
    );
  }
}
