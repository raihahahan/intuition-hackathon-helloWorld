import { UserInput } from "../input/input-types";

export interface KeywordToCount {
  id: number;
  keyword: string;
  count: number;
  order: OrderEnum;
  userInputResultId: number;
  userInputResult: UserInputResult;
}

export interface UserInputResult extends UserInputResultDto {
  id: number;
  createdOn: Date;
  userInput: UserInput;
}

export interface UserInputResultDto {
  resultDescription: string;
  buyOrSell: number;
  //keywordToCount: KeywordToCount[];
  userInputId: number;
}

export enum OrderEnum {
  Buy,
  Sell,
}
