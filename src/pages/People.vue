<template>
  <q-page class="q-pa-lg">
    <q-table
      title="افراد"
      :rows="rows"
      :columns="columns"
      row-key="ID"
      :visible-columns="visibleColumns"
      table-header-class="bg-grey-2"
      @row-click="somePeopleIsSelected"
      :pagination="initialPagination"
    >
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
          class="q-mx-md col"
          filled
          v-model="peopleSearchText"
          dense
          debounce="400"
          label="جستجو"
        />
        <q-btn outline color="primary" dense icon="add">
          <q-tooltip>افزودن تکی پرسنل</q-tooltip>
        </q-btn>
        <q-file
          class="q-mx-xs q-pl-sm ellipsis"
          dense
          accept=".xlsx"
          v-model="excelFile"
          label="افزودن از فایل اکسل"
          :borderless="!!excelFile"
          :filled="!excelFile"
          style="max-width: 235px"
        >
          <template v-slot:append>
            <q-icon v-if="!excelFile" name="post_add" class="cursor-pointer" />
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
        <q-btn
          class="q-mx-sm q-pl-sm q-pr-none"
          no-caps
          dense
          outline
          @click="exportPeople"
        >
          زخیره فایل csv
          <q-icon name="archive" class="q-mx-sm" />
        </q-btn>
        <!-- <q-icon class="q-mr-sm q-ml-md" size="sm" name="group" /> -->
        <q-select
          v-if="user && user.permissions"
          class="q-ml-xs ellipsis"
          style="max-width: 100px"
          filled
          multiple
          dense
          v-model="selectedDepartments"
          :options="user.permissions.permittedDepartments"
        >
          <!-- @filter="filterFn" -->
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
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { exportFile, useQuasar } from "quasar";
import { mapGetters, useStore } from "vuex";
import { onMounted, computed, ref } from "vue";

const columns = [
  {
    name: "Rank",
    label: "درجه",
    align: "left",
    field: "Rank",
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
    field: "Department",
    sortable: true,
  },
];

const militaryBaseName = "Khazraii";
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

    let initialPagination = {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    };

    const fetchPeople = (goToFirstPage) => {
      if (goToFirstPage === true) {
        initialPagination.page = 1;
      }
      store
        .dispatch("people/fetchPeople", {
          // type: this.type,
          page: initialPagination.page,
          howMany: initialPagination.rowsPerPage,
          searchText: peopleSearchText.value,
          // departments: selectedDepartmentss,
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

    let selectedDepartments = ref(null);

    onMounted(() => {
      fetchPeople(true);
    });

    return {
      visibleColumns: ref(["Name", "Family", "PerNo", "Rank", "Department"]),
      columns,
      excelFile,
      peopleSearchText,
      initialPagination,
      fetchPeople,
      selectedDepartments,

      user: computed(() => store.state.user.data),
      rows: computed(() => store.state.people.list),

      // filterFn(val, update) {
      //   if (val === "") {
      //     update(() => {
      //       permittedDepartments.value = selectedDepartments;

      //       // here you have access to "ref" which
      //       // is the Vue reference of the QSelect
      //     });
      //     return;
      //   }

      //   update(() => {
      //     const needle = val;
      //     permittedDepartments.value = selectedDepartments.value.filter(
      //       (v) => v.label.indexOf(needle) > -1
      //     );
      //   });
      // },

      exportPeople() {
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            rows.map((row) =>
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
          `${militaryBaseName}-${currentDepartment}-people.csv`,
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
        if (this.excelFile) {
          const formData = new FormData();
          formData.append("excelFile", this.excelFile);
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
              }
            });
        }
      },

      somePeopleIsSelected(evt, row) {
        console.log(row);
      },
    };
  },
  computed: {
    ...mapGetters({
      excelUploadPending: "people/getExcelUploadPending",
    }),
  },
  watch: {
    peopleSearchText: function (val) {
      this.fetchPeople(true);
    },
  },
};
</script>

<style lang="sass"></style>
