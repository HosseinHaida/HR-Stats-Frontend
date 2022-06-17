import { apiUrl } from "../variables";
import { messages } from "../messages";
import axios from "axios";

export async function signin({ commit }, userCredentials) {
  commit("setSigninPending", true);
  return await axios.post(apiUrl + "/auth/signin", userCredentials).then(
    (res) => {
      commit("setSigninPending", false);
      if (res.data.user) {
        commit("setUserData", res.data.user);
        commit("setCookie", res.data.user.token);
        commit("setDepartmentsList", res.data.departments);
      }

      return {
        status: "success",
        message: res.data.user.Name + " " + res.data.user.Family + " خوش آمدید",
      };
    },
    (error) => {
      commit("setSigninPending", false);
      if (!error.response) {
        return {
          status: "error",
          message: messages.noConnection,
        };
      }
      return {
        status: "error",
        message: error.response.data.error,
      };
    }
  );
}

export async function fetchUserData({ state, commit }) {
  var name = state.userTCookieName;
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  var t = null;
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      t = c.substring(name.length, c.length);
    }
  }
  if (t) {
    return await axios
      .get(apiUrl + "/auth/fetch", {
        headers: {
          token: t,
        },
      })
      .then(
        (res) => {
          if (res.data && res.data.user) {
            commit("setUserData", res.data.user);
            commit("setToken", t);
            commit("setDepartmentsList", res.data.departments);
            return {
              status: "success",
              message: messages.fetchedMetaForUser + res.data.user.username,
            };
          }
        },
        (error) => {
          if (!error.response) {
            return {
              status: "error",
              message: messages.noConnection,
            };
          }
          return {
            status: "error",
            message: error.response.data.error,
          };
        }
      );
  } else {
    return {
      status: "notfound",
      message: messages.noUserPresent,
    };
  }
}

export async function uploadProfilePhoto({ state, commit, rootState }, photo) {
  commit("setProfilePhotoUploadPending", true);
  return await axios
    .post(`${apiUrl}/auth/upload/profile_photo`, photo, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        // commit("updateUserPhoto", res.data.photo_path);
        commit("setProfilePhotoUploadPending", false);
        return {
          status: "success",
          message: messages.profilePhotoUploadSuccess,
        };
      },
      (error) => {
        commit("setProfilePhotoUploadPending", false);
        if (!error.response) {
          return {
            status: "error",
            message: messages.noConnection,
          };
        }
        return {
          status: "error",
          message: error.response.data.error,
        };
      }
    );
}

export async function uploadSignature({ state, commit, rootState }, photo) {
  commit("setSignaturePhotoUploadPending", true);
  return await axios
    .post(`${apiUrl}/auth/upload/signature`, photo, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        // commit("updateUserPhoto", res.data.photo_path);
        commit("setSignaturePhotoUploadPending", false);
        return {
          status: "success",
          message: messages.signaturePhotoUploadSuccess,
        };
      },
      (error) => {
        commit("setSignaturePhotoUploadPending", false);
        if (!error.response) {
          return {
            status: "error",
            message: messages.noConnection,
          };
        }
        return {
          status: "error",
          message: error.response.data.error,
        };
      }
    );
}

export async function savePassword(
  { state, commit, rootState },
  { oldPass, newPass }
) {
  commit("setPasswordUpdatePending", true);
  return await axios
    .post(
      `${apiUrl}/auth/update/password`,
      { oldPass, newPass },
      {
        headers: {
          token: rootState.user.t,
        },
      }
    )
    .then(
      (res) => {
        commit("setPasswordUpdatePending", false);
        return {
          status: "success",
          message: messages.passwordUpdateSuccess,
        };
      },
      (error) => {
        commit("setPasswordUpdatePending", false);
        if (!error.response) {
          return {
            status: "error",
            message: messages.noConnection,
          };
        }
        return {
          status: "error",
          message: error.response.data.error,
        };
      }
    );
}
