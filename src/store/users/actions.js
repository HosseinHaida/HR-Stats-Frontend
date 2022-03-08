import { apiUrl } from "../variables";
import { messages } from "../messages";
import axios from "axios";

export async function fetchUsers({ rootState, commit, dispatch }, config) {
  commit("setUsersFetchPending", true);
  if (!rootState.user.t)
    await dispatch("user/fetchUserData", null, { root: true });
  const url = `${apiUrl}/users/list/?department=${config.department}&search_text=${config.searchText}`;
  // &departments=${config.departments}
  return await axios
    .get(url, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setUsersFetchPending", false);
        commit("setUsersList", res.data.users);
        // commit("setUsersListTotals", {
        //   pages: res.data.pages,
        //   count: res.data.total,
        // });
        return {
          status: "success",
          message: messages.usersFetchSuccessful,
        };
      },
      (error) => {
        commit("setUsersFetchPending", false);
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

export async function insertUser({ rootState, commit }, newUser) {
  commit("setInsertPending", true);
  return await axios
    .post(apiUrl + "/users/insert", newUser, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setInsertPending", false);
        // if (res.data.location) {
        //   commit("fillThisLocation", res.data.location);
        // }

        return {
          status: "success",
          message: messages.userAdded,
        };
      },
      (error) => {
        commit("setInsertPending", false);
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

export async function deleteAuth(
  { rootState, commit },
  { userID, departmentID, role }
) {
  return await axios
    .delete(`${apiUrl}/users/roles/delete/${userID}/${departmentID}/${role}`, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        if (res.data && res.data.users) {
          commit("setUsersList", res.data.users);
        }
        console.log(res.data);
        return {
          status: "success",
          message: messages.authDeletedSuccessfully,
        };
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
}
