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

load_dotenv()



API_KEY = os.getenv("API_KEY")
#nltk.download('vader_lexicon')
#nltk.download('punkt')

sia = SentimentIntensityAnalyzer()

def get_sentiment(keyword):

    news_params = {
        "q": keyword,
        "apiKey": API_KEY,
    }


    news_response = requests.get(url=f"https://newsapi.org/v2/everything", params=news_params)
    news_data = news_response.json()
    latest_news = [{"title": news["title"],
                    "description": news["description"]} for news in news_data["articles"][0:10]]

    #print(latest_news)

    sentiment_scores = []

    for news in latest_news:
        news_description = news["description"]
        sentiment = sia.polarity_scores(news_description)
        #blob = TextBlob(news_description)
        #sentiment = blob.sentiment.polarity
        sentiment_scores.append(sentiment)


    if not sentiment_scores:
        return "No articles available"
    

    average_score = sum([score["compound"] for score in sentiment_scores])/len(sentiment_scores)


    print(average_score)
    return [average_score, latest_news[:3]]

#get_sentiment("TSLA")
