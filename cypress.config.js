const { defineConfig } = require("cypress");
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')  //file system

const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
async function setupNodeEvents(on, config) {
  // addCucumberPreprocessorPlugin(on, config);
  // on("file:preprocessor", preprocessor(config));
  // // Make sure to return the config object as it might have been modified by the plugin.
  // return config;
  // implement node event listeners here
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  //creating new task using on
  on('task', {
    excelToJsonConverter(filePath) {  //task name is excelToJson
      //paste the code here
      const result = excelToJson({
        source: fs.readFileSync(filePath)
      });
      return result;
    }
  })
  on("file:preprocessor", browserify.default(config));
  return config;
}
module.exports = defineConfig({
  projectId: "ucnb7h",
  // defaultCommandTimeout:6000,
  env: {
    url: "https://rahulshettyacademy.com/angularpractice/",
    CYPRESS_RECORD_KEY: "e1086ff5-c069-4024-8b75-27eafd773ef8"
  },


  e2e: {
    setupNodeEvents,
    watchForFileChanges: false,
    //specPattern: "cypress/e2e/BDD/Features/*.feature",

  },
});
