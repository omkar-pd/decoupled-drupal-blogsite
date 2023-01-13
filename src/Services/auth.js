import axios from "axios";
import { Context } from "../Context/userContext";
import { useContext } from "react";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const handleLogin = async (username, password) => {
  const drupallogIn = await drupalLogIn(username, password);
  if (drupallogIn !== undefined && drupallogIn.status === 200) {
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

export const saveToken = (json) => {
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
        .get(`http://decoupled-drupal.co/user/logout?_format=json`, {
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
    return false;
  }

  // Check if access token is still valid
  if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
    return token;
  }
  // If not, use refresh token and generate new token
  if (token !== null) {
    let formData = new FormData();
    formData.append("client_id", "MhH1oYtS1BgyKwWzskUIZs6SA3Ynhw4sMj4-gBhQJQU");
    formData.append("client_secret", "demo");
    formData.append("scope", "authenticated_user");
    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", token.refresh_token);
    try {
      const response = await axios({
        method: "post",
        url: "oauth/token",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        const token = await saveToken(response.data);
        return token;
      }
    } catch (error) {
      return false;
    }
  }
};

export const checkToken = async () => {
  const token = await isLoggedIn();
  await axios
    .get("/jsonapi/node/article", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {})
    .catch(async (error) => {
      if (error.response.status === 401) {
        await regenerateToken();
      } else {
        console.error(error);
      }
    });
};

export const regenerateToken = async () => {
  const token = await isLoggedIn();
  // const user = await getCurrentUserDetails();

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
        url: `${baseUrl}oauth/token`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        const token = await saveToken(response.data);
        return token;
      }
    } catch (error) {
      return false;
    }
  }
};

export const getCurrentUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = await isLoggedIn();
  const userInfo = {
    token: token,
  };
  try {
    const res = await axios.get(
      `${baseUrl}jsonapi/user/user?filter[uid]=${user.current_user.uid}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    userInfo.user = res.data.data[0];
    return userInfo;
  } catch (err) {
    console.log(err);
  }

  return userInfo;
};
