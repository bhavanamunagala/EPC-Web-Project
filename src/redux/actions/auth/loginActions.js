//import * as firebase from "firebase/app"
import { history } from "../../../history";
//import "firebase/auth"
//import "firebase/database"
import axios from "axios";
import { authService } from "../../services/auth/auth.service";
// import { commonService } from "../../services/common/common.service";
import { authConstants } from "../../../constant/auth.constant";
import { getHeaders, apiEndPoints } from "../../../constant/commonDS";
//import { config } from "../../../authServices/firebase/firebaseConfig"
import { toast } from "react-toastify";

export const loginWithJWT = (user) => {
  return (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST_ACTION,
      data: null,
    });
    authService.login(apiEndPoints.loginUser, user).then(
      (response) => {
        var loggedInUser;
        if (response?.Data?.accessToken) {
          localStorage.setItem("userData", JSON.stringify(response.Data));
          localStorage.setItem("token", response.Data.accessToken);
          let currentTime = new Date();
          currentTime.setMinutes(
            currentTime.getMinutes() + response.Data.expiresIn
            // currentTime.getMinutes() + 1
          );
          localStorage.setItem("Token_expire", currentTime);

          loggedInUser = response.Data;
          dispatch({
            type: authConstants.LOGIN_WITH_JWT,
            payload: { loggedInUser, loggedInWith: "jwt" },
          });
          axios
            .post(
              apiEndPoints.getUserRights,
              {
                RoleID: loggedInUser.RoleID,
              },
              getHeaders
            )
            .then((response) => {
              if (response.data.Data) {
                localStorage.setItem(
                  "userRole",
                  JSON.stringify(response.data.Data)
                );
                history.push("/");
              }
              if (response.data.ErrorMessage && response.data.Status !== 1) {
                toast.error(response.ErrorMessage);
              }
            });
        } else {
          if (response.ErrorMessage) {
            toast.error(response.ErrorMessage);
          }
          dispatch({
            type: authConstants.LOGIN_ERROR_ACTION,
            payload: response,
          });
        }
      },
      (error) => {
        if (error.message) {
          toast.error(error.message);
        }
        dispatch({
          type: authConstants.LOGIN_ERROR_ACTION,
          payload: error.message,
        }).catch((err) => {
          dispatch({
            type: authConstants.LOGIN_ERROR_ACTION,
            payload: err.message,
          });
        });
      }
    );

    // axios
    //   .post("api/authenticate/login/user", {
    //     email: user.email,
    //     password: user.password
    //   })
    //   .then(response => {
    //     var loggedInUser

    //     if (response.data) {
    //       loggedInUser = response.data.user

    //       dispatch({
    //         type: "LOGIN_WITH_JWT",
    //         payload: { loggedInUser, loggedInWith: "jwt" }
    //       })

    //       history.push("/")
    //     }
    //   })
    //   .catch(err => console.log(err))
  };
};

export const logoutWithJWT = () => {
  return (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_WITH_JWT, payload: {}, user: null });
    authService.logout();
  };
};

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};

export const getLoginMetaData = (params, data = {}) => {
  return async (dispatch) => {
    await fetch(apiEndPoints.loginUserDropDown, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Status !== 1 && data.ErrorMessage) {
          dispatch({
            type: "GET_LOGIN_META_DATA",
            error: data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_LOGIN_META_DATA",
            data: data.Data,
            totalPages: data.totalPages,
            params,
          });
        }
      });
  };
};
