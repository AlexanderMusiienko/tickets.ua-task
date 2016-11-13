# tickets.ua-task
Data scraper for *tickets.ua* powered by testing framework [Nightwatch.js](http://nightwatchjs.org/). It uses the [Selenium WebDriver API](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol).

### Install
For getting started you need:

- [selenium-standalone](https://www.npmjs.com/package/selenium-standalone).
- [Nightwatch.js](http://nightwatchjs.org/getingstarted)

### Run
Before run the scraper, fill **config.json** as you like.
Example:
```js
{
    "origin": "Киев",
    "destination": "Барселона",
    "departure_date": "01.01.2017",
    "return_date": "08.01.2017",
    "currencyCode": "UAH"
}
```
Start firefox, chrome, internet explorer or phantomjs for scraper:
```sh
$ selenium-standalone start
```

Run scraper:
```sh
$ npm start
```
