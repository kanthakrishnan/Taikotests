const { openBrowser, goto, $, evaluate, radioButton, click, textBox, write, button, closeBrowser } = require('taiko');
(async () => {
    try {
    await openBrowser();
    await goto("https://www.cheapoair.com/");
    await waitFor(30000);
    //closing the ad window
	await evaluate($("//div[@class='modal-close-icon']"),(elem) => elem.click());
    await click($(`//span[@class='cross-icon']`));

    //Enter the trip details and search for flight options
	await click(radioButton('One Way'));
	await write('Chennai',$(`//input[@id='from0']`));
	await write('Bengaluru',$(`//input[@id='to0']`));
    await click($(`//input[@id='cal0']`));
    await click($(`//a[@class=' month-date is--today']`));
	await click($(`//a[@id='travellerButton']`));
    await click(button({id:`addadults`}));
    await click("Search Flights");
    await click("See Flights Only")
      
    //Sort by price and take a screenshot
    await click($(`//span[text()='Cheapest']`));
    await screenshot({fullPage:true},{path:".\\screenshots\\FlightDetails-"+date+".png"});
    await click("SELECT");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
