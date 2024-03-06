import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClockApp } from './ClockApp'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClockApp />
  </React.StrictMode>,
)
