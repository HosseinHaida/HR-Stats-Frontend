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
