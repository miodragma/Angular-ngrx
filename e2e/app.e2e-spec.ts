import { DashboardReduxPage } from './app.po';

describe('dashboard-redux App', () => {
  let page: DashboardReduxPage;

  beforeEach(() => {
    page = new DashboardReduxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
