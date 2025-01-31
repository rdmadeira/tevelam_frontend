import React from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './components/Main.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
          <Main />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
