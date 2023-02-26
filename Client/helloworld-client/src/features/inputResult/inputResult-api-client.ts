import config from "@/config";
import DAL from "@/server/api-client";
import { UserInputResult, UserInputResultDto } from "./inputResult-types";

class InputResultApiClient extends DAL<UserInputResult | UserInputResultDto> {
  constructor() {
    super(config.WEBAPI_CONTROLLER_RESULT);
  }
}

const inputResultApiClient = new InputResultApiClient();
export default inputResultApiClient;
