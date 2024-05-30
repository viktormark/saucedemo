import { $ } from '@wdio/globals'
import Page from './page.js';



class InventoryPage extends Page {


    get twitterIcon() { return $('.social_twitter'); }
    get facebookIcon() { return $('.social_facebook'); }
    get linkedinIcon() { return $('.social_linkedin'); }
    async clickTwitterIcon() {
        await this.twitterIcon.click();
    }
    async clickFacebookIcon() {
        await this.facebookIcon.click();
    }
    async clickLinkedinIcon() {
        await this.linkedinIcon.click();
    }


    get burger () {
        return $('#react-burger-menu-btn');
    }
    get logoutButton () {
        return $('#logout_sidebar_link');
    }
    get itemButton () {
        return $('#add-to-cart-sauce-labs-backpack');
    }
    get item2Button () {
        return $('#add-to-cart-sauce-labs-bike-light');
    }
    get CartIcon () {
        return $('#shopping_cart_container');
    }
    get itemName() {
        return $('.inventory_item_name');
    }
    get checkoutButton () {
        return $('#checkout');
    }
    get firstName () {
        return $('#first-name');
    }
    get lastName () {
        return $('#last-name');
    }
    get zip () {
        return $('#postal-code');
    }
    get continueButton () {
        return $('#continue');
    }
    async fill(firstName, lastName,zip) {
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.zip.setValue(zip);
        await this.continueButton.click();
    }

    get finishButton () {
        return $('#finish');
    }

    async getItemNameText() {
        return await this.itemName.getText();
    }
    async logout() {
        await this.burger.click()
        await browser.pause(2000);
        await this.logoutButton.click()
    }

    get Thankyou () {
        return $('.complete-header');
    }




    open () {
        return super.open('inventory.html');
    }
}

export default new InventoryPage();
