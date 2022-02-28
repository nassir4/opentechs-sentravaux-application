import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MediaComponentsPage from './media.page-object';
import MediaUpdatePage from './media-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Media e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mediaComponentsPage: MediaComponentsPage;
  let mediaUpdatePage: MediaUpdatePage;
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
    mediaComponentsPage = new MediaComponentsPage();
    mediaComponentsPage = await mediaComponentsPage.goToPage(navBarPage);
  });

  it('should load Media', async () => {
    expect(await mediaComponentsPage.title.getText()).to.match(/Media/);
    expect(await mediaComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Media', async () => {
    const beforeRecordsCount = (await isVisible(mediaComponentsPage.noRecords)) ? 0 : await getRecordsCount(mediaComponentsPage.table);
    mediaUpdatePage = await mediaComponentsPage.goToCreateMedia();
    await mediaUpdatePage.enterData();
    expect(await isVisible(mediaUpdatePage.saveButton)).to.be.false;

    expect(await mediaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(mediaComponentsPage.table);
    await waitUntilCount(mediaComponentsPage.records, beforeRecordsCount + 1);
    expect(await mediaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await mediaComponentsPage.deleteMedia();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(mediaComponentsPage.records, beforeRecordsCount);
      expect(await mediaComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(mediaComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
