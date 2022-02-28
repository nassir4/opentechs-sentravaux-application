import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class AnnonceUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.annonce.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titreInput: ElementFinder = element(by.css('input#annonce-titre'));
  statutInput: ElementFinder = element(by.css('input#annonce-statut'));
  descriptionInput: ElementFinder = element(by.css('input#annonce-description'));
  disponibiliteSelect: ElementFinder = element(by.css('select#annonce-disponibilite'));
  imageEnAvantInput: ElementFinder = element(by.css('input#annonce-imageEnAvant'));
  createdAtInput: ElementFinder = element(by.css('input#annonce-createdAt'));
  ouvrierSelect: ElementFinder = element(by.css('select#annonce-ouvrier'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitreInput(titre) {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput() {
    return this.titreInput.getAttribute('value');
  }

  getStatutInput() {
    return this.statutInput;
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setDisponibiliteSelect(disponibilite) {
    await this.disponibiliteSelect.sendKeys(disponibilite);
  }

  async getDisponibiliteSelect() {
    return this.disponibiliteSelect.element(by.css('option:checked')).getText();
  }

  async disponibiliteSelectLastOption() {
    await this.disponibiliteSelect.all(by.tagName('option')).last().click();
  }
  async setImageEnAvantInput(imageEnAvant) {
    await this.imageEnAvantInput.sendKeys(imageEnAvant);
  }

  async getImageEnAvantInput() {
    return this.imageEnAvantInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
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
    await this.setTitreInput('titre');
    await waitUntilDisplayed(this.saveButton);
    const selectedStatut = await this.getStatutInput().isSelected();
    if (selectedStatut) {
      await this.getStatutInput().click();
    } else {
      await this.getStatutInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.disponibiliteSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setImageEnAvantInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01-01-2001');
    await this.ouvrierSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
