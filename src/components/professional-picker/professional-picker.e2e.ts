import { newE2EPage } from '@stencil/core/testing';

describe('professional-picker', () => {
  it('renders child components', async () => {
    const page = await newE2EPage();

    await page.setContent('<professional-picker></professional-picker>');
    const component = await page.find('professional-picker');
    expect(component).toBeDefined();
  });
});
