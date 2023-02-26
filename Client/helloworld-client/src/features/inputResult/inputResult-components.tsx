import useTheme from "../theme/theme-hooks";
import dynamic from "next/dynamic";
import { Progress } from "@mantine/core";

export function BuyOrSellLevel({ value }: { value: number }) {
  const { siteColors } = useTheme();

  return (
    <Progress
      size="xl"
      value={value * 100}
      label={Math.round(value * 100) + "%"}
    />
  );
}
