//import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import { expect } from 'chai';


describe('Login', () => {

    it('should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
    })

    it('Login with invalid password', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'ghfhfgh55')
        const errorMessageText = await LoginPage.errorMessage.getText();
        expect(errorMessageText).to.equal('Epic sadface: Username and password do not match any user in this service');
    })

    it('Login with invalid login', async () => {
        await LoginPage.open()
        await LoginPage.login('hgfhfh55', 'secret_sauce')
        const errorMessageText = await LoginPage.errorMessage.getText();
        expect(errorMessageText).to.equal('Epic sadface: Username and password do not match any user in this service');
    })
});

describe('inventory', () => {

    it('Logout', async () => {
        await InventoryPage.open()
        await InventoryPage.logout()
    })

    it('Saving the card after logout ', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.itemButton.click()
        await InventoryPage.logout()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.CartIcon.click()
        const itemNameText = await InventoryPage.getItemNameText();
        expect(itemNameText).to.equal('Sauce Labs Backpack');
    })

    it('Checkout', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.item2Button.click()
        await InventoryPage.CartIcon.click()
        await InventoryPage.checkoutButton.click()
        await InventoryPage.fill("myname","myln","myzip")
        await InventoryPage.finishButton.click()
        const ThankyouMessageText = await InventoryPage.Thankyou.getText();
        expect(ThankyouMessageText).to.equal('Thank you for your order!'); 
    })
});




describe('Social Media Links', () => {

    it('should open Twitter in a new tab', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(2000); // Подождите, чтобы убедиться, что переход произошел

        const mainWindowHandle = await browser.getWindowHandle();
        await InventoryPage.clickTwitterIcon();
        const allWindowHandles = await browser.getWindowHandles();
        const newWindowHandle = allWindowHandles.find(handle => handle !== mainWindowHandle);

        await browser.switchToWindow(newWindowHandle);
        await browser.pause(2000); // Подождите, чтобы страница загрузилась

        const url = await browser.getUrl();
        expect(url).to.include.oneOf(['twitter.com', 'x.com']); // Учтем оба варианта URL

        await browser.closeWindow();
        await browser.switchToWindow(mainWindowHandle);
    });


    it('should open Facebook in a new tab', async () => {
        const mainWindowHandle = await browser.getWindowHandle();
        await InventoryPage.clickFacebookIcon();
        const allWindowHandles = await browser.getWindowHandles();
        const newWindowHandle = allWindowHandles.find(handle => handle !== mainWindowHandle);

        await browser.switchToWindow(newWindowHandle);
        await browser.pause(2000); // Подождите, чтобы страница загрузилась

        const url = await browser.getUrl();
        expect(url).to.include('facebook.com');

        await browser.closeWindow();
        await browser.switchToWindow(mainWindowHandle);
    });

    it('should open LinkedIn in a new tab', async () => {
        const mainWindowHandle = await browser.getWindowHandle();
        await InventoryPage.clickLinkedinIcon();
        const allWindowHandles = await browser.getWindowHandles();
        const newWindowHandle = allWindowHandles.find(handle => handle !== mainWindowHandle);

        await browser.switchToWindow(newWindowHandle);
        await browser.pause(2000); // Подождите, чтобы страница загрузилась

        const url = await browser.getUrl();
        expect(url).to.include('linkedin.com');

        await browser.closeWindow();
        await browser.switchToWindow(mainWindowHandle);
    });
}); 