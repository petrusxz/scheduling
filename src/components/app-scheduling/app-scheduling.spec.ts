import { AppScheduling } from './app-scheduling';

describe('app-scheduling', () => {
  describe('initial values for the States', () => {
    it('initializes empty values', () => {
      const component = new AppScheduling();
      expect(component.scheduling.schedules).toEqual([]);
    });
  });
});
