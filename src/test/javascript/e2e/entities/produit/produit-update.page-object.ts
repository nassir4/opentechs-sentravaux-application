import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ProduitUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.produit.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#produit-nom'));
  quantiteInput: ElementFinder = element(by.css('input#produit-quantite'));
  prixInput: ElementFinder = element(by.css('input#produit-prix'));
  photoInput: ElementFinder = element(by.css('input#produit-photo'));
  createdAtInput: ElementFinder = element(by.css('input#produit-createdAt'));
  categorieSelect: ElementFinder = element(by.css('select#produit-categorie'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
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

  async setPhotoInput(photo) {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput() {
    return this.photoInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async categorieSelectLastOption() {
    await this.categorieSelect.all(by.tagName('option')).last().click();
  }

  async categorieSelectOption(option) {
    await this.categorieSelect.sendKeys(option);
  }

  getCategorieSelect() {
    return this.categorieSelect;
  }

  async getCategorieSelectedOption() {
    return this.categorieSelect.element(by.css('option:checked')).getText();
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
    await this.setQuantiteInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrixInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPhotoInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01-01-2001');
    await this.categorieSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
