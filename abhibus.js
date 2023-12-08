const { diagnostics, openBrowser, goto, click, $, button, closeBrowser, switchTo } = require('taiko');
(async () => {
    try {
        await openBrowser();
        //Search for buses
        await goto("abhibus.com");
        await click("Buses");
        await click($("//div[@id='search-from']"));
        await click("Chennai");
        await click($("//div[@id='search-to']"));
        await click("Bangalore");
        await click("Search")

        //Click Sleeper filter
        await click($(`//a/span[contains(text(),'Sleeper')]`));
        //Choose departure time
        await click("After 11 PM",below("Departure Time"));

        //Moving the Price Range slider
        await dragAndDrop($(`//div[@class='slider-thumb slider-thumb-0 ']`),{up:0,down:0,left:0,right:50}, { force: true})
        await dragAndDrop($(`//div[@class='slider-thumb slider-thumb-1 ']`),{up:0,down:0,left:100,right:0}, { force: true})
        /*await evaluate($(`//div[@class='slider-thumb slider-thumb-0 ']`), (element) => {
            element.setAttribute('aria-valuenow', "500");});*/
        await click("Show Seats");

        //Choose an available seat
            await click($(`//*[local-name()='rect'][1][(contains(@fill, 'white'))]/ancestor::button`));
        
        //Select Boarding and Dropping points
            checkBox(below($(`//input[@placeholder='Search Boarding Point']`))).check();
            checkBox(below($(`//input[@placeholder='Search Dropping Point']`))).check();
            await screenshot({fullPage:true},{path:".\\screenshots\\Abhibus_booking-"+date+".png"});
            await click($(`//button//span[text()='Continue']`));
            await press("Tab");
            await click("Skip");

         //Enter Passenger Details   
            await write("Kantha",into($(`//input[@placeholder='Name']`)));
            await write("38",into());
            await click(button("Female"));
            await write("kanthakrishnan@gmail.com",into($(`//input[@placeholder='Enter Email Address']`)));
            await write("9790990450",into($(`//input[@placeholder='Enter Mobile Number']`)));
            await click($(`//button[contains(text(),'Continue to Pay')]`));
            

    } catch (error) {
        console.error(error);
    } finally {
      await closeBrowser();
    }
})();
