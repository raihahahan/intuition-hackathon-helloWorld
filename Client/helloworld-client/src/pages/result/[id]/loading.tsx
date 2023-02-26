import { Text } from "@mantine/core";
import Lottie from "react-lottie";
import * as animationData from "../../../features/input/searching-blue.json";
import { useEffect } from "react";
import messageConnection from "@/server/socket";
import { useRouter } from "next/router";
import inputResultApiClient from "@/features/inputResult/inputResult-api-client";
export default function LoadingPage() {
  const router = useRouter();
  useEffect(() => {
    messageConnection.start((data) => {
      console.log(data);
      inputResultApiClient.post(JSON.parse(data));
      router.push(`/result/${router.query?.id}`);
    });
    // setTimeout(() => {
    //   router.push(`/result/${router.query?.id}`);
    // }, 5000);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Lottie
        options={{ animationData }}
        height={400}
        width={400}
        style={{ marginTop: 20 }}
        isClickToPauseDisabled
      />
      <Text style={{ fontSize: 20 }}>
        Please wait while we collect and analyse the data...
      </Text>
    </div>
  );
}
