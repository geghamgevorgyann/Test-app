import { useEffect } from "react";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { initGA, logPageView } from "./lib/analytics";
import { useRouter } from "next/router";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    initGA();
    logPageView();

    const handleRouteChange = () => {
      logPageView();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
