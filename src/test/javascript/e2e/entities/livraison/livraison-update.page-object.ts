import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LivraisonUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.livraison.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quartierInput: ElementFinder = element(by.css('input#livraison-quartier'));
  dateLivraisonInput: ElementFinder = element(by.css('input#livraison-dateLivraison'));
  commandeSelect: ElementFinder = element(by.css('select#livraison-commande'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuartierInput(quartier) {
    await this.quartierInput.sendKeys(quartier);
  }

  async getQuartierInput() {
    return this.quartierInput.getAttribute('value');
  }

  async setDateLivraisonInput(dateLivraison) {
    await this.dateLivraisonInput.sendKeys(dateLivraison);
  }

  async getDateLivraisonInput() {
    return this.dateLivraisonInput.getAttribute('value');
  }

  async commandeSelectLastOption() {
    await this.commandeSelect.all(by.tagName('option')).last().click();
  }

  async commandeSelectOption(option) {
    await this.commandeSelect.sendKeys(option);
  }

  getCommandeSelect() {
    return this.commandeSelect;
  }

  async getCommandeSelectedOption() {
    return this.commandeSelect.element(by.css('option:checked')).getText();
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
    await this.setQuartierInput('quartier');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateLivraisonInput('01-01-2001');
    await this.commandeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
