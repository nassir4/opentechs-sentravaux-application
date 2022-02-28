import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AdresseUpdatePage from './adresse-update.page-object';

const expect = chai.expect;
export class AdresseDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.adresse.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-adresse'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AdresseComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('adresse-heading'));
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
    await navBarPage.getEntityPage('adresse');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAdresse() {
    await this.createButton.click();
    return new AdresseUpdatePage();
  }

  async deleteAdresse() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const adresseDeleteDialog = new AdresseDeleteDialog();
    await waitUntilDisplayed(adresseDeleteDialog.deleteModal);
    expect(await adresseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.adresse.delete.question/);
    await adresseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(adresseDeleteDialog.deleteModal);

    expect(await isVisible(adresseDeleteDialog.deleteModal)).to.be.false;
  }
}
