import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { Router } from 'next/router';
import { AnimatePresence } from 'framer-motion';

NProgress.configure({
  template:
    ' \
  <div class="bar" role="bar" style="background: #A2821A;"> \
    <div class="peg" style="box-shadow: 0 0 10px #A2821A, 0 0 5px #A2821A;"></div> \
  </div> \
  <div class="spinner" role="spinner"> \
    <div class="spinner-icon" style="border-top-color: #A2821A; border-left-color: #705a12;"></div> \
  </div>',
  showSpinner: true,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AnimatePresence exitBeforeEnter initial={true}>
        <Component {...pageProps} />
      </AnimatePresence>
    </SessionProvider>
  );
}
export default MyApp;
