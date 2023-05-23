import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Options'
import AppContainer from '../UI/AppContainer'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <AppContainer>
      <App />
    </AppContainer>
  </React.StrictMode>,
)
