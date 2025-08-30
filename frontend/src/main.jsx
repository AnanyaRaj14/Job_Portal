import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { CookiesProvider } from 'react-cookie'

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <CookiesProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </CookiesProvider>
    </Provider>
    <Toaster />
  </>,
)
