import config from "@/config";
import DAL from "@/server/api-client";
import { UserInput, UserInputDto } from "./input-types";

export async function handleTickerFormSubmit(
  ticker: string,
  callback: (id: number) => void
): Promise<boolean> {
  const userInputDto: UserInputDto = { tickerSymbol: ticker };
  const res = (await inputApi.post(userInputDto)) as UserInput;
  callback(res?.id);
  return true;
}

class InputApi extends DAL<UserInput | UserInputDto> {
  constructor() {
    super(config.WEBAPI_CONTROLLER_INPUT);
  }
}

const inputApi = new InputApi();
export default inputApi;
