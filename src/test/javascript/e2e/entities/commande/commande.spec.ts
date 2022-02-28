import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CommandeComponentsPage from './commande.page-object';
import CommandeUpdatePage from './commande-update.page-object';
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

describe('Commande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commandeComponentsPage: CommandeComponentsPage;
  let commandeUpdatePage: CommandeUpdatePage;
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
    commandeComponentsPage = new CommandeComponentsPage();
    commandeComponentsPage = await commandeComponentsPage.goToPage(navBarPage);
  });

  it('should load Commandes', async () => {
    expect(await commandeComponentsPage.title.getText()).to.match(/Commandes/);
    expect(await commandeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Commandes', async () => {
    const beforeRecordsCount = (await isVisible(commandeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(commandeComponentsPage.table);
    commandeUpdatePage = await commandeComponentsPage.goToCreateCommande();
    await commandeUpdatePage.enterData();
    expect(await isVisible(commandeUpdatePage.saveButton)).to.be.false;

    expect(await commandeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(commandeComponentsPage.table);
    await waitUntilCount(commandeComponentsPage.records, beforeRecordsCount + 1);
    expect(await commandeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await commandeComponentsPage.deleteCommande();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(commandeComponentsPage.records, beforeRecordsCount);
      expect(await commandeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(commandeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
