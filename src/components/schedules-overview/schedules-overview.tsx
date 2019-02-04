import { Component, Prop, State } from '@stencil/core';
import { Professional } from '../../models/professional.model';
import { SchedulingResponse } from '../../models/scheduling-response.model';

/**
 * @description Overview of the user full scheduling.
 */
@Component({
    tag: 'schedules-overview',
    styleUrl: 'schedules-overview.css',
    shadow: false
})
export class SchedulesOverview {

    @Prop() language: string = null;

    @Prop({ mutable: true }) professional: Professional = null;
    @Prop({ mutable: true }) scheduling: SchedulingResponse = null;

    @State() hiddenOverview: boolean = true;

    /**
     * @description Renders a list of all schedules made by the user so far,
     * grouped by day.
     */
    private getScheduleList(): JSX.Element {
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

    private getFormattedDate(dateParam: Date): JSX.Element {
        const date = new Date(dateParam);

        const week = date.toLocaleDateString(this.language, { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString(this.language, { month: 'long' });
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

        const startTime = date.toLocaleTimeString(this.language, { hour12: false, hour: '2-digit', minute: '2-digit' });
        date.setHours(date.getHours() + 1);
        const endTime = date.toLocaleTimeString(this.language, { hour12: false, hour: '2-digit', minute: '2-digit' });

        return (
            <div class="time-view">
                {startTime} - {endTime}
            </div>
        );
    }

    private hideAndShowOverview(): void {
        if (this.scheduling.schedules.length > 0) {
            this.hiddenOverview = !this.hiddenOverview;
        }
    }

    render(): JSX.Element {
        return (
            <div class="overview-container">

                <header onClick={() => this.hideAndShowOverview()}>

                    <figure class="overview">
                        <img src={this.professional.picture} />
                    </figure>

                    <div class="last-schedule">
                        <div>
                            {this.professional.name}
                        </div>

                        {this.scheduling.schedules.length > 0 && 
                        <div class={{
                            'icon-ctrl': true,
                            'open': !this.hiddenOverview
                        }}>
                            &lang;
                            <span hidden={!this.hiddenOverview}></span>
                        </div>
                        }
                    </div>

                </header>

                {!this.hiddenOverview &&
                    this.getScheduleList()}

            </div>
        );
    }
}
