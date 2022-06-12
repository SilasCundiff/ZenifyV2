import React from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ParticleComponent from "../components/Particles";

import "../styles/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ParticleComponent />
    </SessionProvider>
  );
}

export default MyApp;
