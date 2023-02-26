export interface UserInput extends UserInputDto {
  id: number;
  createdOn: Date;
}

export interface UserInputDto {
  tickerSymbol: string;
}

export const inputConfig = {
  searchPlaceHolder: "Pick a ticker symbol",
  label: "Ticker symbol",
};

export type InstructionCardProps = {
  title: string;
  description: string;
  imgSrc?: string;
};
