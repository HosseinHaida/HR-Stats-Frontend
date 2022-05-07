<template>
  <q-page class="q-pa-md">
    <q-table
      title="افراد"
      :rows="rows"
      :columns="columns"
      row-key="PerNo"
      :visible-columns="visibleColumns"
      table-header-class="bg-grey-2"
      :pagination="initialPagination"
      selection="single"
      v-model:selected="selection"
    >
      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="cursor-pointer"
          @click="props.selected = true"
        >
          <!-- @click="somePeopleIsSelected(props.row)" -->

          <q-td>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td key="Rank" :props="props">
            {{ ranks[props.row.Rank] }}
          </q-td>
          <q-td key="Name" :props="props">
            {{ props.row.Name }}
          </q-td>
          <q-td key="Family" :props="props">
            {{ props.row.Family }}
          </q-td>

          <q-td key="PerNo" :props="props">
            {{ props.row.PerNo }}
          </q-td>
          <q-td key="Department" :props="props">
            <span
              v-if="departments"
              class="q-px-sm q-py-xs rounded-borders text-secondary border-positive"
            >
              <q-icon
                name="edit"
                color="secondary"
                size="11px"
                style="margin-top: -2px"
              />
              {{ departments[props.row.Department] }}
            </span>
            <q-popup-edit
              @hide="onDepartmentPopupHide"
              v-model="props.row.Department"
            >
              <q-select
                filled
                v-model="editedPersonDepartment"
                use-input
                label="تغییر قسمت"
                dense
                input-debounce="0"
                style="width: 320px"
                :options="departmentOptions"
                clearable
                @filter="filterDepartments"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      قسمت یافت نشد
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-btn
                icon="save"
                dense
                :disable="!editedPersonDepartment"
                color="secondary"
                class="q-mt-xs q-px-sm"
                :loading="personDepartmentChangePending"
                @click="onPersonDepartmentChange"
              >
                <q-tooltip delay="400"> ذخیره </q-tooltip>
              </q-btn>
            </q-popup-edit>
          </q-td>
          <q-td key="IsSoldier" :props="props">
            {{ props.row.IsSoldier === "1" ? "وظیفه" : "پایور" }}
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top="props">
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-mr-md"
        />
        <q-select
          v-model="visibleColumns"
          multiple
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
        />

        <q-input
          class="q-ml-md q-mr-sm col"
          filled
          v-model="peopleSearchText"
          dense
          debounce="400"
          label="جستجو"
        />

        <q-select
          v-if="user && user.permissions"
          class="q-mx-xs ellipsis"
          style="max-width: 150px"
          filled
          multiple
          display-value="قسمت"
          dense
          v-model="selectedDepartments"
          :options="user.permissions.permittedDepartments"
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item style="min-width: 250px" v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  dense
                  size="sm"
                  :model-value="selected"
                  @update:model-value="toggleOption(opt.value)"
                />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:prepend>
            <q-icon name="group" />
          </template>
        </q-select>
        <q-btn
          v-if="user && user.Department === '23'"
          outline
          class="q-ml-sm"
          color="primary"
          to="/people/add"
          icon="add"
        >
          <q-tooltip>افزودن تکی پرسنل</q-tooltip>
        </q-btn>
        <q-form v-if="user && user.Department === '23'" class="q-mx-xs q-pl-sm">
          <q-file
            class="ellipsis"
            dense
            accept=".xlsx"
            v-model="excelFile"
            label="افزودن از فایل اکسل"
            :borderless="!!excelFile"
            :filled="!excelFile"
            style="max-width: 235px"
          >
            <template v-slot:append>
              <q-icon
                v-if="!excelFile"
                name="post_add"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:prepend>
              <q-btn
                v-if="excelFile"
                class="q-mr-sm"
                color="positive"
                push
                dense
                icon="upload"
                @click="uploadExcelFile()"
                :loading="excelUploadPending"
              >
                <q-tooltip>آپلود فایل انتخابی</q-tooltip>
              </q-btn>
            </template>
          </q-file>
        </q-form>

        <q-btn
          class="q-ml-sm q-pl-sm q-pr-none"
          no-caps
          outline
          @click="exportPeople"
        >
          فایل csv
          <q-icon name="archive" class="q-mx-sm" />
        </q-btn>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { exportFile, useQuasar } from "quasar";
import { useStore } from "vuex";
import { onMounted, computed, ref, watch, onUnmounted } from "vue";
import { ranks, militaryBaseName } from "../store/variables.js";

