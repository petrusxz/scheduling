import { AppScheduling } from './app-scheduling';

describe('app-scheduling', () => {
  it('builds', () => {
    expect(new AppScheduling()).toBeTruthy();
  });

  describe('initial values for the States', () => {
    it('initializes empty values', () => {
      const component = new AppScheduling();
      component.initialize();
      expect(component.scheduling.schedules).toEqual([]);
    });

    // it('formats first and last names', () => {
    //   const component = new AppScheduling();
    //   component.first = 'Joseph';
    //   component.last = 'Publique';
    //   expect(component.format()).toEqual('Joseph Publique');
    // });

    // it('formats first, middle and last names', () => {
    //   const component = new AppScheduling();
    //   component.first = 'Joseph';
    //   component.middle = 'Quincy';
    //   component.last = 'Publique';
    //   expect(component.format()).toEqual('Joseph Quincy Publique');
    // });
  });
});
