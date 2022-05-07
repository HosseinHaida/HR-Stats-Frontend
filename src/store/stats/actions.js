import { apiUrl } from "../variables";
import { messages } from "../messages";
import axios from "axios";

export async function register({ rootState, commit }, stat) {
  commit("setRegisterPending", true);
  console.log(stat);
  return await axios
    .post(apiUrl + "/stats/register", stat, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setRegisterPending", false);
        return {
          status: "success",
          message: messages.statRegistered,
        };
      },
      (error) => {
        commit("setRegisterPending", false);
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

export async function setDaysOff({ rootState, commit }, data) {
  commit("setDaysOffPending", true);
  return await axios
    .post(apiUrl + "/stats/set_days_off", data, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setDaysOffPending", false);
        return {
          status: "success",
          message: messages.statRegistered,
        };
      },
      (error) => {
        commit("setDaysOffPending", false);
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

export async function fetchDaysOff({ rootState, commit, dispatch }) {
  commit("setDaysOffFetchPending", true);
  if (!rootState.user.t)
    await dispatch("user/fetchUserData", null, { root: true });
  const url = `${apiUrl}/stats/days_off/list`;
  return await axios
    .get(url, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setDaysOffFetchPending", false);
        commit("setDaysOffList", res.data.records);
        return {
          status: "success",
          message: messages.daysOffFetchSuccessful,
        };
      },
      (error) => {
        commit("setDaysOffFetchPending", false);
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
