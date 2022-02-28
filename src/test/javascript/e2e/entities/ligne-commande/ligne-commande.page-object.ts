import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import LigneCommandeUpdatePage from './ligne-commande-update.page-object';

const expect = chai.expect;
export class LigneCommandeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.ligneCommande.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-ligneCommande'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class LigneCommandeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('ligne-commande-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('ligne-commande');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateLigneCommande() {
    await this.createButton.click();
    return new LigneCommandeUpdatePage();
  }

  async deleteLigneCommande() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const ligneCommandeDeleteDialog = new LigneCommandeDeleteDialog();
    await waitUntilDisplayed(ligneCommandeDeleteDialog.deleteModal);
    expect(await ligneCommandeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.ligneCommande.delete.question/);
    await ligneCommandeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ligneCommandeDeleteDialog.deleteModal);

    expect(await isVisible(ligneCommandeDeleteDialog.deleteModal)).to.be.false;
  }
}
