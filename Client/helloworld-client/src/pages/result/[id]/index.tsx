import {
  OrderEnum,
  UserInputResult,
  UserInputResultDto,
} from "@/features/inputResult/inputResult-types";
import messageConnection from "@/server/socket";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import inputResultApiClient from "@/features/inputResult/inputResult-api-client";
import { NextPageContext } from "next/types";
import useTheme from "@/features/theme/theme-hooks";
import Lottie from "react-lottie";
import * as animationData from "../../../features/input/searching-blue.json";
import { Button, Text } from "@mantine/core";
import { fakeDataInputResult } from "@/features/inputResult/inputResult-fakedata";
import { BuyOrSellLevel } from "@/features/inputResult/inputResult-components";
import CommonNavButton from "@/common/components/buttons";
import { summary } from "@/features/market/market-data";

export default function ResultIndexPage({ res }: { res: UserInputResult }) {
  console.log(JSON.stringify(res));
  const [readMore, setReadMore] = useState(false);
  const { siteColors, colorTheme } = useTheme();
  const val = ((res.buyOrSell + 1) / 2) * 100;
  return (
    <div
      style={{
        width: "60vw",
        marginTop: 10,
        // display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Text
        size="xl"
        style={{
          fontWeight: "bold",
          fontSize: 40,
          alignSelf: "center",
          marginBottom: 30,
        }}
      >
        {res.userInput?.tickerSymbol?.toUpperCase()}
      </Text>
      <Text
        size="xl"
        style={{
          fontWeight: "bold",
          fontSize: 26,
          alignSelf: "center",
          marginBottom: 30,
        }}
      >
        Result:{" "}
        {val >= 40 && val <= 60 ? "HOLD" : res.buyOrSell < 0 ? "SELL" : "BUY"}
      </Text>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          size="xl"
          style={{
            fontWeight: "lighter",
            fontSize: 20,
            alignSelf: "flex-start",
          }}
        >
          SELL
        </Text>
        <Text
          size="xl"
          style={{ fontWeight: "lighter", fontSize: 20, alignSelf: "flex-end" }}
        >
          BUY
        </Text>
      </div>
      <BuyOrSellLevel value={res.buyOrSell} />
      <br />
      <Text>{res.resultDescription}</Text>
      {res.userInput?.tickerSymbol?.toUpperCase() in summary ? (
        <div>
          {readMore && (
            <Text style={{ marginTop: 30 }}>
              {
                summary[
                  res.userInput?.tickerSymbol?.toUpperCase() as
                    | "AAPL"
                    | "MSFT"
                    | "META"
                ]
              }
            </Text>
          )}
          <Button
            style={{ marginLeft: -20 }}
            variant="subtle"
            onClick={() => setReadMore((i) => !i)}
          >
            Show {readMore ? "less" : "more"}...
          </Button>
        </div>
      ) : null}
      <CommonNavButton
        extraStyles={{ marginTop: 40, marginBottom: 20 }}
        text="Try another symbol"
        color={siteColors.themeColor}
        link="/"
      />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const id: string = context.query?.id as string;
  const res = await inputResultApiClient.getById(+id);

  return {
    props: {
      res: res,
    }, // will be passed to the page component as props
  };
}
