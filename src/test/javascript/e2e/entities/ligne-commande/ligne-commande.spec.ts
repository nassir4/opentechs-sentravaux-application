import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LigneCommandeComponentsPage from './ligne-commande.page-object';
import LigneCommandeUpdatePage from './ligne-commande-update.page-object';
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

describe('LigneCommande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ligneCommandeComponentsPage: LigneCommandeComponentsPage;
  let ligneCommandeUpdatePage: LigneCommandeUpdatePage;
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
    ligneCommandeComponentsPage = new LigneCommandeComponentsPage();
    ligneCommandeComponentsPage = await ligneCommandeComponentsPage.goToPage(navBarPage);
  });

  it('should load LigneCommandes', async () => {
    expect(await ligneCommandeComponentsPage.title.getText()).to.match(/Ligne Commandes/);
    expect(await ligneCommandeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete LigneCommandes', async () => {
    const beforeRecordsCount = (await isVisible(ligneCommandeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ligneCommandeComponentsPage.table);
    ligneCommandeUpdatePage = await ligneCommandeComponentsPage.goToCreateLigneCommande();
    await ligneCommandeUpdatePage.enterData();
    expect(await isVisible(ligneCommandeUpdatePage.saveButton)).to.be.false;

    expect(await ligneCommandeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ligneCommandeComponentsPage.table);
    await waitUntilCount(ligneCommandeComponentsPage.records, beforeRecordsCount + 1);
    expect(await ligneCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ligneCommandeComponentsPage.deleteLigneCommande();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ligneCommandeComponentsPage.records, beforeRecordsCount);
      expect(await ligneCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ligneCommandeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
