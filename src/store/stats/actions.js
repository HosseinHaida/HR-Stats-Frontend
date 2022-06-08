import { apiUrl } from "../variables";
import { messages } from "../messages";
import axios from "axios";

export async function register({ rootState, commit }, stat) {
  commit("setRegisterPending", true);
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
          delay: res.data.delay,
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

export async function fetchTodaysStatsIfSet(
  { rootState, commit, dispatch },
  data
) {
  commit("setTodaysStatsPending", true);
  if (!rootState.user.t)
    await dispatch("user/fetchUserData", null, { root: true });
  const url = `${apiUrl}/stats/fetch_stats`;
  return await axios
    .post(url, data, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setTodaysStats", res.data.stats);
        commit("setTodaysOffs", res.data.offs);
        commit("setTodaysStatsPending", false);
        return {
          status: "success",
          // message: messages.statRegistered,
        };
      },
      (error) => {
        commit("setTodaysStatsPending", false);
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

export async function approveStats({ rootState, commit }, data) {
  // commit("setApproveHRPending", true);
  return await axios
    .post(apiUrl + "/stats/approve", data, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        // commit("setApproveHRPending", false);
        return {
          status: "success",
          message: messages.approved,
        };
      },
      (error) => {
        // commit("setApproveHRPending", false);
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

export async function approveADayOff({ rootState, commit }, { id, role, dep }) {
  // commit("setApproveHRPending", true);
  return await axios
    .post(
      apiUrl + "/stats/approve/day_off",
      { id, role, dep },
      {
        headers: {
          token: rootState.user.t,
        },
      }
    )
    .then(
      (res) => {
        // commit("setApproveHRPending", false);
        return {
          status: "success",
          message: messages.approved,
        };
      },
      (error) => {
        // commit("setApproveHRPending", false);
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

export async function fetchDaysOff({ rootState, commit, dispatch }, conf) {
  commit("setDaysOffFetchPending", true);
  if (!rootState.user.t)
    await dispatch("user/fetchUserData", null, { root: true });
  const url = `${apiUrl}/stats/days_off/list/?search_text=${conf.searchText}&departments=${conf.departments}`;
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
