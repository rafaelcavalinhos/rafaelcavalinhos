import '@/styles/globals.css';
import '@/styles/animations.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IntlProvider } from 'next-intl';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IntlProvider locale={pageProps.locale} messages={pageProps.messages}>
        <Component {...pageProps} />
      </IntlProvider>
    </>
  );
}
