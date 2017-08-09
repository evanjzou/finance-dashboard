exports.companies = [
    //TECH SECTOR
    'ACN',
    'ATVI',
    'ADBE',
    'AMD',
    'AKAM',
    'ADS',
    'GOOGL',
    'GOOG',
    'APH',
    'ADI',
    'ANSS',
    'AAPL',
    'AMAT',
    'ADSK',
    'ADP',
    'AVGO',
    'CA',
    'CSCO',
    'CTXS',
    'CTSH',
    'GLW',
    'CSRA',
    'DXC',
    'EBAY',
    'EA',
    'FFIV',
    'FB',
    'FIS',
    'FISV',
    'FLIR',
    'IT',
    'GPN',
    'HRS',
    'HPE',
    'HPQ',
    'INTC',
    'IBM',
    'INTU',
    'JNPR',
    'KLAC',
    'LRCX',
    'MA',
    'MCHP',
    'MU',
    'MSFT',
    'MSI',
    'NTAP',
    'NVDA',
    'ORCL',
    'PAYX',
    'PYPL',
    'QRVO',
    'QCOM',
    'RHT',
    'CRM',
    'STX',
    'SWKS',
    'SYMC',
    'SNPS',
    'TEL',
    'TXN',
    'TSS',
    'VRSN',
    'V',
    'WDC',
    'WU',
    'XLNX',
    'XRX'
]

exports.financeCompanies =[
    // FINANCIAL SECTOR
    'AMG',
    'AFL',
    'ALL',
    'AXP',
    'AXP',
    'AIG',
    'AMP',
    'AON',
    'AJG',
    'AIZ',
    'BAC',
    'BBT',
    'BRK-B',
    'BLK',
    'HRB',
    'COF',
    'CBOE',
    'SCHW',
    'CB',
    'CINF',
    'C',
    'CFG',
    'CME',
    'CMA',
    'DFS',
    'ETFC',
    'FITB',
    'BEN',
    'GS',
    'HIG',
    'HBAN',
    'ICE',
    'IVZ',
    'JPM',
    'KEY',
    'LUK',
    'LNC',
    'L',
    'MTB',
    'MMC',
    'MET',
    'MCO',
    'MS',
    'NDAQ',
    'NAVI',
    'NTRS',
    'PBCT',
    'PNC',
    'PFG',
    'PGR',
    'PRU',
    'RF',
    'SPGI',
    'STT',
    'STI',
    'SYF',
    'TROW',
    'BK',
    'TRV',
    'TMK',
    'USB',
    'UNM',
    'WFC',
    'WLTW',
    'XL',
    'ZION'
    //END FINANCIAL SECTOR
]







/*
exports.sectorLookup = {
    'ACN' : "TECH",
    'ATVI':"TECH",
    'ADBE' : "TECH",
    'AMD' : "TECH",
    'AKAM' : "TECH",
    'ADS': "TECH",
    'GOOGL': "TECH",
    'GOOG': "TECH",
    'APH': "TECH",
    'ADI': "TECH",
    'ANSS': "TECH",
    'AAPL': "TECH",
    'AMAT': "TECH",
    'ADSK': "TECH",
    'ADP': "TECH",
    'AVGO': "TECH",
    'CA': "TECH",
    'CSCO': "TECH",
    'CTXS': "TECH",
    'CTSH': "TECH",
    'GLW': "TECH",
    'CSRA': "TECH",
    'DXC': "TECH",
    'EBAY': "TECH",
    'EA': "TECH",
    'FFIV': "TECH",
    'FB': "TECH",
    'FIS': "TECH",
    'FISV': "TECH",
    'FLIR': "TECH",
    'IT': "TECH",
    'GPN': "TECH",
    'HRS': "TECH",
    'HPE': "TECH",
    'HPQ': "TECH",
    'INTC': "TECH",
    'IBM': "TECH",
    'INTU': "TECH",
    'JNPR': "TECH",
    'KLAC': "TECH",
    'LRCX': "TECH",
    'MA': "TECH",
    'MCHP': "TECH",
    'MU': "TECH",
    'MSFT': "TECH",
    'MSI': "TECH",
    'NTAP': "TECH",
    'NVDA': "TECH",
    'ORCL': "TECH",
    'PAYX': "TECH",
    'PYPL': "TECH",
    'QRVO': "TECH",
    'QCOM': "TECH",
    'RHT': "TECH",
    'CRM': "TECH",
    'STX': "TECH",
    'SWKS': "TECH",
    'SYMC': "TECH",
    'SNPS': "TECH",
    'TEL': "TECH",
    'TXN': "TECH",
    'TSS': "TECH",
    'VRSN': "TECH",
    'V': "TECH",
    'WDC': "TECH",
    'WU': "TECH",
    'XLNX': "TECH",
    'XRX': "TECH"
}
*/


//INITIALIZING COMPANIES IN TECH SECTOR
/* var sectors = {};

for(var i =0; i <exports.companies.length; i++) {
    sectors[exports.companies[i]] = 'TECH';
}
*/
exports.sectorLookup ={}
for(var i =0; i <exports.companies.length; i++) {
    exports.sectorLookup[exports.companies[i]] = 'TECH';
}

//INITIALIZING COMPANIES IN FINANCIAL SECTOR


for(var i =0; i <exports.financeCompanies.length; i++) {
    exports.sectorLookup[exports.financeCompanies[i]] = 'FINA';
}







//for loop goes here
//test dashboard
var keys = Object.keys(exports.sectorLookup)
 console.log(keys);

 for (var i = 0; i < keys.length; i++) {
     console.log(exports.sectorLookup[keys[i]]);
 }
    
