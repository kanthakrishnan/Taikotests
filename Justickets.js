const { openBrowser, goto, click, $, closeBrowser, screenshot } = require('taiko');
const date= Date.now();
//const{ repl }=require('taiko\recorder');
(async () => {
    try {
          await setConfig({waitForNavigation: false});
        await openBrowser();
        //Click on the first movie and the next available showtime  from the list
        await goto('justickets.in/chennai');
        await click($(`div.name`));
        await click($(`div.shadow-small`));
        await click($(`a.schedule`));
        await click(button("OKAY"));
       
        //Choose 2 available seats 
        await evaluate($(`//div[contains(@class,"seat available")][1]/div/div[2]`),(elem) => elem.click());
        await evaluate($(`//div[contains(@class,"seat available")][2]/div/div[2]`),(elem) => elem.click());
        await evaluate($(`//span[contains(text(),'Confirm')]`),(elem) => elem.click());
       
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
          await screenshot({fullPage:true},{path:".\\screenshots\\Justickets-"+date+".png"});
        console.error(error);
         process.exitCode = 1;
    } finally {
       await closeBrowser();
    }
})();
