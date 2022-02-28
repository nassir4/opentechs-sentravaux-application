import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import OuvrierUpdatePage from './ouvrier-update.page-object';

const expect = chai.expect;
export class OuvrierDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.ouvrier.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-ouvrier'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class OuvrierComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('ouvrier-heading'));
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
    await navBarPage.getEntityPage('ouvrier');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateOuvrier() {
    await this.createButton.click();
    return new OuvrierUpdatePage();
  }

  async deleteOuvrier() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const ouvrierDeleteDialog = new OuvrierDeleteDialog();
    await waitUntilDisplayed(ouvrierDeleteDialog.deleteModal);
    expect(await ouvrierDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.ouvrier.delete.question/);
    await ouvrierDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ouvrierDeleteDialog.deleteModal);

    expect(await isVisible(ouvrierDeleteDialog.deleteModal)).to.be.false;
  }
}