const currentDepartment = "HR";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  setup() {
    const $q = useQuasar();
    const excelFile = ref(null);
    let peopleSearchText = ref(null);
    const store = useStore();

    const departments = computed(() => store.getters["user/getDepartments"]);
    const excelUploadPending = computed(
      () => store.getters["people/getExcelUploadPending"]
    );
    const departmentsRaw = computed(() => store.state.user.departments);

    const columns = [
      {
        name: "Rank",
        label: "درجه",
        align: "left",
        field: (row) => ranks[row.Rank],
        sortable: true,
      },
      {
        name: "Name",
        required: true,
        label: "نام",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Family",
        label: "نشان",
        align: "left",
        field: "Family",
        sortable: true,
      },
      {
        name: "PerNo",
        label: "شماره کارگزینی",
        align: "left",
        field: "PerNo",
        sortable: true,
      },
      {
        name: "Department",
        label: "قسمت",
        align: "left",
        field: (row) => departments.value[row.Department],
        sortable: true,
      },
      {
        name: "IsSoldier",
        label: "نوع",
        align: "left",
        field: (row) => (row.IsSoldier === "1" ? "وظیفه" : "پایور"),
        sortable: true,
      },
    ];

    let initialPagination = {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 7,
    };

    const fetchPeople = () => {
      let selectedDepartmentsIDs = [];
      if (selectedDepartments.value) {
        selectedDepartments.value.forEach((dep) => {
          selectedDepartmentsIDs.push(dep.value);
        });
      }
      store
        .dispatch("people/fetchPeople", {
          searchText: peopleSearchText.value,
          departments: selectedDepartments.value
            ? selectedDepartmentsIDs
            : null,
        })
        .then(({ status, message }) => {
          if (status === "error") {
            $q.notify({
              color: "red-5",
              icon: "warning",
              message: message,
            });
          }
        });
    };

    watch(peopleSearchText, (value) => {
      fetchPeople();
    });

    let selectedDepartments = ref(null);

    watch(selectedDepartments, (value) => {
      fetchPeople();
    });

    onMounted(() => {
      fetchPeople();
    });

    onUnmounted(() => {
      store.commit("people/setPeopleList", []);
    });

    // Computed
    const user = computed(() => store.state.user.data);
    const rows = computed(() => store.state.people.list);
    const personDepartmentChangePending = computed(
      () => store.state.people.personDepartmentChangePending
    );

    let departmentOptions = ref([]);
    let editedPersonDepartment = ref(null);

    let selection = ref([]);

    return {
      visibleColumns: ref(["Name", "Family", "PerNo", "Rank", "Department"]),
      columns,
      excelFile,
      peopleSearchText,
      initialPagination,
      selectedDepartments,
      departmentOptions,
      editedPersonDepartment,
      departments,
      selection,

      excelUploadPending,
      personDepartmentChangePending,

      ranks,
      user,
      rows,

      // Methods
      filterDepartments(val, update) {
        if (val === "") {
          update(() => {
            // filter departmentOptions
            departmentOptions.value = departmentsRaw.value.map((a) => {
              return { ...a };
            });
          });
          return;
        }

        update(() => {
          const needle = val;
          departmentOptions.value = departmentsRaw.value.filter((v) => {
            return v.label.indexOf(needle) > -1;
          });
        });
      },

      onDepartmentPopupHide() {
        if (editedPersonDepartment.value || selection.value) {
          editedPersonDepartment.value = null;
          selection.value = [];
        }
      },

      async onPersonDepartmentChange() {
        if (
          !selection.value ||
          !selection.value ||
          !selection.value[0] ||
          !selection.value[0]["PerNo"]
        )
          return $q.notify({
            color: "red-5",
            icon: "warning",
            message: "لطفا ابتدا یک نفر را انتخاب کنید",
          });
        await store
          .dispatch("people/changeDepartment", {
            department: editedPersonDepartment.value,
            perNo: selection.value[0]["PerNo"],
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
              fetchPeople();
            }
          });
      },

      fetchPeople,
      exportPeople() {
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            rows.value.map((row) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");
        const status = exportFile(
          `${militaryBaseName}-${user.value.Department}-people.csv`,
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
      },

      uploadExcelFile() {
        if (excelFile.value) {
          const formData = new FormData();
          formData.append("excel", excelFile.value);
          store
            .dispatch("people/uploadExcel", formData)
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

                fetchPeople();
                excelFile.value = null;
              }
            });
        }
      },

      // somePeopleIsSelected(row) {
      //   editedPersonDepartmentPerNo.value = row.PerNo;
      // },
    };
  },
};
</script>

<style lang="sass"></style>
