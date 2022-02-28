import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import LivraisonUpdatePage from './livraison-update.page-object';

const expect = chai.expect;
export class LivraisonDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.livraison.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-livraison'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class LivraisonComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('livraison-heading'));
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
    await navBarPage.getEntityPage('livraison');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateLivraison() {
    await this.createButton.click();
    return new LivraisonUpdatePage();
  }

  async deleteLivraison() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const livraisonDeleteDialog = new LivraisonDeleteDialog();
    await waitUntilDisplayed(livraisonDeleteDialog.deleteModal);
    expect(await livraisonDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.livraison.delete.question/);
    await livraisonDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(livraisonDeleteDialog.deleteModal);

    expect(await isVisible(livraisonDeleteDialog.deleteModal)).to.be.false;
  }
}
