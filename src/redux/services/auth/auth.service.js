import { BehaviorSubject } from "rxjs";
import { apiResponsestatus } from "../../../constant/commonDS";
import { history } from "../../../history";
import { httpService } from "../http.service";

const currentUserSubject = new BehaviorSubject(
  localStorage.getItem("currentUser")
);

export const authService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(apiUrl, data) {
  return httpService.httpPost(apiUrl, data).then((response) => {
    let data = response.json();

    if (data.Status === apiResponsestatus.AUTHFAILED) {
      logout();
      return null;
    } else {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      let user = JSON.stringify(data.Data);
      localStorage.setItem("currentUser", user);
      currentUserSubject.next(user);
    }
    return data;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.clear();
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
  history.push("/login");
}
