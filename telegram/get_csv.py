import csv

with open("C:/Users/USER/Documents/Projects/telegram/tickers.csv", "r") as csvfile:
    all_tickers = {}
    lines = csv.reader(csvfile)
    for line in (list(lines))[1:]:
        all_tickers[line[0]] = line[1]

csvfile.close()

top_tickers_list = ["AAPL", "MSFT", "TSLA", "GOOG", "AMZN"]
top_tickers = {ticker: all_tickers[ticker] for ticker in top_tickers_list}
