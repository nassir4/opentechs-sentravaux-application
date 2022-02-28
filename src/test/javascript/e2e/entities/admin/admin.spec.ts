import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AdminComponentsPage from './admin.page-object';
import AdminUpdatePage from './admin-update.page-object';
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

describe('Admin e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adminComponentsPage: AdminComponentsPage;
  let adminUpdatePage: AdminUpdatePage;
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
    adminComponentsPage = new AdminComponentsPage();
    adminComponentsPage = await adminComponentsPage.goToPage(navBarPage);
  });

  it('should load Admins', async () => {
    expect(await adminComponentsPage.title.getText()).to.match(/Admins/);
    expect(await adminComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Admins', async () => {
    const beforeRecordsCount = (await isVisible(adminComponentsPage.noRecords)) ? 0 : await getRecordsCount(adminComponentsPage.table);
    adminUpdatePage = await adminComponentsPage.goToCreateAdmin();
    await adminUpdatePage.enterData();
    expect(await isVisible(adminUpdatePage.saveButton)).to.be.false;

    expect(await adminComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(adminComponentsPage.table);
    await waitUntilCount(adminComponentsPage.records, beforeRecordsCount + 1);
    expect(await adminComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await adminComponentsPage.deleteAdmin();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(adminComponentsPage.records, beforeRecordsCount);
      expect(await adminComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(adminComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
