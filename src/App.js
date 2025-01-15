import React from 'react';
import { Provider } from 'react-redux';

import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer">
              Learn React
            </a>
          </header>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
