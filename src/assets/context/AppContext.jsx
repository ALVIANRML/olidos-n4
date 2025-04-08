import { createContext, useState } from 'react';

// Create New Contet
const ApplicationContext = createContext();

// Create Provider
const AppContextProvider = ({ children }) => {
  // State Management
  const [collapsed, setCollapsed] = useState(true);
  const [route, setRoute] = useState('dashboard');
  const [userLoged, setUserLoged] = useState(null);
  const [loged, setLoged] = useState(''); //Verify User ID
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);

  // Function
  const handleCollapsedChange = (value) => {
    setCollapsed(!value);
  };
  const handleRouteChange = (key) => {
    setRoute(key);
  };

  // Object
  const contextValue = {
    collapsed,
    route,
    userLoged,
    setUserLoged,
    loged,
    setLoged,
    selectedRowData,
    selectedRowKeys,
    setSelectedRowData,
    setSelectedRowKeys,
    setRoute,

    handleCollapsedChange,
    handleRouteChange,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Create Custome Hook
export const AppContext = ApplicationContext;
export default AppContextProvider;
