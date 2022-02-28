import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class MediaUpdatePage {
  pageTitle: ElementFinder = element(by.id('sentravauxV1App.media.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  imageInput: ElementFinder = element(by.css('input#media-image'));
  videoInput: ElementFinder = element(by.css('input#media-video'));
  annonceSelect: ElementFinder = element(by.css('select#media-annonce'));

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

  async annonceSelectLastOption() {
    await this.annonceSelect.all(by.tagName('option')).last().click();
  }

  async annonceSelectOption(option) {
    await this.annonceSelect.sendKeys(option);
  }

  getAnnonceSelect() {
    return this.annonceSelect;
  }

  async getAnnonceSelectedOption() {
    return this.annonceSelect.element(by.css('option:checked')).getText();
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
    await this.annonceSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
