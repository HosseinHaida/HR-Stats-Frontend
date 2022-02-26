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
        // if (res.data.user.outbound_requests) {
        //   commit("setUserRequests", res.data.user.outbound_requests);
        // }
        // if (res.data.user.inbound_requests) {
        //   commit("setUserRequestsInbound", res.data.user.inbound_requests);
        // }
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
            // if (res.data.user.outbound_requests) {
            //   commit("setUserRequests", res.data.user.outbound_requests);
            // }
            // if (res.data.user.inbound_requests) {
            //   commit("setUserRequestsInbound", res.data.user.inbound_requests);
            //   commit(
            //     "setUserInboundRequestsCount",
            //     res.data.user.inbound_requests.length
            //   );
            // }
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
