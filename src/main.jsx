import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './utils/eventListenerFixes.js'
import { initGA } from './lib/analytics'

// Inicializar Google Analytics
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaMeasurementId) {
  initGA(gaMeasurementId);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
