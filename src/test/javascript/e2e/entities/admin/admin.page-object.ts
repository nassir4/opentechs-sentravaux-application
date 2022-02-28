import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AdminUpdatePage from './admin-update.page-object';

const expect = chai.expect;
export class AdminDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.admin.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-admin'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AdminComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('admin-heading'));
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
    await navBarPage.getEntityPage('admin');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAdmin() {
    await this.createButton.click();
    return new AdminUpdatePage();
  }

  async deleteAdmin() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const adminDeleteDialog = new AdminDeleteDialog();
    await waitUntilDisplayed(adminDeleteDialog.deleteModal);
    expect(await adminDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.admin.delete.question/);
    await adminDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(adminDeleteDialog.deleteModal);

    expect(await isVisible(adminDeleteDialog.deleteModal)).to.be.false;
  }
}
