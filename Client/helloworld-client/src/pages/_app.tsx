import SiteLayout, { siteTitle } from "@/features/site/site-layout";
import { routes } from "@/features/site/site-types";
import { makeSiteTitle, siteTitleNames } from "@/features/site/site-utils";
import { ReduxProvider } from "@/redux/store";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const route = useRouter();
  const [_siteTitle, setSiteTitle] = useState(siteTitle);

  useEffect(() => {
    setSiteTitle(makeSiteTitle(siteTitleNames[route.pathname as routes]));
  }, [route.pathname]);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <ReduxProvider>
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ReduxProvider>
      </MantineProvider>
    </>
  );
}
