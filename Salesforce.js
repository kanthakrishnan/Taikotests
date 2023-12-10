const { openBrowser, goto, click, below, textBox, into, write, $, dropDown, button, text, link, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("https://login.salesforce.com");
        
        await write("kanthakrishnan@testleaf.com",into(textBox(below("Username"))));
        await write("welcome123",into(textBox(below("Password"))));
        await click("Log In");
        await click($(`//div[@class='slds-icon-waffle']`));
        await scrollDown(1000);
       await focus(button('View All'));
        await click(button('View All'));
        await click("Sales");
           await focus(link('Accounts'));
                await click(link("Accounts"));
        await click("New");
        await write("Testing",into(textBox(below("Account Name"))));
        await scrollDown(10000);
        await focus(button(below('Ownership')));
        await click(button(below('Ownership')));
        
       
        await click("Private");
        await click("Save");
        await text("Account Testing was created").exists();
        await click("New Contact");
      
        await click(link(below("Salutation")));
        await click("Mr.");
        await write("Krishnan",into(textBox(below("Last Name"))));
        await click("Save");
        await text("Contact Krishnan was created").exists();
      
    } catch (error) {
        console.error(error);
         process.exitCode = 1;
    } finally {
        await closeBrowser();
    }
})();
