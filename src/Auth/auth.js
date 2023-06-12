const setToken = (token) => {
  if (token) {
    localStorage.setItem("notetoken", token);
  } else {
    localStorage.removeItem("notetoken");
  }
};

const getToken = () => {
  return localStorage.getItem("notetoken");
};

const logout = () => {
  localStorage.removeItem("notetoken");
};

const getUser = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

const isLoggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000 ? true : false;
  } catch (err) {
    return false;
  }
};

const jwtDecode = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export { setToken, getToken, logout, getUser, isLoggedIn, isTokenExpired };
