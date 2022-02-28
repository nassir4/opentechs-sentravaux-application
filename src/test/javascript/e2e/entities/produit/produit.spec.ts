import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProduitComponentsPage from './produit.page-object';
import ProduitUpdatePage from './produit-update.page-object';
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

describe('Produit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let produitComponentsPage: ProduitComponentsPage;
  let produitUpdatePage: ProduitUpdatePage;
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
    produitComponentsPage = new ProduitComponentsPage();
    produitComponentsPage = await produitComponentsPage.goToPage(navBarPage);
  });

  it('should load Produits', async () => {
    expect(await produitComponentsPage.title.getText()).to.match(/Produits/);
    expect(await produitComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Produits', async () => {
    const beforeRecordsCount = (await isVisible(produitComponentsPage.noRecords)) ? 0 : await getRecordsCount(produitComponentsPage.table);
    produitUpdatePage = await produitComponentsPage.goToCreateProduit();
    await produitUpdatePage.enterData();
    expect(await isVisible(produitUpdatePage.saveButton)).to.be.false;

    expect(await produitComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(produitComponentsPage.table);
    await waitUntilCount(produitComponentsPage.records, beforeRecordsCount + 1);
    expect(await produitComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await produitComponentsPage.deleteProduit();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(produitComponentsPage.records, beforeRecordsCount);
      expect(await produitComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(produitComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
