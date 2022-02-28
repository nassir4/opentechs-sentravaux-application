import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MessageComponentsPage from './message.page-object';
import MessageUpdatePage from './message-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Message e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let messageComponentsPage: MessageComponentsPage;
  let messageUpdatePage: MessageUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    messageComponentsPage = new MessageComponentsPage();
    messageComponentsPage = await messageComponentsPage.goToPage(navBarPage);
  });

  it('should load Messages', async () => {
    expect(await messageComponentsPage.title.getText()).to.match(/Messages/);
    expect(await messageComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Messages', async () => {
    const beforeRecordsCount = (await isVisible(messageComponentsPage.noRecords)) ? 0 : await getRecordsCount(messageComponentsPage.table);
    messageUpdatePage = await messageComponentsPage.goToCreateMessage();
    await messageUpdatePage.enterData();
    expect(await isVisible(messageUpdatePage.saveButton)).to.be.false;

    expect(await messageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(messageComponentsPage.table);
    await waitUntilCount(messageComponentsPage.records, beforeRecordsCount + 1);
    expect(await messageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await messageComponentsPage.deleteMessage();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(messageComponentsPage.records, beforeRecordsCount);
      expect(await messageComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(messageComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
