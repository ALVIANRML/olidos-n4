import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dashboard from './page/dashboard/Dashboard';
import Login from './page/Login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppContextProvider from './assets/context/AppContext';
import { Spin } from 'antd';

function App() {
  const [authenticated, setAuthenticated] = useState(true); // Ubah ke false biar test login
  const [loading, setLoading] = useState(false);

  const handleDataFormLogin = (authStatus, loadingStatus) => {
    setAuthenticated(authStatus);
    setLoading(loadingStatus);
  };

  return (
    <AppContextProvider>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "#0000001a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
          <p style={{ marginLeft: 20 }}>Memuat...</p>
        </div>
      ) : authenticated ? (
        <Dashboard />
      ) : (
        <Login onStatus={handleDataFormLogin} />
      )}
    </AppContextProvider>
  );
}

// Force body & root to full screen size
document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.height = "100vh";
document.body.style.width = "100vw";

const rootElement = document.getElementById('root');
rootElement.style.height = "100vh";
rootElement.style.width = "100vw";
rootElement.style.margin = "0";
rootElement.style.padding = "0";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
