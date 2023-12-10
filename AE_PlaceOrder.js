const { diagnostics, openBrowser, goto, click, below, image, hover, $, toRightOf, toLeftOf, tableCell, highlight, text, write, into, textBox, closeBrowser, waitFor } = require('taiko');
const assert = require('assert').strict;
const date= Date.now();
(async () => {
    try {
        await openBrowser();
        await goto('http://automationexercise.com');

        //Login
        await click(" Signup / Login");
        await write("kanthakrishnan@gmail.com",into(textBox({placeholder:"Email Address"})));
        await write("welcome123",into(textBox({placeholder:"Password"})));
        await click("Login");

        //Adding products to cart
        await click('Products');

        //Product 1
        await hover(image(toLeftOf("ALL PRODUCTS")));
       
        await click("Add to cart",below("Blue Top"));
        await click("Continue Shopping");

        //Product2
        await click("Add to cart",below("Men Tshirt"));
        await click("Continue Shopping");
        await click("Add to cart",below("Men Tshirt"));
       
        await click("View Cart");

        //Checking the description for the selected items
        await assert.ok((await tableCell({row:1, col:2}).text()).includes('Blue Top'));
        await assert.ok((await tableCell({row:2, col:2}).text()).includes('Men Tshirt'));

        //Checking the price for the Selected items
        await assert.ok((await tableCell({row:1, col:3}).text()).includes('500'));
        await assert.ok((await tableCell({row:2, col:3}).text()).includes('400'));

        //checking for the quantity
        await assert.ok((await tableCell({row:1, col:4}).text()).includes('1'));
        await assert.ok((await tableCell({row:2, col:4}).text()).includes('2'));

        //checking for the total price
        await assert.ok((await tableCell({row:1, col:5}).text()).includes('500'));
        await assert.ok((await tableCell({row:2, col:5}).text()).includes('800'));

        //Take screenshot and place order
        await screenshot({fullPage:true},{path:".\\screenshots\\OrderDetails-"+date+".png"});
        await click("Proceed To Checkout");
        await click("Place Order");

        //Entering card details
        await write("Kantha",into(textBox({name:"name_on_card"})));      
        await write("1234 1234 1234 1234",into(textBox({name:"card_number"})));
        await write("344",into(textBox({name:"cvc"})));
        await write("03",into(textBox({name:"expiry_month"})));
        await write("2027",into(textBox({name:"expiry_year"})));
        await click("Pay and Confirm Order");
        await assert.equal((await ($("h2")).text()),"ORDER PLACED!");
        
    } catch (error) {
        console.error(error);
         process.exitCode = 1;
    } finally {
      await closeBrowser();
    }
})();
