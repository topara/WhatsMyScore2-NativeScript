require('reflect-metadata');
var application = require("application");
application.onUncaughtError = function (error) {
    console.error(error.message);
    console.error(error.nativeError);
};
application.mainModule = "mainPage";
application.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQU8sa0JBQWtCLENBQUMsQ0FBQTtBQUcxQixJQUFPLFdBQVcsV0FBVyxhQUFhLENBQUMsQ0FBQztBQUU1QyxXQUFXLENBQUMsZUFBZSxHQUFHLFVBQUMsS0FBSztJQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFHRixXQUFXLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUNwQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMifQ==