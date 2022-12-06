import axios from "axios";
import { useNavigate } from "react-router-dom";

export const handleLogin = async (username, password) => {
  const drupallogIn = await drupalLogIn(username, password);
  if (drupallogIn !== undefined && drupallogIn.status == 200) {
    localStorage.setItem("user", JSON.stringify(drupallogIn.data));
    return fetchSaveOauthToken(username, password);
  }
  return false;
};

const drupalLogIn = async (username, password) => {
  try {
    const response = await axios.post("/user/login?_format=json", {
      name: username,
      pass: password,
    });
    return response;
  } catch (error) {
    return error.response.status;
  }
};

export const fetchSaveOauthToken = async (username, password) => {
  const response = await fetchOauthToken(username, password);
  if (response) {
    return saveToken(response.data);
  }
};

const fetchOauthToken = async (username, password) => {
  const data = {
    username: username,
    password: password,
    client_id: "MhH1oYtS1BgyKwWzskUIZs6SA3Ynhw4sMj4-gBhQJQU",
    client_secret: "demo",
    scope: "content_editor",
    grant_type: "password",
  };
  try {
    const response = await axios({
      method: "post",
      url: "oauth/token",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const saveToken = (json) => {
  const token = { ...json };
  token.date = Math.floor(Date.now() / 1000);
  token.expirationDate = token.date + token.expires_in;
  localStorage.setItem("access-token", JSON.stringify(token));
  return token;
};

export const handleLogout = async () => {
  const drupallogout = await drupalLogout();
  localStorage.removeItem("access-token");
  localStorage.removeItem("user");
  return drupallogout;
};

const drupalLogout = async () => {
  const oauthToken = await isLoggedIn();
  const logoutoken = oauthToken.access_token;
  if (logoutoken) {
    try {
      const res = await axios
        .get(`user/logout?_format=json`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logoutoken}`,
          },
        })
        .then((res) => {
          return res.status;
        });
      return res;
    } catch (error) {
      return false;
    }
  }
};

export const isLoggedIn = async () => {
  // Check if code is executing in browser or not
  if (typeof window === "undefined") {
    return false;
  }

  // Check if we already have access token in localStorage
  const token =
    localStorage.getItem("access-token") !== null
      ? JSON.parse(localStorage.getItem("access-token"))
      : null;

  // If not, return false as the user is not loggedIn.
  if (token === null) {
    // return Promise.resolve(false);
    return false;
  }

  // Check if access token is still valid
  if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
    // return Promise.resolve(token);
    return token;
  }
  // If not, use refresh token and generate new token
  if (token !== null) {
    let formData = new FormData();
    formData.append("client_id", "MhH1oYtS1BgyKwWzskUIZs6SA3Ynhw4sMj4-gBhQJQU");
    formData.append("client_secret", "demo");
    formData.append("scope", "content_editor");
    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", token.refresh_token);
    try {
      const response = await axios({
        method: "post",
        url: "oauth/token",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      if (response.status === 200) {
        const token = await saveToken(response.data);
        return token;
      }
    } catch (error) {
      return false;
    }
  }
};
