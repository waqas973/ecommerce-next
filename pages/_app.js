import { useEffect } from "react";
import { StoreProvider } from "../utils/Store";
import NProgress from "nprogress";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // useEffect(() => {
  const handleRouteStart = () => NProgress.start();
  const handleRouteDone = () => NProgress.done();
  router.events.on("routeChangeStart", handleRouteStart);
  router.events.on("routeChangeComplete", handleRouteDone);
  router.events.on("routeChangeError", handleRouteDone);

  //   return () => {
  //     // Make sure to remove the event handler on unmount!
  //     router.events.off("routeChangeStart", handleRouteStart);
  //     router.events.off("routeChangeComplete", handleRouteDone);
  //     router.events.off("routeChangeError", handleRouteDone);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}