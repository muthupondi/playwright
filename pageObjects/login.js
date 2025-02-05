class Login{

    constructor(page) {
        this.page = page;
        this.userNameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[type="submit"]');
    } 
  
    async signIn(username,password){
      await this.userNameField.fill(username);  
      await this.userNameField.press('Tab');  
      await this.passwordField.fill(password);  
      await this.submitButton.click();
    }
}

module.exports=Login