import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LivraisonComponentsPage from './livraison.page-object';
import LivraisonUpdatePage from './livraison-update.page-object';
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

describe('Livraison e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let livraisonComponentsPage: LivraisonComponentsPage;
  let livraisonUpdatePage: LivraisonUpdatePage;
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
    livraisonComponentsPage = new LivraisonComponentsPage();
    livraisonComponentsPage = await livraisonComponentsPage.goToPage(navBarPage);
  });

  it('should load Livraisons', async () => {
    expect(await livraisonComponentsPage.title.getText()).to.match(/Livraisons/);
    expect(await livraisonComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Livraisons', async () => {
    const beforeRecordsCount = (await isVisible(livraisonComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(livraisonComponentsPage.table);
    livraisonUpdatePage = await livraisonComponentsPage.goToCreateLivraison();
    await livraisonUpdatePage.enterData();
    expect(await isVisible(livraisonUpdatePage.saveButton)).to.be.false;

    expect(await livraisonComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(livraisonComponentsPage.table);
    await waitUntilCount(livraisonComponentsPage.records, beforeRecordsCount + 1);
    expect(await livraisonComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await livraisonComponentsPage.deleteLivraison();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(livraisonComponentsPage.records, beforeRecordsCount);
      expect(await livraisonComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(livraisonComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
