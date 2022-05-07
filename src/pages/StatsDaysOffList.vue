<template>
  <q-page class="q-pa-md">
    <!-- ////////////////////////////////// -->
    <!-- ////////////////////////////////// -->
    <!-- :pagination="initialPagination" -->
    <q-table
      v-if="rows"
      title="مرخصی‌ها"
      :rows="rows"
      :columns="columns"
      row-key="PerNo"
      :visible-columns="visibleColumns"
      table-header-class="bg-grey-2"
      selection="single"
      v-model:selected="selection"
    >
      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="cursor-pointer"
          @click="props.selected = true"
        >
          <q-td>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td key="ShRank" :props="props">
            {{ ranks[props.row.ShRank] }}
          </q-td>
          <q-td key="Acp_Name" :props="props">
            {{ props.row.Acp_Name }}
          </q-td>
          <q-td key="Acp_Fami" :props="props">
            {{ props.row.Acp_Fami }}
          </q-td>
          <q-td key="PerNo" :props="props">
            {{ props.row.PerNo }}
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.type === "s" ? "سالیانه" : "تشویقی" }}
          </q-td>
          <!-- <q-td key="duration" :props="props">
            {{ props.row.off_to.getTime() - props.row.off_from.getTime() }}
          </q-td> -->
          <q-td key="off_from" :props="props">
            {{ props.row.off_from }}
          </q-td>
          <q-td key="off_to" :props="props">
            {{ props.row.off_to }}
          </q-td>
          <q-td key="isApprovedByHR" :props="props">
            {{ props.row.isApprovedByHR === "0" ? "..." : "تأیید شده" }}
          </q-td>
          <q-td key="isApprovedByHead" :props="props">
            {{ props.row.isApprovedByHead === "0" ? "..." : "تأیید شده" }}
          </q-td>
          <q-td key="creator" :props="props">
            {{ props.row.creator }}
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
          to="/stats/daysoff"
          icon="add"
        >
          <q-tooltip>ثبت مرخصی</q-tooltip>
        </q-btn>

        <!-- comment this btn
        <q-btn
          class="q-ml-sm q-pl-sm q-pr-none"
          no-caps
          outline
          @click="exportPeople"
        >
          فایل csv
          <q-icon name="archive" class="q-mx-sm" />
        </q-btn> -->
      </template>
    </q-table>
    <!-- ////////////////////////////////// -->
    <!-- ////////////////////////////////// -->
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { onMounted, computed, ref, onUnmounted } from "vue";
import { ranks, offDaysTypes } from "src/store/variables";

export default {
  setup() {
    const $q = useQuasar();
    const store = useStore();

    const columns = [
      {
        name: "ShRank",
        label: "درجه",
        align: "left",
        field: (row) => ranks[row.ShRank],
        sortable: true,
      },
      {
        name: "Acp_Name",
        required: true,
        label: "نام",
        align: "left",
        field: (row) => row.Acp_Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Acp_Fami",
        label: "نشان",
        align: "left",
        field: "Acp_Fami",
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
        name: "type",
        label: "نوع مرخصی",
        align: "left",
        field: "type",
        sortable: true,
      },
      // {
      //   name: "duration",
      //   label: "مدت",
      //   align: "left",
      //   field: "duration",
      //   sortable: true,
      // },
      {
        name: "off_from",
        label: "شروع",
        align: "left",
        field: "off_from",
        sortable: true,
      },
      {
        name: "off_to",
        label: "پایان",
        align: "left",
        field: "off_to",
        sortable: true,
      },
      {
        name: "isApprovedByHead",
        label: "تأیید رئیس",
        align: "left",
        field: "isApprovedByHead",
        sortable: true,
      },
      {
        name: "isApprovedByHR",
        label: "تأیید نیرو انسانی",
        align: "left",
        field: "isApprovedByHR",
        sortable: true,
      },
      {
        name: "creator",
        label: "ایجاد کننده",
        align: "left",
        field: "creator",
        sortable: true,
      },
    ];

    const daysOffFetchPending = computed(
      () => store.state.stats.daysOffFetchPending
    );

    const daysOffList = computed(() => store.state.stats.daysOffList);
    const rows = computed(() => store.state.stats.daysOffList);

    onMounted(() => {
      fetchRecords();
    });

    const fetchRecords = () => {
      store
        .dispatch(
          "stats/fetchDaysOff"
          // ,{
          //   searchText: searchText.value,
          // }
        )
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

    onUnmounted(() => {
      store.commit("stats/setDaysOffList", []);
    });
    return {
      daysOffFetchPending,
      fetchRecords,
      daysOffList,
      columns,
      rows,
      ranks,
      offDaysTypes,
      selection: ref([]),
      visibleColumns: ref([
        "ShRank",
        "Acp_Name",
        "Acp_Fami",
        "PerNo",
        "type",
        "off_from",
        "off_to",
        "isApprovedByHR",
        "isApprovedByHead",
      ]),
    };
  },
};
</script>

<style></style>
