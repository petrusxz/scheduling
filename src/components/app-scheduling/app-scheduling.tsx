import { Component, Prop, Listen, State, Event, EventEmitter, Watch } from '@stencil/core';
import { SchedulingData } from '../../models/scheduling-data.model';
import { SchedulingResponse } from '../../models/scheduling-response.model';
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

  @Prop({ mutable: true }) schedulingData: SchedulingData = null;
  @Prop({ mutable: true }) selectedSchedules: Date[] = [];

  @State() selectedDate: Date = new Date();
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
    this.selectedDate.setHours(0, 0, 0, 0);
    this.scheduling.professionalId = this.schedulingData.professional.id;
    
    const schedulingHelper = Object.assign({}, this.scheduling);
    schedulingHelper.schedules = this.selectedSchedules;
    this.scheduling = schedulingHelper;

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
    this.onScheduleUpdated.emit(this.scheduling);
  }

  private updateAvailableTime(): void {
    if (!this.schedulingData.professional) { return; }

    const startDate = new Date(this.selectedDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const busySchedulesFromSelectedDate = this.schedulingData.busySchedules.filter((schedule) =>
      (schedule.getTime() >= startDate.getTime())
      && (schedule.getTime() < endDate.getTime())
    );

    this.setWorkingTime(this.schedulingData.startWorkingTime, this.schedulingData.endWorkingTime);
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
        <schedules-overview professional={this.schedulingData.professional} scheduling={this.scheduling}></schedules-overview>
        <date-picker></date-picker>
        <time-picker availableTimes={this.availableTimes} selectedTimes={this.scheduling.schedules}></time-picker>
      </div>
    );
  }
}
