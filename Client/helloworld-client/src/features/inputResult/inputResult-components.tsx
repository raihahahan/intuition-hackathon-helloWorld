import useTheme from "../theme/theme-hooks";
import dynamic from "next/dynamic";
import { Progress } from "@mantine/core";

export function BuyOrSellLevel({ value }: { value: number }) {
  const { siteColors } = useTheme();
  const val = ((value + 1) / 2) * 100;
  return <Progress size="xl" value={val} label={Math.round(val) + "%"} />;
}
