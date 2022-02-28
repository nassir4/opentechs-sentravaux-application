import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MessageUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.message.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  messageInput: ElementFinder = element(by.css('input#message-message'));
  ouvrierSelect: ElementFinder = element(by.css('select#message-ouvrier'));
  clientSelect: ElementFinder = element(by.css('select#message-client'));
  mediaSelect: ElementFinder = element(by.css('select#message-media'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return this.messageInput.getAttribute('value');
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

  async mediaSelectLastOption() {
    await this.mediaSelect.all(by.tagName('option')).last().click();
  }

  async mediaSelectOption(option) {
    await this.mediaSelect.sendKeys(option);
  }

  getMediaSelect() {
    return this.mediaSelect;
  }

  async getMediaSelectedOption() {
    return this.mediaSelect.element(by.css('option:checked')).getText();
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
    await this.setMessageInput('message');
    await this.ouvrierSelectLastOption();
    await this.clientSelectLastOption();
    await this.mediaSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
