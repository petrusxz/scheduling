import { Component, Prop, Event, EventEmitter, State, Method } from '@stencil/core';

@Component({
    tag: 'time-picker',
    styleUrl: 'time-picker.css',
    shadow: false
})
export class TimePicker {

    @Prop({ mutable: true }) availableTimes: Date[] = [];

    @State() selectedTimes: Date[] = [];

    @Event() onTimeUpdated: EventEmitter;

    @Method()
    resetSchedules(): void {
        this.selectedTimes = [];
    }

    private setScheduleTime(date: Date): void {
        let timeArr = [...this.selectedTimes];
        const timeIndex = timeArr.findIndex(el => el.getTime() === date.getTime());

        if (timeIndex !== -1) {
            timeArr = timeArr.filter(e => e.getTime() !== date.getTime())
        } else {
            timeArr.push(date);
        }
        
        this.selectedTimes = timeArr;
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
                    :
                    <span class="no-time">No time available</span>
                }
            </div>
        );
    }
}
