import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CommandeUpdatePage from './commande-update.page-object';

const expect = chai.expect;
export class CommandeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('sentravauxV1App.commande.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-commande'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CommandeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('commande-heading'));
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
    await navBarPage.getEntityPage('commande');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCommande() {
    await this.createButton.click();
    return new CommandeUpdatePage();
  }

  async deleteCommande() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const commandeDeleteDialog = new CommandeDeleteDialog();
    await waitUntilDisplayed(commandeDeleteDialog.deleteModal);
    expect(await commandeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sentravauxV1App.commande.delete.question/);
    await commandeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(commandeDeleteDialog.deleteModal);

    expect(await isVisible(commandeDeleteDialog.deleteModal)).to.be.false;
  }
}
