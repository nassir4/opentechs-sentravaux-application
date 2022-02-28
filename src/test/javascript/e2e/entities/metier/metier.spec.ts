import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MetierComponentsPage from './metier.page-object';
import MetierUpdatePage from './metier-update.page-object';
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

describe('Metier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metierComponentsPage: MetierComponentsPage;
  let metierUpdatePage: MetierUpdatePage;
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
    metierComponentsPage = new MetierComponentsPage();
    metierComponentsPage = await metierComponentsPage.goToPage(navBarPage);
  });

  it('should load Metiers', async () => {
    expect(await metierComponentsPage.title.getText()).to.match(/Metiers/);
    expect(await metierComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Metiers', async () => {
    const beforeRecordsCount = (await isVisible(metierComponentsPage.noRecords)) ? 0 : await getRecordsCount(metierComponentsPage.table);
    metierUpdatePage = await metierComponentsPage.goToCreateMetier();
    await metierUpdatePage.enterData();
    expect(await isVisible(metierUpdatePage.saveButton)).to.be.false;

    expect(await metierComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(metierComponentsPage.table);
    await waitUntilCount(metierComponentsPage.records, beforeRecordsCount + 1);
    expect(await metierComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await metierComponentsPage.deleteMetier();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(metierComponentsPage.records, beforeRecordsCount);
      expect(await metierComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(metierComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
