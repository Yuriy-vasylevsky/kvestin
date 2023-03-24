import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './Components/Loading/Loading';
import App from './App';
import './index.js';
import './firebase';
import { store, persistor } from './redux/store';
import React, { Suspense } from 'react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <App />
          </PersistGate>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
