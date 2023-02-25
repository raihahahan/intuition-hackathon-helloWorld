import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import messageConnection from "@/server/socket";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    messageConnection.start((data: string) => {
      setMessages((msgs) => [...msgs, data]);
    });
  }, []);

  const [messages, setMessages] = useState<string[]>([]);

  return (
    <main className={styles.main}>
      <div>
        {messages.map((i) => {
          return <div>{i}</div>;
        })}
      </div>
    </main>
  );
}
