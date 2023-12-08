const { diagnostics, openBrowser, closeBrowser, goto, textBox, into, write, $, click } = require('taiko');
(async () => {
    try {
        await openBrowser({headless:false});
	
       
        await goto("https://register.freecrm.com/register");
        await write("kanthakrishnan@gmail.com",into(textBox({name:"email"})));
        await write("Test@123",into(textBox({name:"password"})));
        await click($("//div[text()='Login']"));
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
