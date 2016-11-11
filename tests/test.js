var fs = require('fs');

var outputFile = './ouput.json';
var inputFile = '../inputs/input.json';
var obj = require(inputFile);

module.exports = {
  'Fill input fields of flight' : function (browser) {
    browser.url('https://tickets.ua/')

    .waitForElementVisible('body', 1000)
    .assert.elementPresent('#round_trip[checked]')

    .clearValue('input[data-direction=departure]')
    .pause(500)
    .setValue('input[data-direction=departure]', obj.origin)

    .clearValue('input[data-direction=arrival]')
    .pause(500)
    .setValue('input[data-direction=arrival]', obj.destination)

    .waitForElementVisible('input[data-action=avia-search_start-search-btn]', 1000)
    //.click('input[type=submit]');

    //browser.end();
  }
};
