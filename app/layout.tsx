import { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import { getServerSession } from "next-auth";
import PageWrapper from "../components/Layout/PageWrapper";
import ParticlesComponent from "../components/Particles";
import Provider from "./context/client-provider";
import { authOptions } from "../lib/authOptions";

import "./global.css";

const natoSansDisplay = Noto_Sans_Display({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Zenify",
  description:
    "Zenify is a music player for Spotify with a built-in particle audio visualizer.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${natoSansDisplay.className}`}>
        <Provider session={session}>
          <ParticlesComponent />
          <PageWrapper>{children}</PageWrapper>
        </Provider>
      </body>
    </html>
  );
}
