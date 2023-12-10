const { openBrowser, goto, write, click, closeBrowser } = require('taiko');
const{repl}=require('taiko/recorder');
const assert = require('assert').strict;

(async () => {
    try {
        await openBrowser();
        //Simple Google search and print performance metrics
        diagnostics.startTracing();
        await goto("http://www.google.com");
        await write("BlackBox Testing");
         await click("Google Search");
        await assert.ok(await text('Black Box Testing').exists());
        
        await currentURL();
        await goBack();
        diagnostics.endTracing();
        diagnostics.getPerformanceMetrics();
        screenshot({path:".\\screenshots\\google.png"})
        //await repl
    } catch (error) {
        console.error(error);
         process.exitCode = 1;
    } finally {
        await closeBrowser();
    }
})();
