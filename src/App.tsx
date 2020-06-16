import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import configureStore from './store/configureStore';
import AuthContext from './context/auth';
import auth from './services/auth';

const store = configureStore();

function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    const token = await auth.getJwt();

    if (!token) {
      return;
    }

    setUser(auth.getCurrentUser());
  };

  useEffect(() => {
    restoreToken();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className='text-center'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user, setUser }}>
        <div className='App'>{user ? <Dashboard /> : <Login />}</div>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
