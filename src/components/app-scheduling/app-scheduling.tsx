import { Component, Prop, Listen, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { SchedulingData } from '../../models/scheduling-data.model';
import { SchedulingResponse } from '../../models/scheduling-response.model';
import { Professional } from '../../models/professional.model';
import { manageSelectedDate } from '../../utils/calendar-handler';

@Component({
  tag: 'app-scheduling',
  styleUrl: 'app-scheduling.css',
  shadow: false
})
export class AppScheduling {

  @Element() appSchedulingEl: HTMLElement;

  @Prop({ mutable: true }) schedulingData: SchedulingData[] = [];

  @State() professionals: Professional[] = [];
  @State() selectedProfessional: Professional = null;
  @State() availableDates: Date[] = [];
  @State() availableTimes: Date[] = [];
  @State() scheduling: SchedulingResponse = new SchedulingResponse();

  @Event() onScheduleUpdated: EventEmitter;

  @Watch('schedulingData')
  schedulingDataOnChange() {
    this.initialize();
  }

  componentDidLoad(): void {
    this.initialize();
  }

  private initialize(): void {
    this.professionals = this.schedulingData.map((el) => el.professional);

    if (this.professionals.length) {
      this.scheduling.professionalId = this.professionals[0].id;
      this.selectedProfessional = this.professionals[0];
      this.availableDates = this.schedulingData[0].availableTimes;

      this.handleOnDateUpdated();
    }
  }

  @Listen('onProfessionalUpdated')
  handleOnProfessionalUpdated(event: CustomEvent): void {
    this.selectedProfessional = event.detail as Professional;
    this.scheduling.professionalId = this.selectedProfessional.id;

    this.availableDates = this.schedulingData.find((data) => data.professional.id === this.selectedProfessional.id).availableTimes;
    this.handleOnDateUpdated();
    this.resetSelectedValues();
  }

  @Listen('onDateUpdated')
  handleOnDateUpdated(event: CustomEvent = null): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate: Date = event ? event.detail : today;
    const startDate = new Date(selectedDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    this.availableTimes = this.availableDates.filter((schedule) =>
      (schedule.getTime() >= startDate.getTime())
      && (schedule.getTime() < endDate.getTime())
    );
  }

  @Listen('onTimeUpdated')
  handleOnTimeUpdated(event: CustomEvent): void {
    const selectedDate = event.detail as Date;
    const schedulingHelper = Object.assign({}, this.scheduling);

    schedulingHelper.schedules = manageSelectedDate(selectedDate, schedulingHelper.schedules);
    this.scheduling = schedulingHelper;
  }

  private resetSelectedValues(): void {
    const datePickerEl = this.appSchedulingEl.querySelector('date-picker');
    datePickerEl.resetDates();
    this.scheduling.schedules = [];
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
