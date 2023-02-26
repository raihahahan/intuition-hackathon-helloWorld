import { Autocomplete } from "@mantine/core";

export function MarketSymbolsDropdown({
  onChangeText,
  search,
  autocomplete,
}: {
  onChangeText: (text: string) => void;
  search: string;
  autocomplete: string[];
}) {
  return (
    <Autocomplete
      size="lg"
      placeholder={"Pick a symbol"}
      data={autocomplete}
      value={search}
      onChange={onChangeText}
      style={{ marginTop: 20, marginBottom: 20 }}
    />
  );
}
