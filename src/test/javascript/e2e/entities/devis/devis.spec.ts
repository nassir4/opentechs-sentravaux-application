import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DevisComponentsPage from './devis.page-object';
import DevisUpdatePage from './devis-update.page-object';
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

describe('Devis e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let devisComponentsPage: DevisComponentsPage;
  let devisUpdatePage: DevisUpdatePage;
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
    devisComponentsPage = new DevisComponentsPage();
    devisComponentsPage = await devisComponentsPage.goToPage(navBarPage);
  });

  it('should load Devis', async () => {
    expect(await devisComponentsPage.title.getText()).to.match(/Devis/);
    expect(await devisComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Devis', async () => {
    const beforeRecordsCount = (await isVisible(devisComponentsPage.noRecords)) ? 0 : await getRecordsCount(devisComponentsPage.table);
    devisUpdatePage = await devisComponentsPage.goToCreateDevis();
    await devisUpdatePage.enterData();
    expect(await isVisible(devisUpdatePage.saveButton)).to.be.false;

    expect(await devisComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(devisComponentsPage.table);
    await waitUntilCount(devisComponentsPage.records, beforeRecordsCount + 1);
    expect(await devisComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await devisComponentsPage.deleteDevis();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(devisComponentsPage.records, beforeRecordsCount);
      expect(await devisComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(devisComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
