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
      row-key="id"
      :visible-columns="visibleColumns"
      table-header-class="bg-grey-2"
      :pagination="initialPagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props" class="cursor-pointer">
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
          <q-td key="off_from" :props="props">
            {{
              props.row.off_from.substring(props.row.off_from.indexOf("T"), 0)
            }}
          </q-td>
          <q-td key="off_to" :props="props">
            {{ props.row.off_to.substring(props.row.off_to.indexOf("T"), 0) }}
          </q-td>
          <q-td key="loc" :props="props">
            {{ props.row.loc }}
          </q-td>
          <q-td key="isApprovedByAdmin" :props="props">
            <q-btn
              class="q-px-sm"
              v-if="
                canConfirmAdmin(props.row.Department) &&
                (props.row.isApprovedByAdmin === '0' ||
                  !props.row.isApprovedByAdmin)
              "
              dense
              :color="roles['admin_head'].color"
              label="تأیید"
              @click="onApprove(props.row.id, 'admin', props.row.Department)"
            />
            <span
              v-if="
                !canConfirmAdmin(props.row.Department) &&
                (props.row.isApprovedByAdmin === '0' ||
                  !props.row.isApprovedByAdmin)
              "
            >
              در انتظار تأیید...
            </span>
            <q-icon
              v-if="
                props.row.isApprovedByAdmin &&
                props.row.isApprovedByAdmin !== '0'
              "
              name="check"
              :color="roles['admin_head'].color"
              size="sm"
            />
          </q-td>
          <q-td key="isApprovedByHead" :props="props">
            <q-btn
              class="q-px-sm"
              v-if="
                canConfirmHead(props.row.Department) &&
                (props.row.isApprovedByHead === '0' ||
                  !props.row.isApprovedByHead)
              "
              dense
              :color="roles['head'].color"
              label="تأیید"
              @click="onApprove(props.row.id, 'head', props.row.Department)"
            />
            <span
              v-if="
                !canConfirmHead(props.row.Department) &&
                (props.row.isApprovedByHead === '0' ||
                  !props.row.isApprovedByHead)
              "
            >
              در انتظار تأیید...
            </span>
            <q-icon
              v-if="
                props.row.isApprovedByHead && props.row.isApprovedByHead !== '0'
              "
              name="check"
              :color="roles['head'].color"
              size="sm"
            />
          </q-td>
          <q-td key="isApprovedByHR" :props="props">
            <q-btn
              class="q-px-sm"
              v-if="
                canConfirmHR &&
                (props.row.isApprovedByHR === '0' || !props.row.isApprovedByHR)
              "
              dense
              color="primary"
              label="تأیید"
              @click="onApprove(props.row.id, 'hr', props.row.Department)"
            />

            <span
              v-if="
                !canConfirmHR &&
                (props.row.isApprovedByHR === '0' || !props.row.isApprovedByHR)
              "
            >
              در انتظار تأیید...
            </span>
            <q-icon
              v-if="
                props.row.isApprovedByHR && props.row.isApprovedByHR !== '0'
              "
              name="check"
              color="primary"
              size="sm"
            />
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
          v-model="daysOffSearchText"
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
import { onMounted, computed, ref, onUnmounted, watch } from "vue";
import { ranks, roles } from "src/store/variables";

export default {
  setup() {
    const $q = useQuasar();
    const store = useStore();

    let selectedDepartments = ref(null);
    let daysOffSearchText = ref(null);

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
        field: "Acp_Name",
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
        name: "loc",
        label: "مقصد",
        align: "left",
        field: "loc",
        sortable: true,
      },
      {
        name: "isApprovedByAdmin",
        label: "تأیید اداری",
        align: "left",
        field: "isApprovedByAdmin",
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
    const user = computed(() => store.state.user.data);

    const canConfirmHR = computed(() => {
      return (
        user.value &&
        user.value.Department === "23" &&
        user.value.permissions &&
        user.value.permissions.authedDepartments &&
        user.value.permissions.authedDepartments.findIndex((depRole) => {
          return (
            (depRole.role === "can_do_all" ||
              depRole.role === "head" ||
              depRole.role === "succ") &&
            depRole.value === "23"
          );
        }) !== -1
      );
    });

    const canConfirmHead = (personDep) => {
      return (
        user.value &&
        user.value.Department === personDep &&
        user.value.permissions &&
        user.value.permissions.authedDepartments &&
        user.value.permissions.authedDepartments.findIndex((depRole) => {
          return (
            (depRole.role === "can_do_all" ||
              depRole.role === "head" ||
              depRole.role === "succ") &&
            depRole.value === personDep
          );
        }) !== -1
      );
    };

    const canConfirmAdmin = (personDep) => {
      return (
        user.value &&
        user.value.Department === personDep &&
        user.value.permissions &&
        user.value.permissions.authedDepartments &&
        user.value.permissions.authedDepartments.findIndex((depRole) => {
          return (
            (depRole.role === "can_do_all" ||
              depRole.role === "admin_head" ||
              depRole.role === "admin_succ") &&
            depRole.value === personDep
          );
        }) !== -1
      );
    };

    onMounted(() => {
      fetchRecords();
    });

    watch(daysOffSearchText, (value) => {
      fetchRecords();
    });

    watch(selectedDepartments, (value) => {
      fetchRecords();
    });

    const fetchRecords = () => {
      let selectedDepartmentsIDs = [];
      if (selectedDepartments.value) {
        selectedDepartments.value.forEach((dep) => {
          selectedDepartmentsIDs.push(dep.value);
        });
      }
      store
        .dispatch("stats/fetchDaysOff", {
          searchText: daysOffSearchText.value,
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

    const onApprove = (id, role, dep) => {
      store
        .dispatch("stats/approveADayOff", {
          id,
          role,
          dep,
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
            fetchRecords();
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
      roles,
      user,
      selectedDepartments,
      daysOffSearchText,
      canConfirmHR,
      canConfirmHead,
      canConfirmAdmin,
      selection: ref([]),
      onApprove,
      visibleColumns: ref([
        "ShRank",
        "Acp_Name",
        "Acp_Fami",
        "PerNo",
        "type",
        "off_from",
        "off_to",
        "loc",
        "isApprovedByAdmin",
        "isApprovedByHead",
        "isApprovedByHR",
      ]),
      initialPagination: ref({
        sortBy: "desc",
        descending: false,
        rowsPerPage: 10,
      }),
    };
  },
};
</script>

<style></style>
