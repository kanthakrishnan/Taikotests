const { openBrowser, goto, click, $, closeBrowser, screenshot } = require('taiko');
//const{ repl }=require('taiko\recorder');
(async () => {
    try {
        await openBrowser();
        //Click on the first movie and the next available showtime  from the list
        await goto('justickets.in/chennai');
        await click($(`//div[@class='poster']//img[1]`));
        await click($(`//div[@class='datebar']//span[1]`));
        await click($(`//a[@class='schedule available']`));
        await click("OKAY");
       
        //Choose 2 available seats 
        await evaluate($(`//div[contains(@class,"seat available")][1]/div/div[2]`),(elem) => elem.click());
        await evaluate($(`//div[contains(@class,"seat available")][2]/div/div[2]`),(elem) => elem.click());
       await click($(`//span[contains(text(),'Confirm')]`));
       
       await waitFor(3000);
       await screenshot({fullPage:true},{path:".\\screenshots\\Justickets-"+date+".png"});

       //Enter the payment details
       await click("Pay with  Credit / Debit Card ");
       await write('1111 2222 3333 4444', into($(`//input[@autocomplete='cc-number']`)));
       await write('0327', into(textBox(below(text('Expiry Date')))));
       await write('947', into(textBox(below(text('CVV')))));
       await write('Kantha Krishnan', into(textBox(below(text('Name')))));
       await write('kanthakrishnan@gmail.com', into(textBox(below(text('Email')))));
       await write('9790990450', into(textBox(below(text('Mobile')))));
        
    } catch (error) {
        console.error(error);
    } finally {
       await closeBrowser();
    }
})();
