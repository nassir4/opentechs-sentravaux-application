import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OuvrierComponentsPage from './ouvrier.page-object';
import OuvrierUpdatePage from './ouvrier-update.page-object';
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

describe('Ouvrier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ouvrierComponentsPage: OuvrierComponentsPage;
  let ouvrierUpdatePage: OuvrierUpdatePage;
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
    ouvrierComponentsPage = new OuvrierComponentsPage();
    ouvrierComponentsPage = await ouvrierComponentsPage.goToPage(navBarPage);
  });

  it('should load Ouvriers', async () => {
    expect(await ouvrierComponentsPage.title.getText()).to.match(/Ouvriers/);
    expect(await ouvrierComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Ouvriers', async () => {
    const beforeRecordsCount = (await isVisible(ouvrierComponentsPage.noRecords)) ? 0 : await getRecordsCount(ouvrierComponentsPage.table);
    ouvrierUpdatePage = await ouvrierComponentsPage.goToCreateOuvrier();
    await ouvrierUpdatePage.enterData();
    expect(await isVisible(ouvrierUpdatePage.saveButton)).to.be.false;

    expect(await ouvrierComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ouvrierComponentsPage.table);
    await waitUntilCount(ouvrierComponentsPage.records, beforeRecordsCount + 1);
    expect(await ouvrierComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ouvrierComponentsPage.deleteOuvrier();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ouvrierComponentsPage.records, beforeRecordsCount);
      expect(await ouvrierComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ouvrierComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
