import { SubmitButton } from "@/common/components/buttons";
import config from "@/config";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import { MarketSymbolsDropdown } from "../market/market-components";
import { useAutocompleteSearchSymbols } from "../market/market-hooks";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";
import { handleTickerFormSubmit } from "./input-api-client";
import { instructionsData } from "./input-data";
import { inputConfig, InstructionCardProps } from "./input-types";

export function InputPageComponents() {
  const { onChangeText, search, autocomplete } = useAutocompleteSearchSymbols();
  const form = useForm({
    initialValues: {
      ticker: search,
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20vh",
      }}
    >
      <>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form
            onSubmit={form.onSubmit(async (_) => {
              if (search.length <= 0) {
                alert("Please insert a valid symbol.");
                return;
              }
              await handleTickerFormSubmit(search, (id) =>
                router.push(`/result/${id}/loading`)
              );
            })}
          >
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>
              {config.CREATE_INDEX_TITLE}
            </Text>
            <MarketSymbolsDropdown
              onChangeText={onChangeText}
              search={search}
              autocomplete={autocomplete}
            />
            <SubmitButton
              loading={loading}
              onClick={() => (search.length > 0 ? setLoading(true) : null)}
            />
          </form>
        </Box>
        {/* <div style={{ height: 100 }} />
        <InstructionCardGrid /> */}
      </>
    </div>
  );
}

function InstructionCardGrid() {
  return (
    <Grid
      gutter="lg"
      align="stretch"
      style={{ margin: 10, maxWidth: breakpoints.md + 100 }}
    >
      {instructionsData.map((item) => {
        return (
          <Grid.Col
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            key={item.title}
            sm={6}
            lg={4}
          >
            <InstructionCard item={item} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}

export function InstructionCard({ item }: { item: InstructionCardProps }) {
  const { siteColors, colorTheme, themeState } = useTheme();
  const router = useRouter();
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        marginTop: 10,
        minHeight: "20vw",
        width: "90vw",
        backgroundColor: colorTheme.surface,
        borderWidth: 0,
      }}
    >
      <Card.Section>
        <Image
          src={
            item.imgSrc ??
            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          }
          height={160}
          alt="instructions"
        />
      </Card.Section>

      <Group
        position="apart"
        mt="md"
        mb="xs"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Text
          weight={"bolder"}
          style={{
            display: "flex",
            justifySelf: "center",
            fontSize: 16,
            marginTop: 10,
            textAlign: "center",
            color: siteColors.text.primary,
          }}
        >
          {item.title}
        </Text>
      </Group>

      <br />
      <div
        style={{
          color: siteColors.text.primary,
          fontSize: "1em",
          marginBottom: 10,
        }}
      >
        {item.description}
      </div>

      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      ></div>
    </Card>
  );
}
