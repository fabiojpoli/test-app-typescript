import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadUsers, getAllUsers } from '../store/users';
import { getUser } from '../store/auth';
import AuthContext from '../context/auth';
import auth from '../services/auth';

function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  // const user = useSelector(getUser);
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    auth.logout();
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <div className='container'>
      <div className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 mr-0 px-3' href='#'>
          Dashboard
        </a>
        <ul className='navbar-nav px-3'>
          <li className='nav-item text-nowrap'>
            <a className='nav-link' href='#'>
              {user && user.name}
            </a>
          </li>
          <li className='nav-item text-nowrap'>
            <a className='nav-link' href='#' onClick={handleLogout}>
              Log out
            </a>
          </li>
        </ul>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <nav className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
            <div className='sidebar-sticky pt-3'>
              <ul className='nav flex-column'>
                <li className='nav-item'>
                  <a className='nav-link active' href='#'>
                    <span data-feather='home'></span>
                    Dashboard <span className='sr-only'>(current)</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    <span data-feather='file'></span>
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1 className='h2'>Dashboard</h1>
            </div>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1 className='h2'>Users</h1>
            </div>

            <ul>
              {users.map((user: any) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
