// pages/_app.tsx
import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Tailwind via CDN for immediate styling */}
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

