import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AdresseComponentsPage from './adresse.page-object';
import AdresseUpdatePage from './adresse-update.page-object';
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

describe('Adresse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adresseComponentsPage: AdresseComponentsPage;
  let adresseUpdatePage: AdresseUpdatePage;
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
    adresseComponentsPage = new AdresseComponentsPage();
    adresseComponentsPage = await adresseComponentsPage.goToPage(navBarPage);
  });

  it('should load Adresses', async () => {
    expect(await adresseComponentsPage.title.getText()).to.match(/Adresses/);
    expect(await adresseComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Adresses', async () => {
    const beforeRecordsCount = (await isVisible(adresseComponentsPage.noRecords)) ? 0 : await getRecordsCount(adresseComponentsPage.table);
    adresseUpdatePage = await adresseComponentsPage.goToCreateAdresse();
    await adresseUpdatePage.enterData();
    expect(await isVisible(adresseUpdatePage.saveButton)).to.be.false;

    expect(await adresseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(adresseComponentsPage.table);
    await waitUntilCount(adresseComponentsPage.records, beforeRecordsCount + 1);
    expect(await adresseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await adresseComponentsPage.deleteAdresse();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(adresseComponentsPage.records, beforeRecordsCount);
      expect(await adresseComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(adresseComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
