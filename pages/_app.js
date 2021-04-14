// Start FontAwesome icon imports.
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// End FontAwesome icon imports.

import Alerts from 'components/Alert';
import Layout from 'components/Layouts/Layout';
import { AuthProvider } from 'contexts/auth';
import { AlertsProvider } from 'contexts/alerts';
import 'styles/globals.sass';

// Add all fontawesome icons to the library for use.
config.autoAddCss = false;
library.add(fas, far);

const Noop = (page) => page;

const AppRoot = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || Noop;

  return (
    <AlertsProvider>
      <AuthProvider>
        <Alerts />
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </AuthProvider>
    </AlertsProvider>
  );
};

export default AppRoot;
