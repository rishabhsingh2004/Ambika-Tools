// Admin authentication utilities

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export const AUTH_KEY = 'ambika_admin_auth';
export const PRODUCTS_KEY = 'ambika_admin_products';
export const ENQUIRIES_KEY = 'ambika_admin_enquiries';
export const SETTINGS_KEY = 'ambika_admin_settings';

export const isAuthenticated = () => {
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return false;
    const parsed = JSON.parse(auth);
    return parsed?.loggedIn === true;
  } catch {
    return false;
  }
};

export const login = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username, loginTime: Date.now() }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
