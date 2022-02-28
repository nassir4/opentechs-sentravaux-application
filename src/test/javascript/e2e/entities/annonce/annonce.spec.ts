import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AnnonceComponentsPage from './annonce.page-object';
import AnnonceUpdatePage from './annonce-update.page-object';
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

describe('Annonce e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let annonceComponentsPage: AnnonceComponentsPage;
  let annonceUpdatePage: AnnonceUpdatePage;
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
    annonceComponentsPage = new AnnonceComponentsPage();
    annonceComponentsPage = await annonceComponentsPage.goToPage(navBarPage);
  });

  it('should load Annonces', async () => {
    expect(await annonceComponentsPage.title.getText()).to.match(/Annonces/);
    expect(await annonceComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Annonces', async () => {
    const beforeRecordsCount = (await isVisible(annonceComponentsPage.noRecords)) ? 0 : await getRecordsCount(annonceComponentsPage.table);
    annonceUpdatePage = await annonceComponentsPage.goToCreateAnnonce();
    await annonceUpdatePage.enterData();
    expect(await isVisible(annonceUpdatePage.saveButton)).to.be.false;

    expect(await annonceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(annonceComponentsPage.table);
    await waitUntilCount(annonceComponentsPage.records, beforeRecordsCount + 1);
    expect(await annonceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await annonceComponentsPage.deleteAnnonce();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(annonceComponentsPage.records, beforeRecordsCount);
      expect(await annonceComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(annonceComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
