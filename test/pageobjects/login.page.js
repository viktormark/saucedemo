import { $ } from '@wdio/globals'
import Page from './page.js';


class LoginPage extends Page {

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('input[type="submit"]');
    }

    get errorMessage(){ 
        return $("//div[@class='error-message-container error']//h3"); 
    }


    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
    


    open () {
        return super.open('');
    }
}

export default new LoginPage();
