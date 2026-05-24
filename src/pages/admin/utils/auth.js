// Admin authentication utilities

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export const AUTH_KEY      = 'ambika_admin_auth';
export const TOKEN_KEY     = 'ambika_admin_token';
export const PRODUCTS_KEY  = 'ambika_admin_products';
export const ENQUIRIES_KEY = 'ambika_admin_enquiries';
export const SETTINGS_KEY  = 'ambika_admin_settings';

// ── JWT helpers (backend auth) ────────────────────────────
export const getToken  = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// ── isAuthenticated — accepts legacy flag OR JWT token ────
export const isAuthenticated = () => {
  try {
    // Check JWT token first (backend auth)
    if (getToken()) return true;
    // Fall back to legacy localStorage flag (mock auth)
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth) {
      const parsed = JSON.parse(auth);
      return parsed?.loggedIn === true;
    }
    return false;
  } catch {
    return false;
  }
};

// ── Legacy mock login (credentials only, no backend) ─────
export const login = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username, loginTime: Date.now() }));
    return true;
  }
  return false;
};

// ── Logout — clears both JWT and legacy flag ──────────────
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  clearToken();
};
