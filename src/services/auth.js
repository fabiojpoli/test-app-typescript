import jwtDecode from 'jwt-decode';
import http from './http';

const tokenKey = 'test-app-typescript-token';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data } = await http.post('/auth', {
    email,
    password,
  });

  localStorage.setItem(tokenKey, data);
  http.setJwt(getJwt());
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
