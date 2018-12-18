/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  SchedulingData,
} from './models/scheduling-data.model';
import {
  Professional,
} from './models/professional.model';
import {
  SchedulingResponse,
} from './models/scheduling-response.model';


export namespace Components {

  interface AppScheduling {
    'schedulingData': SchedulingData[];
  }
  interface AppSchedulingAttributes extends StencilHTMLAttributes {
    'onOnScheduleUpdated'?: (event: CustomEvent) => void;
    'schedulingData'?: SchedulingData[];
  }

  interface DatePicker {}
  interface DatePickerAttributes extends StencilHTMLAttributes {
    'onOnDateUpdated'?: (event: CustomEvent) => void;
  }

  interface ProfessionalPicker {
    'professionals': Professional[];
    'selectedProfessionalId': string;
  }
  interface ProfessionalPickerAttributes extends StencilHTMLAttributes {
    'onOnProfessionalUpdated'?: (event: CustomEvent) => void;
    'professionals'?: Professional[];
    'selectedProfessionalId'?: string;
  }

  interface SchedulesOverview {
    'professional': Professional;
    'scheduling': SchedulingResponse;
  }
  interface SchedulesOverviewAttributes extends StencilHTMLAttributes {
    'professional'?: Professional;
    'scheduling'?: SchedulingResponse;
  }

  interface TimePicker {
    'availableTimes': Date[];
    'selectedTimes': Date[];
  }
  interface TimePickerAttributes extends StencilHTMLAttributes {
    'availableTimes'?: Date[];
    'onOnTimeUpdated'?: (event: CustomEvent) => void;
    'selectedTimes'?: Date[];
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppScheduling': Components.AppScheduling;
    'DatePicker': Components.DatePicker;
    'ProfessionalPicker': Components.ProfessionalPicker;
    'SchedulesOverview': Components.SchedulesOverview;
    'TimePicker': Components.TimePicker;
  }

  interface StencilIntrinsicElements {
    'app-scheduling': Components.AppSchedulingAttributes;
    'date-picker': Components.DatePickerAttributes;
    'professional-picker': Components.ProfessionalPickerAttributes;
    'schedules-overview': Components.SchedulesOverviewAttributes;
    'time-picker': Components.TimePickerAttributes;
  }


  interface HTMLAppSchedulingElement extends Components.AppScheduling, HTMLStencilElement {}
  var HTMLAppSchedulingElement: {
    prototype: HTMLAppSchedulingElement;
    new (): HTMLAppSchedulingElement;
  };

  interface HTMLDatePickerElement extends Components.DatePicker, HTMLStencilElement {}
  var HTMLDatePickerElement: {
    prototype: HTMLDatePickerElement;
    new (): HTMLDatePickerElement;
  };

  interface HTMLProfessionalPickerElement extends Components.ProfessionalPicker, HTMLStencilElement {}
  var HTMLProfessionalPickerElement: {
    prototype: HTMLProfessionalPickerElement;
    new (): HTMLProfessionalPickerElement;
  };

  interface HTMLSchedulesOverviewElement extends Components.SchedulesOverview, HTMLStencilElement {}
  var HTMLSchedulesOverviewElement: {
    prototype: HTMLSchedulesOverviewElement;
    new (): HTMLSchedulesOverviewElement;
  };

  interface HTMLTimePickerElement extends Components.TimePicker, HTMLStencilElement {}
  var HTMLTimePickerElement: {
    prototype: HTMLTimePickerElement;
    new (): HTMLTimePickerElement;
  };

  interface HTMLElementTagNameMap {
    'app-scheduling': HTMLAppSchedulingElement
    'date-picker': HTMLDatePickerElement
    'professional-picker': HTMLProfessionalPickerElement
    'schedules-overview': HTMLSchedulesOverviewElement
    'time-picker': HTMLTimePickerElement
  }

  interface ElementTagNameMap {
    'app-scheduling': HTMLAppSchedulingElement;
    'date-picker': HTMLDatePickerElement;
    'professional-picker': HTMLProfessionalPickerElement;
    'schedules-overview': HTMLSchedulesOverviewElement;
    'time-picker': HTMLTimePickerElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
