import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MediaUpdatePage from './media-update.page-object';

const expect = chai.expect;
export class MediaDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.media.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-media'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MediaComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('media-heading'));
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
    await navBarPage.getEntityPage('media');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMedia() {
    await this.createButton.click();
    return new MediaUpdatePage();
  }

  async deleteMedia() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const mediaDeleteDialog = new MediaDeleteDialog();
    await waitUntilDisplayed(mediaDeleteDialog.deleteModal);
    expect(await mediaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.media.delete.question/);
    await mediaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(mediaDeleteDialog.deleteModal);

    expect(await isVisible(mediaDeleteDialog.deleteModal)).to.be.false;
  }
}
