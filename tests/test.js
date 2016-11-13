var fs = require('fs');

var outputFile = './output.json';
var inputFile = '../configs/config.json';
var obj = require(inputFile);

var flights = {
  depart: {
    airline: null,
    flight: [],
  },

  arrival: {
    airline: null,
    flight: [],
  },

  price: null
}

function setDate(browser) {
  browser.execute(
      function(data) {
        document.getElementById('departure_date').removeAttribute('readonly');
        document.getElementById('departure_date_1').removeAttribute('readonly');
      },[]
  );

  browser.assert.visible('#departure_date')
  .click('#departure_date')
  .setValue('#departure_date', obj.departure_date)
  .assert.visible('#departure_date_1')
  .click('#departure_date_1')
  .setValue('#departure_date_1', obj.return_date);
}

function setDepart(browser) {
  browser.clearValue('input[data-direction=departure]')
  .assert.visible('input[data-direction=departure]')
  .setValue('input[data-direction=departure]', obj.origin)
  .pause(1000)
  .click('#ui-id-1 .ui-menu-item');
}

function setArrival(browser) {
  browser.clearValue('input[data-direction=arrival]')
  .assert.visible('input[data-direction=arrival]')
  .setValue('input[data-direction=arrival]', obj.destination)
  .pause(1000)
  .click('#ui-id-2 .ui-menu-item');
}

function getPrice(browser) {
  browser.getText('.item-block__footer > .price-block', function(result) {
    var price = result.value.replace(/\D/g, '');
    flights.price = price;
  });
}

function getDepart(browser) {
  browser.getText('section.item-block:nth-of-type(1) .segment-block:nth-of-type(1) .ac_name', function(result) {
    var airline = result.value;
    flights.depart.airline = airline;
  })

  .elements('css selector', 'section.item-block:nth-of-type(1) .segment-block:nth-of-type(1) .flight-maininfo ul:nth-child(1) li:nth-of-type(1)', function(result)  {
      result.value.forEach(function(el){
        var id = el.ELEMENT;
        browser.elementIdText(id, function(res){
          var flight =  res.value.replace(/[^\w-]+/g, '');
          flights.depart.flight.push(flight);
        })
      })
  });
}

function getArrival(browser) {
  browser.getText('section.item-block:nth-of-type(1) .segment-block:nth-of-type(2) .ac_name', function(result) {
    var airline = result.value;
    flights.arrival.airline = airline;
  })

  .elements('css selector', 'section.item-block:nth-of-type(1) .segment-block:nth-of-type(2) .flight-maininfo ul:nth-child(1) li:nth-of-type(1)', function(result)  {
      result.value.forEach(function(el){
        var id = el.ELEMENT;
        browser.elementIdText(id, function(res){
          var flight =  res.value.replace(/[^\w-]+/g, '');
          flights.arrival.flight.push(flight);
        })
      })
  })
}

module.exports = {

  //first test
  'Fill input fields of flight' : function (browser) {
    browser.url('https://tickets.ua/')
    .waitForElementVisible('body', 1000)
    .assert.elementPresent('#round_trip[checked]');

    setDepart(browser);
    setArrival(browser);
    setDate(browser);

    browser.click('input[data-action=avia-search_start-search-btn]')

  },

  //second test
  'Get flights data' : function (browser) {
    browser.waitForElementVisible('label[for=UAH]', 17000)
    .click('label[for=UAH]');

    getPrice(browser);
    getDepart(browser);
    getArrival(browser);

    browser.pause(1000)
    .click('body', function() {
      saveData(flights);
    })
    .end()
  }

};

function saveData (data) {
  fs.writeFile(outputFile, JSON.stringify(data, null, 2), function(err) {
    if (err) {
      return console.log('Oh, was some error ' + err);
    }
    console.log('The file was saved!');
  });
}
