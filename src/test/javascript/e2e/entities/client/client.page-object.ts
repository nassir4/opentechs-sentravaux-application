import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ClientUpdatePage from './client-update.page-object';

const expect = chai.expect;
export class ClientDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.client.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-client'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ClientComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('client-heading'));
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
    await navBarPage.getEntityPage('client');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateClient() {
    await this.createButton.click();
    return new ClientUpdatePage();
  }

  async deleteClient() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const clientDeleteDialog = new ClientDeleteDialog();
    await waitUntilDisplayed(clientDeleteDialog.deleteModal);
    expect(await clientDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.client.delete.question/);
    await clientDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(clientDeleteDialog.deleteModal);

    expect(await isVisible(clientDeleteDialog.deleteModal)).to.be.false;
  }
}
