import { newE2EPage } from '@stencil/core/testing';

describe('app-scheduling', () => {
  let page;

  beforeAll(async () => {
    page = await newE2EPage();
    await page.setContent('<app-scheduling></app-scheduling>');
  });

  it('renders child components', async () => {
    const professionalPicker = await page.find('app-scheduling >>> professional-picker');
    expect(professionalPicker).toBeDefined();
    
    const datePicker = await page.find('app-scheduling >>> date-picker');
    expect(datePicker).toBeDefined();
    
    const timePicker = await page.find('app-scheduling >>> time-picker');
    expect(timePicker).toBeDefined();
  });

  // it('load states values', async () => {
  //   const component = await page.find('app-scheduling');
  //   const data = [
  //     { professional: {id: 'xCre547', name: 'Paolo', picture: ''}, availableTimes: [] },
  //     { professional: {id: 'e547UJS', name: 'St. John', picture: ''}, availableTimes: [] },
  //     { professional: {id: 'so$rfs#', name: 'Amazing MF', picture: ''}, availableTimes: [] }
  //   ];

  //   component.setProperty('schedulingData', data);
  //   await page.waitForChanges();

  //   const professionalPicker = await page.find('app-scheduling >>> professional-picker');


  //   expect(component.schedulingData).toHaveLength(3);
  // });
});
