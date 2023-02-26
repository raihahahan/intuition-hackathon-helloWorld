// DAL: Data Access Layer

import { pathCombine } from "@/common/utils/api-utils";
import config from "@/config";
import axios from "./axios";
import https from "https";

const WebAPIAxios = axios.create({ baseURL: config.WEBAPI_URL });

abstract class DAL<T> {
  /*
    Patterns:
    - API_URL/input
    - API_URL/result/{id}
    - API_URL/history/{id?}
  */

  protected controller: string;

  constructor(controller: string) {
    this.controller = controller;
  }

  public async get(): Promise<T[]> {
    try {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
      });
      const res = await WebAPIAxios.get<any, T[]>(
        pathCombine("/api", this.controller, "get"),
        { httpsAgent }
      );
      return res.data;
    } catch (error) {
      return [];
    }
  }

  public async getById(id: number): Promise<T> {
    try {
      const endpoint = pathCombine(
        "/api",
        this.controller,
        "get",
        id.toString()
      );
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
      });
      const res = await WebAPIAxios.get<any, T>(endpoint, { httpsAgent });
      return res.data;
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  // public async put<TVal>(id: number, value: TVal): Promise<void> {
  //   try {
  //     const endpoint = pathCombine("/api", this.controller, id.toString());
  //     await axios.put(endpoint, value);
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  public async post(input: T): Promise<T> {
    try {
      const endpoint = pathCombine("/api", this.controller, "create");
      const res = await WebAPIAxios.post(endpoint, input);
      return res.data as T;
    } catch (error) {
      return null as any;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const endpoint = pathCombine(
        "/api",
        this.controller,
        "delete",
        id.toString()
      );
      await WebAPIAxios.delete(endpoint);
    } catch (error) {
      return;
    }
  }

  public async exists(id: number): Promise<boolean> {
    try {
      const res: any = await this.getById(id);
      if (!res || (res?.status as any) == 404 || (res?.status as any) == 400) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default DAL;
