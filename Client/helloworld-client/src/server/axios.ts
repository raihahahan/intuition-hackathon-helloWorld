import axios from "axios";
import https from "https";
import fs from "fs";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
});
const _axios = axios.create({ httpsAgent });
export default axios;
