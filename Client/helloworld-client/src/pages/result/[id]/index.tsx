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
import { Text } from "@mantine/core";
import { fakeDataInputResult } from "@/features/inputResult/inputResult-fakedata";
import { BuyOrSellLevel } from "@/features/inputResult/inputResult-components";
import CommonNavButton from "@/common/components/buttons";

export default function ResultIndexPage({ res }: { res: UserInputResult }) {
  console.log(JSON.stringify(res));
  const { siteColors, colorTheme } = useTheme();
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
        {res.userInput?.tickerSymbol}
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
        Result: {res.buyOrSell < 50 ? "SELL" : "BUY"}
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
