export interface UserInput extends UserInputDto {
  id: number;
  createdOn: Date;
}

export interface UserInputDto {
  tickerSymbol: string;
}
