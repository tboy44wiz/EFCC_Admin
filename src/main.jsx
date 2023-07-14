import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import App from './App.jsx'
import './index.css'

/*==== Importing AppStore ====*/
import appStore from "./redux/stores/AppStore.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={appStore}>
          <App />
      </Provider>
  </React.StrictMode>,
)
