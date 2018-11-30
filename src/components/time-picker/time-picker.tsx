import { Component, Prop, Event, EventEmitter, State, Element, Watch } from '@stencil/core';

@Component({
    tag: 'time-picker',
    styleUrl: 'time-picker.css',
    shadow: false
})
export class TimePicker {

    @Element() timePickerEl: HTMLElement;

    @Prop({ mutable: true }) availableTimes: Date[] = [];

    @State() selectedTimes: Date[] = [];

    @Event() onTimeUpdated: EventEmitter;

    @Watch('availableTimes')
    handleAvailableTimesOnChange(): void {
        const elementList = this.timePickerEl.getElementsByClassName('schedule-time');

        for (let i = 0; i < elementList.length; i++) {
            const element = elementList[i] as HTMLElement;
            const time = element.id.replace('t-', '');

            const timeIndex = this.selectedTimes.findIndex(el => el.getTime() === +time);

            if (timeIndex !== -1) {
                element.classList.add('selected');
            } else {
                element.classList.remove('selected');
            }
        }
    }

    private setScheduleTime(e: UIEvent, date: Date): void {
        const timeIndex = this.selectedTimes.findIndex(el => el.getTime() === date.getTime());

        if (timeIndex !== -1) {
            this.selectedTimes = this.selectedTimes.filter(e => e.getTime() !== date.getTime())
        } else {
            this.selectedTimes.push(date);
        }

        e.srcElement.classList.toggle('selected');
        this.onTimeUpdated.emit(date);
    }

    render(): JSX.Element {
        return (
            <div class="picker-container">
                {this.availableTimes.length
                    ? this.availableTimes.map((date) =>
                        <span
                            id={`t-${date.getTime()}`}
                            class="schedule-time"
                            onClick={(e: UIEvent) => this.setScheduleTime(e, date)}>
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
