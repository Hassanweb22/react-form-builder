import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <CookiesProvider>
      <App />
      <Toaster position="bottom-center" />
    </CookiesProvider>

  </React.StrictMode>,
)
