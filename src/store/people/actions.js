import { apiUrl } from "../variables";
import { messages } from "../messages";
import axios from "axios";

export async function fetchPeople({ rootState, commit, dispatch }, config) {
  commit("setPeopleFetchPending", true);
  if (!rootState.user.t)
    await dispatch("user/fetchUserData", null, { root: true });
  let url = `${apiUrl}/people/list/?search_text=${config.searchText}&departments=${config.departments}`;
  config.noOffs ? (url += `&nooffs=true`) : (url += `&nooffs=false`);
  return await axios
    .get(url, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setPeopleFetchPending", false);
        commit("setPeopleList", res.data.people);
        commit("setPeopleListTotals", {
          pages: res.data.pages,
          count: res.data.total,
        });
        commit("stats/setTodaysOffs", res.data.offs, { root: true });
        return {
          status: "success",
          message: messages.peopleFetchSuccessful,
        };
      },
      (error) => {
        commit("setPeopleFetchPending", false);
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

export async function changeDepartment(
  { rootState, commit },
  { department, perNo }
) {
  commit("setPersonDepartmentChangePending", true);
  const url = `${apiUrl}/people/change_department`;
  return await axios
    .post(
      url,
      { department: department.value, perNo },
      {
        headers: {
          token: rootState.user.t,
        },
      }
    )
    .then(
      (res) => {
        commit("setPersonDepartmentChangePending", false);
        commit("setPeopleList", res.data.people);
        return {
          status: "success",
          message: messages.personDepSetSuccess,
        };
      },
      (error) => {
        commit("setPersonDepartmentChangePending", false);
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

export async function uploadExcel({ state, commit, rootState }, excel) {
  commit("setExcelUploadPending", true);
  return await axios
    .post(`${apiUrl}/people/upload_excel`, excel, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        // commit("updateUserPhoto", res.data.photo_path);
        commit("setExcelUploadPending", false);
        return {
          status: "success",
          message: messages.excelFileUploadedSuccess,
        };
      },
      (error) => {
        commit("setExcelUploadPending", false);
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

export async function insertPerson({ rootState, commit }, newPerson) {
  commit("setInsertPending", true);
  return await axios
    .post(apiUrl + "/people/insert", newPerson, {
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
          message: messages.personAdded,
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

export async function findPerson({ rootState, commit, dispatch }, config) {
  commit("setFindingPersonPending", true);
  if (!rootState.user.t)
    await dispatch("user/fetchUserData", null, { root: true });
  const url = `${apiUrl}/people/find/?id=${config.id}`;
  return await axios
    .get(url, {
      headers: {
        token: rootState.user.t,
      },
    })
    .then(
      (res) => {
        commit("setFindingPersonPending", false);
        return {
          status: "success",
          message: "success",
          person: res.data.person,
        };
      },
      (error) => {
        commit("setFindingPersonPending", false);
        if (!error.response) {
          return {
            status: "error",
            message: messages.noConnection,
            person: null,
          };
        }
        return {
          status: "error",
          message: error.response.data.error,
        };
      }
    );
}
