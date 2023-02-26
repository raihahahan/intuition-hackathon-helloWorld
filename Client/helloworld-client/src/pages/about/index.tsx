import RectangleTitle from "@/common/components/branding";
import { Divider, Image, Text } from "@mantine/core";
import useTheme, {
  useGlobalMediaQuery,
} from "../../features/theme/theme-hooks";

export default function AboutPage() {
  const { themeState } = useTheme();
  const { lg } = useGlobalMediaQuery();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        marginLeft: 100,
        marginRight: 100,
        maxWidth: "60vw",
      }}
    >
      <RectangleTitle
        widthSize={200}
        type={themeState == "dark" ? "dark" : "default"}
      />
      <br />
      <Text style={{ marginTop: 50 }}>
        Welcome to Stockr.io, your one-stop solution for analyzing stocks.
        Stockr.io is a hackathon project that aims to provide you with the
        necessary tools and insights to make informed decisions when it comes to
        investing in the stock market. Our platform utilizes cutting-edge
        technology to provide you with real-time updates, historical data, and
        market analysis to help you make well-informed decisions about your
        investments.
      </Text>
      <br />
      <Text>
        It's important to note that Stockr.io does not offer financial advice or
        recommend specific investments. Our platform is designed to provide you
        with information and insights to help you make your own decisions. We
        encourage all users to conduct their own research and seek advice from a
        qualified financial advisor before making any investment decisions.
      </Text>
      <br />
      <Text>
        Whether you're a seasoned investor or just starting, Stockr.io is here
        to help you make sense of the stock market and make informed investment
        decisions. Sign up now to get started!
      </Text>
      <Divider />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        Curious on how this works?
      </Text>
      <Image
        src={
          themeState == "dark"
            ? "/images/diagram-dark.png"
            : "/images/diagram-light.png"
        }
      />
      <Text style={{ marginTop: 20 }}>
        <Text>
          1. The moment the user presses "Submit", the Web Client (this website)
          sends a POST request to the Web API (.Net 6)
        </Text>
        <Text style={{ marginTop: 20 }}>
          2. This backend then sends the request to a pending queue in RabbitMQ
          message queue.
        </Text>
        <Text style={{ marginTop: 20 }}>
          3. Our Python NLP library listens to this queue in the backgroun and
          processes the stock symbol. It then passes the output to the
          InputResultQueue.
        </Text>
        <Text style={{ marginTop: 20 }}>
          4. Finally, with SignalR as our web socket between the web client and
          the final InputResultQueue, the user receives the final output once
          the Python bot has finished analysing.
        </Text>
      </Text>
      <Divider />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        Still want to know more?
      </Text>
      <Text>
        Head to our{" "}
        <a
          href={"https://github.com/raihahahan/intuition-hackathon-helloWorld"}
          target="_blank"
          style={{ color: themeState == "dark" ? "cyan" : "blue" }}
        >
          Github repository
        </a>{" "}
        to see the source code and how the different microservices work
        together. Thanks for reading till this far!
      </Text>
    </div>
  );
}
