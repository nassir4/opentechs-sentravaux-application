import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MetierUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.metier.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#metier-nom'));
  descriptionInput: ElementFinder = element(by.css('input#metier-description'));
  ouvrierSelect: ElementFinder = element(by.css('select#metier-ouvrier'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
    await this.setNomInput('nom');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await this.ouvrierSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
