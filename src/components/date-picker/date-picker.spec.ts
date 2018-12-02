import { DatePicker } from './date-picker';
import { getDaysOfTheWeek } from '../../utils/calendar-handler';

describe('date-picker', () => {
  it('builds', () => {
    expect(new DatePicker()).toBeTruthy();
  });

  describe('initial values for the States', () => {
    it('loads days of the week', () => {
      const component = new DatePicker();
      component.days = getDaysOfTheWeek(new Date());
      expect(component.days).toHaveLength(7);
    });
  });
});
