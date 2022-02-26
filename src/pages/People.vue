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
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />

        <q-input
          class="q-mx-md col"
          filled
          v-model="usersSearch"
          dense
          label="جستجو"
        ></q-input>
        <q-btn outline color="primary" dense icon="add"></q-btn>
        <q-btn outline color="primary" class="q-ml-sm q-pl-sm" dense>
          افزودن از فایل اکسل
          <q-icon name="post_add" class="q-mx-sm" />
        </q-btn>
        <q-btn
          class="q-mx-sm q-pl-sm"
          no-caps
          dense
          outline
          @click="exportPeople()"
        >
          زخیره فایل csv
          <q-icon name="archive" class="q-mx-sm" />
        </q-btn>
        <q-icon class="q-mr-sm q-ml-md" size="sm" name="group" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { exportFile, useQuasar } from "quasar";

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

const rows = [
  {
    Rank: "سروان",
    Name: "عباس",
    Family: "شفتلیان",
    PerNo: "12345678",
    Department: "نیرو انسانی",
  },
  {
    Rank: "ستوانسوم",
    Name: "حسین",
    Family: "حیدری",
    PerNo: "12345678",
    Department: "دژبان",
  },
  {
    Rank: "سرباز",
    Name: "محمد",
    Family: "قرگوزلو",
    PerNo: "12345678",
    Department: "موزیک",
  },
  {
    Rank: "سرهنگدوم",
    Name: "عبدالله",
    Family: "رامبیان",
    PerNo: "12345678",
    Department: "قرارگاه",
  },
  {
    Rank: "گروهبانسوم",
    Name: "ابوالفظل",
    Family: "مددی",
    PerNo: "12345678",
    Department: "تاسیسات",
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

    return {
      visibleColumns: ref(["Name", "Family", "PerNo", "Rank", "Department"]),
      columns,
      rows,

      usersSearch: "",

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
    };
  },
  methods: {
    somePeopleIsSelected(evt, row) {
      console.log(row);
    },
  },
};
</script>

<style lang="sass"></style>
