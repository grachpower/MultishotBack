import { MultiShotAdminPage } from './app.po';

describe('multi-shot-admin App', () => {
  let page: MultiShotAdminPage;

  beforeEach(() => {
    page = new MultiShotAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
