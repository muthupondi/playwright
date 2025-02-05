const {test,expect} = require('@playwright/test');
const Login = require('../pageObjects/login');
const AddUser = require('../pageObjects/addUser');
const config=require('../configs/config.js')
const env = process.env.NODE_ENV || 'qa';

test('OrangeHRM Application System User Validation Using JS',async ({page}) =>{

    const login = new Login(page);
    await page.goto(config.AUT_URL[env].URL+'/auth/login')
    const title = await page.title()
    expect(title).toBe('OrangeHRM')   
    console.log("username",config.Users[env].admin) 
    await login.signIn(config.Users[env].admin.username,config.Users[env].admin.password)
    await expect(page).toHaveURL(config.AUT_URL[env].URL+'/dashboard/index', { timeout: 5000 })

     //Add User
     const addUser = new AddUser(page)
     await addUser.navigateAdminTab()
     await addUser.clickOnAddButton()
     await addUser.fillTheMandatoryFields(config.Users[env].system.username,config.Users[env].system.password)
     await page.waitForSelector('button[type="submit"]')
     await addUser.clickOnSaveButton()
     const successMessage = page.locator('p:has-text("Success")').first().isVisible()
     expect(successMessage).toBeTruthy()
     await page.waitForTimeout(3000)
 
     //Edit User
     await addUser.searchAddedUserName(config.Users[env].system.username)
     await page.waitForTimeout(3000)
     await addUser.editUser()
     const updatedMessage = page.locator('p:has-text("Success")').first().isVisible()
     expect(updatedMessage).toBeTruthy()    
     await page.waitForTimeout(3000)
 
     //Delete User
     await addUser.searchAddedUserName(config.Users[env].system.username)
     await page.waitForTimeout(3000)
     await addUser.deleteUser()
     const deleteMessage = page.locator('hasText:No Records Found').isVisible()
     expect(deleteMessage).toBeTruthy() 
     await page.waitForTimeout(3000)   
})
test('machine2',async ({page}) =>{
    console.log("machine2")
});
test('machine3',async ({page}) =>{
    console.log("machine3")
});
test('machine4',async ({page}) =>{
    console.log("machine4")
});

