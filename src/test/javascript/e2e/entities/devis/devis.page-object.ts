import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DevisUpdatePage from './devis-update.page-object';

const expect = chai.expect;
export class DevisDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.devis.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-devis'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DevisComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('devis-heading'));
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
    await navBarPage.getEntityPage('devis');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDevis() {
    await this.createButton.click();
    return new DevisUpdatePage();
  }

  async deleteDevis() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const devisDeleteDialog = new DevisDeleteDialog();
    await waitUntilDisplayed(devisDeleteDialog.deleteModal);
    expect(await devisDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.devis.delete.question/);
    await devisDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(devisDeleteDialog.deleteModal);

    expect(await isVisible(devisDeleteDialog.deleteModal)).to.be.false;
  }
}
