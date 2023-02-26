from telegram.ext import *
import os
from dotenv import load_dotenv
import responses
import get_csv
import time
from main_copy import *

all_tickers = get_csv.all_tickers
top_tickers = get_csv.top_tickers

load_dotenv()

API_KEY = os.getenv("API_KEY")

print("Bot started...")

def start_command(update, context):
    update.message.reply_text("Welcome to the stockriobot! Enter a ticker symbol to begin")

def help_command(update, context):
    update.message.reply_text("Please see the list of commands if you need help with something")

def list_command(update, context):
    update.message.reply_text('Please hold on while we are querying the list')
    return_string = "Here are the top 10 trending tickers symbols you can look into:\n"
    for i, key in enumerate(top_tickers):
        return_string += f"\n{i+1}. {top_tickers[key]} ({key})"
    update.message.reply_text(return_string)

def custom_command(update, context):
    update.message.reply_text('This is a custom command!')


def handle_response(text: str):
    pass


def handle_message(update, context):
    message_type = update.message.chat.type
    text=update.message.text
    response = ""

    if text.upper() in all_tickers: 
        update.message.reply_text(f"Returning data for {all_tickers[text.upper()]} in a moment...")
        #time.sleep(3)
        score, articles = get_sentiment(text.upper())


        if -0.25 <=score<= 0.25:
            return_string = "Hold!\n"
        elif score < -0.25:
            return_string = "Sell!\n"
        else:
            return_string = "Buy!\n"   

        return_string += "\nHere are some articles about the stock\n"
        for article in articles:
            return_string += f"\n{article['title']}\n {article['description']}"

        update.message.reply_text(return_string)

    else:
        response = f"Sorry the ticker symbol {text.upper()} does not exist!"
        update.message.reply_text(response)
        
    
    

def error(update, context):
    print(f"Update {update} caused error {context.error}")

if __name__ == "__main__":

    ticker_queue = [] 
    updater = Updater(API_KEY, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start_command))
    dp.add_handler(CommandHandler("help", help_command))
    dp.add_handler(CommandHandler("custom", custom_command))
    dp.add_handler(CommandHandler("list", list_command))

    dp.add_handler(MessageHandler(Filters.text, handle_message))

    dp.add_error_handler(error)

    updater.start_polling(1)
    updater.idle()


