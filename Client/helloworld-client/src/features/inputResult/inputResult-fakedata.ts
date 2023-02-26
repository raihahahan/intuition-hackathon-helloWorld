import { UserInputResult } from "./inputResult-types";

export const fakeDataInputResult: UserInputResult = {
  id: 1,
  createdOn: new Date().toDateString(),
  userInput: {
    id: 1,
    createdOn: new Date().toDateString(),
    tickerSymbol: "AAPL",
  },
  buyOrSell: 0.435,
  userInputId: 1,
  resultDescription: `Apple is a well-established technology company that has been around for over four decades. It is known for its innovative products such as the iPhone, iPad, and MacBook, as well as its strong brand recognition and loyal customer base. Apple's stock has performed well over the years, and it has a history of paying dividends to shareholders.

  In recent years, Apple's financial performance has been strong. Despite the impact of the COVID-19 pandemic, the company has continued to grow its revenue and earnings. Apple's most recent financial results for the fourth quarter of 2021 showed a record quarterly revenue of $83.4 billion, which was up 29% year-over-year.
  
  Apple's success can be attributed to a number of factors, including its ability to innovate and launch new products, its strong brand recognition, and its ability to build a loyal customer base. The company also has a strong balance sheet, with a significant amount of cash on hand and a relatively low level of debt.
  
  However, it's important to remember that investing in the stock market always carries some level of risk, and past performance is not a guarantee of future results. It's also important to conduct your own research and consult with a financial advisor before making any investment decisions.`,
};

export const fakeInputResultListData: UserInputResult[] = [
  {
    id: 1,
    userInput: {
      id: 1,
      tickerSymbol: "AAPL",
      createdOn: "01 January 2022",
    },
    createdOn: "01 January 2022",
  },
  {
    id: 2,
    userInput: {
      id: 2,
      tickerSymbol: "GOOG",
      createdOn: "15 February 2022",
    },
    createdOn: "15 February 2022",
  },
  {
    id: 3,
    userInput: {
      id: 3,
      tickerSymbol: "MSFT",
      createdOn: "28 March 2022",
    },
    createdOn: "28 March 2022",
  },
  {
    id: 4,
    userInput: {
      id: 4,
      tickerSymbol: "AMZN",
      createdOn: "05 April 2022",
    },
    createdOn: "05 April 2022",
  },
  {
    id: 5,
    userInput: {
      id: 5,
      tickerSymbol: "FB",
      createdOn: "30 May 2022",
    },
    createdOn: "30 May 2022",
  },
];
