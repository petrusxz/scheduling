import { newE2EPage } from '@stencil/core/testing';

describe('schedules-overview', () => {
  it('renders child components', async () => {
    const page = await newE2EPage();

    await page.setContent('<schedules-overview></schedules-overview>');
    const component = await page.find('schedules-overview');
    expect(component).toBeDefined();
  });
});
