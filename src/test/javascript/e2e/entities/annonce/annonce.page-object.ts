import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AnnonceUpdatePage from './annonce-update.page-object';

const expect = chai.expect;
export class AnnonceDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.annonce.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-annonce'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AnnonceComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('annonce-heading'));
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
    await navBarPage.getEntityPage('annonce');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAnnonce() {
    await this.createButton.click();
    return new AnnonceUpdatePage();
  }

  async deleteAnnonce() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const annonceDeleteDialog = new AnnonceDeleteDialog();
    await waitUntilDisplayed(annonceDeleteDialog.deleteModal);
    expect(await annonceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.annonce.delete.question/);
    await annonceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(annonceDeleteDialog.deleteModal);

    expect(await isVisible(annonceDeleteDialog.deleteModal)).to.be.false;
  }
}
