import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { manageSelectedDate } from '../../utils/calendar-handler';

@Component({
    tag: 'time-picker',
    styleUrl: 'time-picker.css',
    shadow: false
})
export class TimePicker {

    @Prop({ mutable: true }) availableTimes: Date[] = [];
    @Prop({ mutable: true }) selectedTimes: Date[] = [];

    @Event() onTimeUpdated: EventEmitter;

    private setScheduleTime(date: Date): void {
        this.selectedTimes = manageSelectedDate(date, this.selectedTimes);
        this.onTimeUpdated.emit(date);
    }

    render(): JSX.Element {
        return (
            <div class="picker-container">
                {this.availableTimes.length
                    ? this.availableTimes.map((date) =>
                        <span
                            class={{
                                'schedule-time': true,
                                'selected': !!this.selectedTimes.find(el => el.getTime() === date.getTime())
                            }}
                            onClick={() => this.setScheduleTime(date)}>
                            {date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )
                    : <span class="no-time">No time available</span>
                }
            </div>
        );
    }
}
