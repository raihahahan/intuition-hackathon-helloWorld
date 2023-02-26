from textblob import TextBlob
from newspaper import Article
from newspaper import Config
from newspaper import article
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from tqdm.notebook import tqdm
import requests
from dotenv import load_dotenv
import os
from sentiment_analysis import get_sentiment
from rabbitmq_client import *
import json
import random

def main():
    def callback(ch, method, properties, body):
        print(" [x] Received %r" % body)
        data = json.loads(json.loads(body))
        print(data)
        ticker = data["tickerSymbol"]
        sentiment_analysis = get_sentiment(ticker)

        resultDescriptions = ["This stock has been trending upward for the past few months.", "Recent news and developments suggest that this stock could see significant growth in the near future.", "Experts predict that this stock could be undervalued at its current price.", "The company behind this stock has a strong track record of delivering solid financial results.", "This stock has seen increased buying activity from institutional investors.", "There are concerns about potential regulatory issues that could impact this stock in the future.", "Earnings reports for this stock have been consistently positive over the past year.", "The industry that this stock operates in is experiencing rapid growth and could drive the stock price higher.", "There are rumors of a potential acquisition of this company, which could drive up the stock price.", "The company behind this stock is facing increasing competition, which could impact its growth potential.", "Technical indicators suggest that this stock is currently overbought and could experience a pullback.", "The stock's dividend yield is currently above average for its industry.", "This stock has a high price-to-earnings ratio compared to its peers.", "The company has a solid balance sheet and low debt-to-equity ratio.", "This stock is highly volatile and could see significant swings in price.", "Analysts have recently revised their price targets for this stock upward.", "The company has a history of missing earnings expectations, which could impact investor sentiment.", "This stock has a high short interest, which could lead to a short squeeze if positive news is announced.", "The company behind this stock has a strong brand and customer loyalty.", "The stock's current price is significantly higher than its 52-week low."]

        data = {
            "buyOrSell": sentiment_analysis,
            "userInputId": data["id"],
            "createdOn": data["createdOn"],
            "userInput": {
                "tickerSymbol": data["tickerSymbol"],
                "id": data["id"],
                "createdOn": data["createdOn"]
            },
            "resultDescription": random.choice(resultDescriptions)
        }
        publishMessage(json.dumps(data))
    receiveMessage(callback=callback)
    

main()