import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PubliciteComponentsPage from './publicite.page-object';
import PubliciteUpdatePage from './publicite-update.page-object';
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

describe('Publicite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let publiciteComponentsPage: PubliciteComponentsPage;
  let publiciteUpdatePage: PubliciteUpdatePage;
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
    publiciteComponentsPage = new PubliciteComponentsPage();
    publiciteComponentsPage = await publiciteComponentsPage.goToPage(navBarPage);
  });

  it('should load Publicites', async () => {
    expect(await publiciteComponentsPage.title.getText()).to.match(/Publicites/);
    expect(await publiciteComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Publicites', async () => {
    const beforeRecordsCount = (await isVisible(publiciteComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(publiciteComponentsPage.table);
    publiciteUpdatePage = await publiciteComponentsPage.goToCreatePublicite();
    await publiciteUpdatePage.enterData();
    expect(await isVisible(publiciteUpdatePage.saveButton)).to.be.false;

    expect(await publiciteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(publiciteComponentsPage.table);
    await waitUntilCount(publiciteComponentsPage.records, beforeRecordsCount + 1);
    expect(await publiciteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await publiciteComponentsPage.deletePublicite();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(publiciteComponentsPage.records, beforeRecordsCount);
      expect(await publiciteComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(publiciteComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
