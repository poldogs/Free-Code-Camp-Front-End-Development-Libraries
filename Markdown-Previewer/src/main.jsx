import React from 'react'
import ReactDOM from 'react-dom'
import { MarkdownPreviewerApp } from './MarkdownPreviewerApp'
import './styles/main.scss'

ReactDOM.render(
  <React.StrictMode>
    <MarkdownPreviewerApp />
  </React.StrictMode>,
  document.getElementById('root')
)