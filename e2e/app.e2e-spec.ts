import { TestAngularPage } from './app.po';

describe('test-angular App', () => {
  let page: TestAngularPage;

  beforeEach(() => {
    page = new TestAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
