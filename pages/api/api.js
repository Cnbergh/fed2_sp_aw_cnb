import { API_URL, Login_URL, SignUp_URL, Profile_URL } from "./constants";

/**
 * REST API
 * Here are all the API functions and helpers.
 * Section 1: User update, user login, user sign up.
 * Section 2: Data fetching, listings, credit.
 */

/**
 * -------- Section 1 --------
 */

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

/**
 * *Register user - (signUp page)
 */
export async function registerUser({ email, password, username }) {
  const url = new URL(`${SignUp_URL}`);

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
  const url = new URL(`${Login_URL}`);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetcher(url, options);

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

/**
 * -------- Section 2 --------
 */

export async function fetchApiListings(offset = 0, limit = 9) {
  const url = new URL(`${API_URL}/listings?offset=${offset}&limit=${limit}`);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch listings. Please try again later.");
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received");
    }
    return data;
  } catch (error) {
    throw new Error("Failed to get listings. Please try again later.");
  }
}

export async function fetchUserListings() {
  const url = new URL(`${Profile_URL}/${username}/listings`);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetcher(url, options);

    if (!response.ok) {
      throw new Error(
        "Failed to fetch profile listings. Please try again later."
      );
    }

    const data = await response.json();
    if (!data) {
      throw new Error("Invalid data format received");
    }
    return data;
  } catch (error) {
    throw new Error("Failed to get profile listings. Please try again later.");
  }
}

export async function fetchUserWins() {}

export async function fetchUserProfile() {
  const username = localStorage.getItem("user_name");
  const url = new URL(`${Profile_URL}/${username}`);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetcher(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch profile. Please try again later.");
    }

    const data = await response.json();
    if (!data) {
      throw new Error("Invalid data format received");
    }
    return data;
  } catch (error) {
    throw new Error("Failed to get profile. Please try again later.");
  }
}
