<template>
  <q-page
    class="q-pa-md"
    v-if="!user || user.Department !== '23' || !canUploadDastoorExcel"
  >
    <div class="row">
      <div class="col-12">
        <div class="note-warning q-pa-md rounded-borders">
          شما اجازه بارگذاری گروهی ماده دستور در سامانه دستور را ندارید.
        </div>
      </div>
    </div>
  </q-page>
  <q-page v-else class="q-pa-md">
    <!-- <q-btn-dropdown style="width: 100%" outline label="افزودن اکسل"> -->
    <q-list separator>
      <q-item
        clickable
        v-for="(madde, i) in maddeHa"
        @click="selectMaddeForUpload(i)"
        :key="i"
        v-close-popup
      >
        <q-item-section>
          <q-item-label> ماده {{ i }} - {{ madde.name }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- </q-btn-dropdown> -->
    <!-- Dialog when a Madde is chosen -->
    <q-dialog persistent v-model="showMaddeDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6" style="min-width: 350px">
            آپلود گروهی ماده {{ selectedMadde.number }} -
            {{ selectedMadde.name }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <q-file
              class="ellipsis"
              dense
              accept=".xlsx"
              v-model="excelFile"
              label="انتخاب فایل اکسل"
              filled
            >
              <template v-slot:append>
                <q-icon
                  v-if="!excelFile"
                  name="post_add"
                  class="cursor-pointer"
                />
              </template>
            </q-file>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-if="excelFile"
            color="positive"
            label="بارگذاری"
            icon="upload"
            @click="uploadDastoorExcelFile()"
            :loading="excelUploadPending"
          >
          </q-btn>
          <q-btn
            @click="exportColumnNames"
            label="دانلود نام ستون‌ها"
            color="primary"
          />
          <q-btn flat label="لغو" color="primary" @click="dismissUpload" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar, exportFile } from "quasar";
import { ref, computed } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  maddeHa,
  maddeHaCols,
  militaryBaseName,
} from "../../store/variables.js";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}
export default {
  setup() {
    const store = useStore();
    const $q = useQuasar();
    // const router = useRouter();

    const excelFile = ref(null);

    let showMaddeDialog = ref(false);
    let selectedMadde = ref(null);

    const dismissUpload = () => {
      showMaddeDialog.value = false;
      excelFile.value = null;
      selectedMadde.value = null;
    };

    const selectMaddeForUpload = (number) => {
      selectedMadde.value = maddeHa[number];
      showMaddeDialog.value = true;
    };

    const uploadDastoorExcelFile = () => {
      if (excelFile.value) {
        const formData = new FormData();
        formData.append("excel", excelFile.value);
        store
          .dispatch("excessive/uploadDastoorMaddeExcel", {
            excel: formData,
            selectedMadde: selectedMadde.value.table,
          })
          .then(({ status, message }) => {
            if (status === "error") {
              $q.notify({
                color: "red-5",
                icon: "warning",
                message: message,
              });
            } else if (status === "success") {
              $q.notify({
                color: "green-4",
                icon: "cloud_done",
                message: message,
              });
              dismissUpload();
              excelFile.value = null;
            }
          });
      }
    };

    const exportColumnNames = () => {
      let cols = [];
      Object.entries(maddeHaCols[selectedMadde.value.number]).forEach(
        ([key, val]) => cols.push(val)
      );
      const content = [cols.map((key) => wrapCsvValue(key))];
      const status = exportFile(
        `${militaryBaseName}-HR-Madde${selectedMadde.value.number}-Columns.csv`,
        "\ufeff" + content,
        "text/csv"
      );
      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    };

    // Computed
    // Computed
    const user = computed(() => store.state.user.data);
    const excelUploadPending = computed(
      () => store.state.excessive.excelUploadPending
    );
    // Check if user can upload Dastoor Excel Files
    const canUploadDastoorExcel = computed(() => {
      if (!user.value) return false;
      const ifYes = user.value.permissions.authedDepartments.filter(
        (loopAuth) =>
          loopAuth.role === "can_upload_dastoor" ||
          loopAuth.role === "can_do_all" ||
          loopAuth.role === "head" ||
          loopAuth.role === "succ"
      );
      return ifYes.length > 0;
    });

    return {
      maddeHa,
      maddeHaCols,
      militaryBaseName,
      excelFile,
      showMaddeDialog,
      selectedMadde,
      dismissUpload,
      selectMaddeForUpload,
      uploadDastoorExcelFile,
      exportColumnNames,
      user,
      excelUploadPending,
      canUploadDastoorExcel,
    };
  },
};
</script>

<style></style>
