const { diagnostics, openBrowser, goto, title, click, text, textBox, into, write, press, $, button, evaluate, screenshot, closeBrowser } = require('taiko');
const assert = require('assert').strict;
const date= Date.now();
(async () => {
    try {
        await openBrowser();
        await goto('http://automationexercise.com');
        assert.equal(await title(),'Automation Exercise');
	    await click("Products");

    //Searching for men tshirts and taking a screenshot of the page
	    assert.ok(text("ALL PRODUCTS").exists());
        await write("Tshirts",into(textBox({id:"search_product"})));
        await press("Enter");
        await click(button({id:"submit_search"}));
	    assert.ok(text("SEARCHED PRODUCTS").exists());
        await screenshot({path:".\\screenshots\\Search-"+date+".png"});
       
    } catch (error) {
        console.error(error);
	process.exitCode = 1;
    } finally {
        await closeBrowser();
    }
})();
''
