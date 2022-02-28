import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CategorieUpdatePage from './categorie-update.page-object';

const expect = chai.expect;
export class CategorieDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.categorie.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-categorie'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CategorieComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('categorie-heading'));
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
    await navBarPage.getEntityPage('categorie');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCategorie() {
    await this.createButton.click();
    return new CategorieUpdatePage();
  }

  async deleteCategorie() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const categorieDeleteDialog = new CategorieDeleteDialog();
    await waitUntilDisplayed(categorieDeleteDialog.deleteModal);
    expect(await categorieDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.categorie.delete.question/);
    await categorieDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(categorieDeleteDialog.deleteModal);

    expect(await isVisible(categorieDeleteDialog.deleteModal)).to.be.false;
  }
}
