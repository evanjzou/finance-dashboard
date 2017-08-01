/**
 * This module loads data from alphavantage
 */

const https = require('https');

const TIME_SERIES_BASE_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
const TIME_SERIES_URL_TAIL = '&outputsize=full&apikey=U8DGBF2PDMXR2FZT';
const TIME_SERIES_URL_TAIL_SHORT = '&apikey=U8DGBF2PDMXR2FZT';



function getCurrentPrice(res) {
    //console.log(res["Time Series (Daily)"][res["Meta Data"]["3. Last Refreshed"]]["4. close"])
    return parseFloat(res["Time Series (Daily)"][res["Meta Data"]["3. Last Refreshed"]]["4. close"]);
}

/**
 * Returns { day10Vol: number, day90Vol: number} representing 10 day and 3 month
 * average volumes
 * @param {any} res 
 */
function getVolumeAvgs(res) {
    let data = {
        day10Vol: undefined,
        day90Vol: undefined
    }
    let daysCounted = 0;
    total = 0;
    let current = new Date().toISOString().substring(0, 10);
    current = getNextDayBack(res, current);
    while(daysCounted < 200) {
        total += parseFloat(res["Time Series (Daily)"][current]["5. volume"]);
        daysCounted++;
        try {
            current = getNextDayBack(res, current);
        }
        catch(e) {
            return data;
        }
        if (daysCounted == 10) data.day10Vol = total / 10.0;
        else if (daysCounted == 90) data.day90Vol = total / 100.0;
    }
    return data;
}

function fiveDayPercentChange(res) {
    let fiveDaysAgo = (new Date()).toISOString().substring(0, 10); //Initial
    for (let i = 0; i < 5; i++) {
        fiveDaysAgo = getNextDayBack(res, fiveDaysAgo);
    }
    return ((getCurrentPrice(res) - 
        parseFloat(res["Time Series (Daily)"][fiveDaysAgo]["4. close"])) / 
            parseFloat(res["Time Series (Daily)"][fiveDaysAgo]["4. close"])) * 100;
}

/**
 * Returns 50, 100, and 200 day moving average if enough data is available
 * Fields may be undefined if not enough data is available
 * @param {*} res 
 */
function getMovingAverages(res) {
    let daysCounted = 0;
    let data = {
        mavg_50: undefined,
        mavg_100: undefined,
        mavg_200: undefined
    }
    total = 0;
    let current = new Date().toISOString().substring(0, 10);
    current = getNextDayBack(res, current);
    while(daysCounted < 200) {
        total += parseFloat(res["Time Series (Daily)"][current]["4. close"]);
        daysCounted++;
        try {
            current = getNextDayBack(res, current);
        }
        catch(e) {
            return data;
        }
        if (daysCounted == 50) data.mavg_50 = total / 50.0;
        else if (daysCounted == 100) data.mavg_100 = total / 100.0;
        else if (daysCounted == 200) data.mavg_200 = total / 200.0;
    }
    return data;
}

/**
 * Returns the latest day before [day] that has a data entry
 * @param {*} res 
 * @param {*} day 
 */
function getNextDayBack(res, day) {
    let date = new Date((new Date(day)).getTime() - 86400000);
    let current = date.toISOString().substring(0, 10);
    let timeout = 0;
    while (!res["Time Series (Daily)"].hasOwnProperty(current)) {
            if (timeout > 200) throw 'timeout';
            date = new Date(date.getTime() - 86400000);
            current = date.toISOString().substring(0, 10);
            timeout++;
    }
    return current;
}

/**
 * Runs callback on the JSON output from an https daily series call to
 * AlphaVantage
 * @param {string} [company] the stock ticker of the company (e.g 'GOOG')
 * @param {function} [callback] the callback to run on the resultant JSON
 * @param {function} [onError] the callback to run when an error occurs
 */
exports.avCall = function(company, callback, onError) {
    https.get(TIME_SERIES_BASE_URL + company + TIME_SERIES_URL_TAIL, (res) => {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function() {
            var response = formatRes(JSON.parse(body));
            //console.log(response);
            callback(company, response);
        });
    }).on('error', onError); 
}

function formatRes(res) {
    let {mavg_50, mavg_100, mavg_200} = getMovingAverages(res);
    let {day10Vol, day90Vol} = getVolumeAvgs(res);
    return {
        currentPrice: getCurrentPrice(res),
        mavg50: mavg_50,
        mavg100: mavg_100,
        mavg200: mavg_200,
        tenDayVol: day10Vol,
        threeMVol: day90Vol,
        percentChange5D: fiveDayPercentChange(res)
    }
}

/*function test(res) {
    console.log(fiveDayPercentChange(res));
}
//Testing */
//exports.avCall('GOOG', console.log, console.log); //*/