
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import store from "./store/store.js";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}> 
      <App />
     <Toaster />
    </Provider>
  </BrowserRouter>
)

/* <Provider store={store}>
      <App />
      <Toaster />
    </Provider>*/
