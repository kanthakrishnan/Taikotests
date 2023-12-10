const { diagnostics, openBrowser, goto, text, click, into, textBox, write, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto('http://automationexercise.com');
        await text("AutomationExercise").exists();
        await click(" Signup / Login");
        await text("Login to your account").exists();
        await write("kk@gmail.com",into(textBox({placeholder:"Email Address"})));
        await write("welcome123",into(textBox({placeholder:"Password"})));
        await click("Login");
        await text("Your email or password is incorrect!").exists();
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    } finally {
        await closeBrowser();
    }
})();
