import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MessageUpdatePage from './message-update.page-object';

const expect = chai.expect;
export class MessageDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.message.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-message'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MessageComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('message-heading'));
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
    await navBarPage.getEntityPage('message');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMessage() {
    await this.createButton.click();
    return new MessageUpdatePage();
  }

  async deleteMessage() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const messageDeleteDialog = new MessageDeleteDialog();
    await waitUntilDisplayed(messageDeleteDialog.deleteModal);
    expect(await messageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.message.delete.question/);
    await messageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(messageDeleteDialog.deleteModal);

    expect(await isVisible(messageDeleteDialog.deleteModal)).to.be.false;
  }
}
