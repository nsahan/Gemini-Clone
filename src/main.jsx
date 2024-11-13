import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvicer from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvicer>
    <App />
  </ContextProvicer>,
)
