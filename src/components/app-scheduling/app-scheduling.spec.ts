import { AppScheduling } from './app-scheduling';

describe('my-component', () => {
  it('builds', () => {
    expect(new AppScheduling()).toBeTruthy();
  });

  describe('formatting', () => {
    // it('returns empty string for no names defined', () => {
    //   const component = new AppScheduling();
    //   expect(component.toEqual('');
    // });

    // it('formats just first names', () => {
    //   const component = new AppScheduling();
    //   component.first = 'Joseph';
    //   expect(component.format()).toEqual('Joseph');
    // });

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
