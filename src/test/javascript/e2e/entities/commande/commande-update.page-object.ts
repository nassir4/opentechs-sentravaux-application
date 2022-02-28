import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CommandeUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.commande.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantiteTotalInput: ElementFinder = element(by.css('input#commande-quantiteTotal'));
  prixTotalInput: ElementFinder = element(by.css('input#commande-prixTotal'));
  createdAtInput: ElementFinder = element(by.css('input#commande-createdAt'));
  clientSelect: ElementFinder = element(by.css('select#commande-client'));
  ouvrierSelect: ElementFinder = element(by.css('select#commande-ouvrier'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantiteTotalInput(quantiteTotal) {
    await this.quantiteTotalInput.sendKeys(quantiteTotal);
  }

  async getQuantiteTotalInput() {
    return this.quantiteTotalInput.getAttribute('value');
  }

  async setPrixTotalInput(prixTotal) {
    await this.prixTotalInput.sendKeys(prixTotal);
  }

  async getPrixTotalInput() {
    return this.prixTotalInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async clientSelectLastOption() {
    await this.clientSelect.all(by.tagName('option')).last().click();
  }

  async clientSelectOption(option) {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect() {
    return this.clientSelect;
  }

  async getClientSelectedOption() {
    return this.clientSelect.element(by.css('option:checked')).getText();
  }

  async ouvrierSelectLastOption() {
    await this.ouvrierSelect.all(by.tagName('option')).last().click();
  }

  async ouvrierSelectOption(option) {
    await this.ouvrierSelect.sendKeys(option);
  }

  getOuvrierSelect() {
    return this.ouvrierSelect;
  }

  async getOuvrierSelectedOption() {
    return this.ouvrierSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setQuantiteTotalInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrixTotalInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01-01-2001');
    await this.clientSelectLastOption();
    await this.ouvrierSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
