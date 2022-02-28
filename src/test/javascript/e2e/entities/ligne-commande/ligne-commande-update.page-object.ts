import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LigneCommandeUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.ligneCommande.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantiteInput: ElementFinder = element(by.css('input#ligne-commande-quantite'));
  prixInput: ElementFinder = element(by.css('input#ligne-commande-prix'));
  commandeSelect: ElementFinder = element(by.css('select#ligne-commande-commande'));
  produitSelect: ElementFinder = element(by.css('select#ligne-commande-produit'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantiteInput(quantite) {
    await this.quantiteInput.sendKeys(quantite);
  }

  async getQuantiteInput() {
    return this.quantiteInput.getAttribute('value');
  }

  async setPrixInput(prix) {
    await this.prixInput.sendKeys(prix);
  }

  async getPrixInput() {
    return this.prixInput.getAttribute('value');
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

  async produitSelectLastOption() {
    await this.produitSelect.all(by.tagName('option')).last().click();
  }

  async produitSelectOption(option) {
    await this.produitSelect.sendKeys(option);
  }

  getProduitSelect() {
    return this.produitSelect;
  }

  async getProduitSelectedOption() {
    return this.produitSelect.element(by.css('option:checked')).getText();
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
    await this.setQuantiteInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrixInput('5');
    await this.commandeSelectLastOption();
    await this.produitSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
