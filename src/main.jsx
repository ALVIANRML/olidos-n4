import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './page/dashboard/Dashboard';
import Login from './page/Login'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Login /> */}
    <Dashboard/>
  </StrictMode>,
)
