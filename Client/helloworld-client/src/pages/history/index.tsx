import inputResultApiClient from "@/features/inputResult/inputResult-api-client";
import { fakeInputResultListData } from "@/features/inputResult/inputResult-fakedata";
import { UserInputResult } from "@/features/inputResult/inputResult-types";
import { MainTable, MyTable } from "@/features/table/table-components";
import { NextPageContext } from "next";

export default function HistoryIndexPage({ res }: { res: UserInputResult[] }) {
  return <MainTable res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: string = context.query?.id as string;
  let res = await inputResultApiClient.get();
  if (res == null || res.length == 0) {
    res = fakeInputResultListData;
  }
  return { props: { res } };
}
