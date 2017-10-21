__author__ = 'johnphilmurray'
from csv import reader
from json import dumps

json_file_name = 'src/app/marketcaps.json'
csv_file_name = 'constituents-financials.csv'

# opens the csv file and reads it in as a 2 dimensional list
csv_file = open(csv_file_name)
csv_file_reader = list(reader(csv_file, delimiter=','))

#assumes first line of csv is a list of column names
header_row = csv_file_reader[0]
for i in range(0,len(header_row)):
    if header_row[i].upper() == "SYMBOL":
        # assumes there is a column called "Symbol" containing the stock symbol,
        # and marks the location of this row
        symbol_col = i

    elif header_row[i].upper() == "MARKET CAP":
        # assumes there is a column called "Market Cap" containing the
        # market cap for the stock, and marks the location of this row
        market_cap_row = i

# converts the remaining rows to a dictionary mapping sybol to market cap,
# indexing market cap and symbol based on row locations extracted from the
# header
market_cap_dict = {}
for row in csv_file_reader[1:-1]:
    market_cap = row[market_cap_row]
    symbol = row[symbol_col]
    if (market_cap == ""):
        market_cap_dict[symbol] = 0.0
    else:
        market_cap_dict[symbol] = float(market_cap)
    

csv_file.close()

# write the resulting market cap dictionary to a json file
json_file = open(json_file_name, "w")
# newlines are added after each comma for readability
json_file.write(dumps(market_cap_dict).replace(',', ",\n"))
json_file.close()
