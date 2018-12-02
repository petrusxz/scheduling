import { Component, Prop, State } from '@stencil/core';
import { Professional } from '../../models/professional.model';
import { SchedulingResponse } from '../../models/scheduling-response.model';
import { imageHandler } from '../../utils/image-handler';

@Component({
    tag: 'schedules-overview',
    styleUrl: 'schedules-overview.css',
    shadow: false
})
export class SchedulesOverview {

    @Prop({ mutable: true }) professional: Professional = null;
    @Prop({ mutable: true }) scheduling: SchedulingResponse = null;

    @State() hiddenOverview: boolean = true;
    @State() professionalImg: string = '';

    componentDidLoad() {
        imageHandler(this.professional.picture)
            .then((resizedImg) => this.professionalImg = resizedImg);
    }

    private getFormattedDate(dateParam: Date): JSX.Element {
        const date = new Date(dateParam);

        const week = date.toLocaleDateString('en-US', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();

        return (
            <div class="date-view">
                {week} <br />
                {day} {month} {year}
            </div>
        );
    }

    private getFormattedTime(dateParam: Date): JSX.Element {
        const date = new Date(dateParam);

        const startTime = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        date.setHours(date.getHours() + 1);
        const endTime = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

        return (
            <div class="time-view">
                {startTime} - {endTime}
            </div>
        );
    }

    private renderListInfo(): JSX.Element {
        let message = null;

        if (this.scheduling.schedules.length > 1 && this.hiddenOverview) {
            message = (
                <div>
                    Schedules <span class="schedules-count">{this.scheduling.schedules.length}</span>
                </div>
            );
        } else if (!this.hiddenOverview) {
            message = 'Hide';
        }

        return (
            <label>
                {message}
            </label>
        );
    }

    private renderCustomDate(schedules = this.scheduling.schedules): JSX.Element {
        const lastSchedule = schedules[schedules.length - 1];

        return (
            <div class="date-time-container">
                {this.getFormattedDate(lastSchedule)}
                <div style={{ paddingTop: '17px' }}>
                    {this.getFormattedTime(lastSchedule)}
                </div>
            </div>
        );
    }

    getScheduleList(): JSX.Element {
        const { schedules } = this.scheduling;
        const timestamps = schedules.map(e => e.getTime());

        const groupsByDay = timestamps.reduce((group, next) => {
            const day = `d-${Math.floor(next / (1000 * 60 * 60 * 24))}`;
            group[day] = group[day] || [];
            group[day].push(next);
            return group;
        }, []);

        return Object.keys(groupsByDay).map(daySchedules =>
            <div class="date-time-container list">
                {this.getFormattedDate(groupsByDay[daySchedules][0])}
                <div>
                    {groupsByDay[daySchedules].map(schedule =>
                        this.getFormattedTime(schedule)
                    )}
                </div>
            </div>
        );
    }

    private hideAndShowOverview(): void {
        if (this.scheduling.schedules.length > 1) {
            this.hiddenOverview = !this.hiddenOverview;
        }
    }

    render(): JSX.Element {
        return (
            <div class="overview-container">

                <header onClick={() => this.hideAndShowOverview()}>

                    <figure class="overview">
                        <img src={this.professionalImg} />
                    </figure>

                    <div class="last-schedule">
                        <div style={!this.hiddenOverview && { paddingTop: '17px' }}>{this.professional.name}</div>

                        {this.renderListInfo()}

                        {this.hiddenOverview &&
                            this.renderCustomDate()}
                    </div>

                </header>

                {!this.hiddenOverview &&
                    this.getScheduleList()}

            </div>
        );
    }
}
