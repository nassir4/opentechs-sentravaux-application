import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CategorieComponentsPage from './categorie.page-object';
import CategorieUpdatePage from './categorie-update.page-object';
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

describe('Categorie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let categorieComponentsPage: CategorieComponentsPage;
  let categorieUpdatePage: CategorieUpdatePage;
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
    categorieComponentsPage = new CategorieComponentsPage();
    categorieComponentsPage = await categorieComponentsPage.goToPage(navBarPage);
  });

  it('should load Categories', async () => {
    expect(await categorieComponentsPage.title.getText()).to.match(/Categories/);
    expect(await categorieComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Categories', async () => {
    const beforeRecordsCount = (await isVisible(categorieComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(categorieComponentsPage.table);
    categorieUpdatePage = await categorieComponentsPage.goToCreateCategorie();
    await categorieUpdatePage.enterData();
    expect(await isVisible(categorieUpdatePage.saveButton)).to.be.false;

    expect(await categorieComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(categorieComponentsPage.table);
    await waitUntilCount(categorieComponentsPage.records, beforeRecordsCount + 1);
    expect(await categorieComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await categorieComponentsPage.deleteCategorie();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(categorieComponentsPage.records, beforeRecordsCount);
      expect(await categorieComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(categorieComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
