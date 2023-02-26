import * as signalR from "@microsoft/signalr";
import CONFIG from "../config";

class SocketConnection {
  private connection;
  private topics: string[] = [];
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(CONFIG.INPUT_RESULT_HUB, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  async start(onReceiveMessage: (data: string) => void) {
    try {
      if (this.connection.state != signalR.HubConnectionState.Connected) {
        await this.connection.start();
        console.log("connection start");
        this.connection.on(CONFIG.SIGNALR_CLIENT_METHOD, onReceiveMessage);
      }
    } catch (error) {
      console.log("error loaded" + error);
      setTimeout(this.start, 5000);
    }
  }

  async stop() {
    this.connection.off(CONFIG.SIGNALR_CLIENT_METHOD);
  }
}

const messageConnection = new SocketConnection();
export default messageConnection;
