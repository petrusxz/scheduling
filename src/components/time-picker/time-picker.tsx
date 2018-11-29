import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'time-picker',
    styleUrl: 'time-picker.css',
    shadow: false
})
export class TimePicker {

    @Prop({ mutable: true }) availableTimes: Date[] = [];

    @Event() onTimeUpdated: EventEmitter;

    private setScheduleTime(event: UIEvent, date: Date): void {
        event.srcElement.classList.toggle('selected');
        this.onTimeUpdated.emit(date);
    }

    private renderAvailableTimes(): JSX.Element {
        if (!this.availableTimes.length) {
            return <span class="no-time">No time available</span>
        }

        return this.availableTimes.map((date) =>
            <span
                class="schedule-time"
                onClick={(e: UIEvent) => this.setScheduleTime(e, date)}>
                {date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
        );
    }

    render(): JSX.Element {
        return (
            <div class="picker-container">
                {this.renderAvailableTimes()}
            </div>
        );
    }
}
