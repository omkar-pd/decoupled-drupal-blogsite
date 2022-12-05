import axios from "axios";

export const handleLogin = async (username, password) => {
  const drupallogIn = await drupalLogIn(username, password);
  if (drupallogIn !== undefined && drupallogIn == 200) {
    return fetchSaveOauthToken(username, password);
  }
  return "Error Occured";
};

const drupalLogIn = async (username, password) => {
  try {
    const response = await axios.post("/user/login?_format=json", {
      name: username,
      pass: password,
    });
    return response.status;
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
    score: "content_editor",
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
    console.log("Error Occured, Please Check Username and Password");
  }
};

const saveToken = (json) => {
  const token = { ...json };
  // debugger;
  token.date = Math.floor(Date.now() / 1000);
  token.expirationDate = token.date + token.expires_in;
  localStorage.setItem("access-token", JSON.stringify(token));
  return token;
};

export const isLoggedIn = async () => {
  // Check if code is executing in browser or not
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  // Check if we already have access token in localStorage
  const token =
    localStorage.getItem("access-token") !== null
      ? JSON.parse(localStorage.getItem("access-token"))
      : null;

  // If not, return false as the user is not loggedIn.
  if (token === null) {
    return Promise.resolve(false);
  }

  // Check if access token is still valid
  if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
    return Promise.resolve(token);
  }
  // If not, use refresh token and generate new token
  // if (token !== null) {
  //   const data = {
  //     client_id: "MhH1oYtS1BgyKwWzskUIZs6SA3Ynhw4sMj4-gBhQJQU",
  //     client_secret: "demo",
  //     grant_type: "refresh_token",
  //     scope: "content_editor",
  //     refresh_token: token.refresh_token,
  //   };

  // try {
  //   const response = await axios({
  //     method: "post",
  //     url: "oauth/token",
  //     data: data,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  //   // return response;
  //   console.log(response);
  // } catch (error) {
  //   console.log("Error Occured, Please Check Username and Password");
  // }

  // const response = await fetch('/oauth/token', {
  //   method: 'post',
  //   headers: new Headers({
  //     Accept: 'application/json',
  //   }),
  //   body: formData,
  // });

  // if (response.ok) {
  //   const result = await response.json();
  //   const token =  await saveToken(result);
  //   return Promise.resolve(token)
  // }


};
