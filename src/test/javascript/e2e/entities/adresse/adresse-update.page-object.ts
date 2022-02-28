import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AdresseUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.adresse.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  regionInput: ElementFinder = element(by.css('input#adresse-region'));
  departementInput: ElementFinder = element(by.css('input#adresse-departement'));
  communeInput: ElementFinder = element(by.css('input#adresse-commune'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRegionInput(region) {
    await this.regionInput.sendKeys(region);
  }

  async getRegionInput() {
    return this.regionInput.getAttribute('value');
  }

  async setDepartementInput(departement) {
    await this.departementInput.sendKeys(departement);
  }

  async getDepartementInput() {
    return this.departementInput.getAttribute('value');
  }

  async setCommuneInput(commune) {
    await this.communeInput.sendKeys(commune);
  }

  async getCommuneInput() {
    return this.communeInput.getAttribute('value');
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
    await this.setRegionInput('region');
    await waitUntilDisplayed(this.saveButton);
    await this.setDepartementInput('departement');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommuneInput('commune');
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
