import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class PubliciteUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.publicite.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  imageInput: ElementFinder = element(by.css('input#publicite-image'));
  videoInput: ElementFinder = element(by.css('input#publicite-video'));
  descriptionInput: ElementFinder = element(by.css('input#publicite-description'));
  statutInput: ElementFinder = element(by.css('input#publicite-statut'));
  adminSelect: ElementFinder = element(by.css('select#publicite-admin'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  async setVideoInput(video) {
    await this.videoInput.sendKeys(video);
  }

  async getVideoInput() {
    return this.videoInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  getStatutInput() {
    return this.statutInput;
  }
  async adminSelectLastOption() {
    await this.adminSelect.all(by.tagName('option')).last().click();
  }

  async adminSelectOption(option) {
    await this.adminSelect.sendKeys(option);
  }

  getAdminSelect() {
    return this.adminSelect;
  }

  async getAdminSelectedOption() {
    return this.adminSelect.element(by.css('option:checked')).getText();
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
    await this.setImageInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setVideoInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    const selectedStatut = await this.getStatutInput().isSelected();
    if (selectedStatut) {
      await this.getStatutInput().click();
    } else {
      await this.getStatutInput().click();
    }
    await this.adminSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
