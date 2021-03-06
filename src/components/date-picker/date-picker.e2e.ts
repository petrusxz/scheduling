import { newE2EPage } from '@stencil/core/testing';

describe('date-picker', () => {
  it('renders child components', async () => {
    const page = await newE2EPage();

    await page.setContent('<date-picker></date-picker>');
    const component = await page.find('date-picker');
    expect(component).toBeDefined();
  });
});
