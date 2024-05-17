import axios from "axios";
import { API_URL } from "./globalVariables";
import { catchToastError } from "./toastHandlers";
import { redirectToHomePage, redirectToLoginPage } from "./redirectHandlers";

export function isAuthenticated() {
  const tokens = localStorage.getItem("tokens");

  return !!tokens;
}

async function refreshAccessToken(refreshToken) {
  const API_URL = `${import.meta.env.VITE_API_HOST}:${parseInt(
    import.meta.env.VITE_API_PORT
  )}`;

  try {
    const response = await axios.post(`${API_URL}/api/v2/auth/refresh`, {
      refresh_token: refreshToken,
    });

    const newAccessToken = response.data.resource.access_token;

    return newAccessToken;
  } catch (error) {
    console.error(`Failed to refresh access token: ${error.message}`);
    throw new Error(`Failed to refresh access token: ${error.message}`);
  }
}

export async function refreshAccessTokenHandler() {
  const refreshToken = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens")).refresh_token
    : null;

  if (!refreshToken) {
    console.error("Refresh token not found in local storage.");
    
    catchToastError("Akses token ");

    redirectToLoginPage();
  }

  const accessToken = await refreshAccessToken(refreshToken);

  const tokens = {
    access_token: accessToken,
    refresh_token: refreshToken,
  };

  localStorage.setItem("tokens", JSON.stringify(tokens));
}

export async function authUser() {
  const tokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens"))
    : null;

  if (!tokens) {
    console.error("Access Token and Refresh Token not found.");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokens.access_token}`,
  };

  try {
    const response = await axios.get(`${API_URL.value}/api/v2/auth/me`, {
      headers: headers,
    });

    const authUserData = response.data.resource.data;

    localStorage.setItem("user", JSON.stringify(authUserData));

    console.log(JSON.parse(localStorage.getItem("user")));
  } catch (error) {
    catchToastError("Akses token telah hangus, mohon login kembali", 3000);

    if (error) {
      redirectToLoginPage();
    }

    console.error(`Failed to fetch auth user: ${error.message}`);
  }
}
