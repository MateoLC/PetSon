import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CompanionProvider } from './context/CompanionContext.jsx'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CompanionProvider>
        <App />
      </CompanionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
