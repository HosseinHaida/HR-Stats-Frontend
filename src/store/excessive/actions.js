import { apiUrl } from "../variables";
import { messages } from "../messages";
import axios from "axios";

export async function uploadDastoorMaddeExcel(
  { state, commit, rootState },
  { excel, selectedMadde }
) {
  commit("setExcelUploadPending", true);
  return await axios
    .post(
      `${apiUrl}/excessive/upload_dastoor_madde_excel/?madde=${selectedMadde}`,
      excel,
      {
        headers: {
          token: rootState.user.t,
        },
      }
    )
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
