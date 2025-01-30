import React from 'react';
import { Provider } from 'react-redux';

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
        <Main />
      </PersistGate>
    </Provider>
  );
}

export default App;
