import Player from "@components/Player/Player";
import "@styles/globals.scss";
import TrackProvider from "contexts/TrackContext/TrackContext";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TrackProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Player />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </TrackProvider>
    </QueryClientProvider>
  );
}
