const { diagnostics, openBrowser, goto, title, click, text, textBox, into, write, below, button, above, radioButton, dropDown, closeBrowser, scrollDown } = require('taiko');
const assert = require('assert').strict;
const fs=require("fs");
const csv=require("csv-parser");
const faker=require("faker");
const firstName=faker.name.firstName();
(async () => {
    try {
        //Open the url and click on New Signup
        await openBrowser();
        await deleteCookies();
        await goto('automationexercise.com',{timeout:60000});
        assert.equal(await title(),'Automation Exercise');
        await click(" Signup / Login");
        await text("New User Signup!").exists();

        //Enter user details using Faker API
        await write(firstName,into(textBox({placeholder:"Name"})));
        await write(faker.internet.email(),into(textBox(above("Signup"))));
        await click(button("Signup"));
        waitFor(5000);
        await click(radioButton("Mrs."));
        await click(button("Create Account"));
       
        await write(firstName,into("First name"));
        await write(faker.name.lastName(),into("Last name"));
        await dropDown({id:"days"}).select("23");
        await dropDown({id:"months"}).select("August");
        await dropDown({id:"years"}).select("1985");
        await write(faker.company.companyName(),into("Company"));
        await write(faker.address.streetAddress(),into("Address"));
        await dropDown("Country").select("India");
        await write("Tamilnadu",into("State"));
        await write("Chennai",into("City"));
        await write("600088",into(textBox({id:"zipcode"})));
        await write("9790990450",into("Mobile Number"));
        await write(faker.internet.password(),into(textBox("Password")));
        await waitFor(5000);
        await click(button("Create Account"));
      
        //Check if the account is created and the user name is valid
        await assert.ok(await text("ACCOUNT CREATED!").exists(0,0));
        await click("Continue")
       await text(" Logged in as "+firstName).exists();

       //Delete the new user
       await click("Delete Account");
       await text("ACCOUNT DELETED").exists();
       
       
    } catch (error) {
        console.error(error);
         process.exitCode = 1;
    } finally {
       await closeBrowser();
    }
})();
