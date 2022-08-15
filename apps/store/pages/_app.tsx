import { AppProps } from 'next/app';
import Head from 'next/head';
// import './styles.css';
import 'tailwindcss/tailwind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={true}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Welcome to store!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default CustomApp;
