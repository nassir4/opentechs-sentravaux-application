import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PubliciteUpdatePage from './publicite-update.page-object';

const expect = chai.expect;
export class PubliciteDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.publicite.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-publicite'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PubliciteComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('publicite-heading'));
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
    await navBarPage.getEntityPage('publicite');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePublicite() {
    await this.createButton.click();
    return new PubliciteUpdatePage();
  }

  async deletePublicite() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const publiciteDeleteDialog = new PubliciteDeleteDialog();
    await waitUntilDisplayed(publiciteDeleteDialog.deleteModal);
    expect(await publiciteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.publicite.delete.question/);
    await publiciteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(publiciteDeleteDialog.deleteModal);

    expect(await isVisible(publiciteDeleteDialog.deleteModal)).to.be.false;
  }
}
