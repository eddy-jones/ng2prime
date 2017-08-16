import { Ng2primePage } from './app.po';

describe('ng2prime App', () => {
  let page: Ng2primePage;

  beforeEach(() => {
    page = new Ng2primePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
