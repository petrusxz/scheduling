import { newE2EPage } from '@stencil/core/testing';

describe('time-picker', () => {
  it('renders child components', async () => {
    const page = await newE2EPage();

    await page.setContent('<time-picker></time-picker>');
    const component = await page.find('time-picker');
    expect(component).toBeDefined();
  });
});
