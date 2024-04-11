import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Nav from './components/nav.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Nav />
    <App />
  </React.StrictMode>,
)
