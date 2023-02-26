import { Button, ButtonProps } from "@mantine/core";
import { CSSProperties } from "@emotion/serialize";
import { useRouter } from "next/dist/client/router";
import useTheme from "@/features/theme/theme-hooks";

export function SubmitButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  const { siteColors } = useTheme();
  return (
    <Button
      color={siteColors.themeColor}
      size="lg"
      type="submit"
      onClick={onClick}
      loading={loading}
    >
      Submit
    </Button>
  );
}

export default function CommonNavButton({
  text,
  color,
  extraStyles,
  link,
}: {
  text: string;
  color: ButtonProps["color"];
  extraStyles?: CSSProperties;
  link?: string;
}) {
  const router = useRouter();

  return (
    <Button
      style={{ ...(extraStyles as object) }}
      color={color}
      onClick={() => router.push({ pathname: link })}
      variant="filled"
      size="md"
    >
      {text}
    </Button>
  );
}
