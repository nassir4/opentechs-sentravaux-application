import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ClientUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.client.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  telephoneInput: ElementFinder = element(by.css('input#client-telephone'));
  userSelect: ElementFinder = element(by.css('select#client-user'));
  adresseSelect: ElementFinder = element(by.css('select#client-adresse'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTelephoneInput(telephone) {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput() {
    return this.telephoneInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async adresseSelectLastOption() {
    await this.adresseSelect.all(by.tagName('option')).last().click();
  }

  async adresseSelectOption(option) {
    await this.adresseSelect.sendKeys(option);
  }

  getAdresseSelect() {
    return this.adresseSelect;
  }

  async getAdresseSelectedOption() {
    return this.adresseSelect.element(by.css('option:checked')).getText();
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
    await this.setTelephoneInput('5');
    await this.userSelectLastOption();
    await this.adresseSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
