import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CategorieUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.categorie.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomCategorieInput: ElementFinder = element(by.css('input#categorie-nomCategorie'));
  descriptionInput: ElementFinder = element(by.css('input#categorie-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomCategorieInput(nomCategorie) {
    await this.nomCategorieInput.sendKeys(nomCategorie);
  }

  async getNomCategorieInput() {
    return this.nomCategorieInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
    await this.setNomCategorieInput('nomCategorie');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
