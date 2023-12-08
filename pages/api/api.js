import { API_URL } from "./constants";

/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */

function updateOptions(options) {
  const update = { ...options };
  if (localStorage.getItem("token")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }
  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

/** *Sign up user - register page*/
export async function registerUser({ email, password, username }) {
  const url = new URL(`${API_URL}/auth/register`);

  const userData = {
    name: username,
    email,
    password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user_name", data.name);
    localStorage.setItem("user_email", data.email);
    localStorage.setItem("avatar", data.avatar);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** *Login user - login page*/
export async function loginUser({ email, password }) {
  const url = new URL(`${API_URL}/auth/login`);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user_name", data.name);
    localStorage.setItem("user_email", data.email);
    localStorage.setItem("avatar", data.avatar);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** *Logout user*/
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
}
