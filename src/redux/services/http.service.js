import { authHeader } from "../../constant/auth-header";
import { history } from "../../history";

export const httpService = {
  httpPost,
  httpGet,
  logout,
};

function httpGet(apiUrl, data, headers) {
  const requestOptions = {
    method: "GET",
    headers: headers ? headers : authHeader(),
  };

  var url = new URL(apiUrl),
    params = data;
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );



  return fetch(url, requestOptions);
}

function httpPost(apiUrl, data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(apiUrl, requestOptions);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  history.push("/login");
}
