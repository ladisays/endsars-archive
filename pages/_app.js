// Start FontAwesome icon imports.
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// End FontAwesome icon imports.
import '../styles/globals.sass';

// Add all fontawesome icons to the library for use.
config.autoAddCss = false;
library.add(fas, far);

const AppRoot = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default AppRoot;
