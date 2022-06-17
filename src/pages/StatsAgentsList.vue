<template>
  <q-page class="q-pa-md">
    <q-table
      v-if="rows"
      title="مامورها"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :visible-columns="visibleColumns"
      table-header-class="bg-grey-2"
      :loading="fetchAgentsPending"
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
          <q-td key="start_date" :props="props">
            {{
              props.row.start_date.substring(
                props.row.start_date.indexOf("T"),
                0
              )
            }}
          </q-td>
          <q-td key="end_date" :props="props">
            {{
              props.row.has_end === "0"
                ? "ندارد"
                : props.row.end_date.substring(
                    props.row.end_date.indexOf("T"),
                    0
                  )
            }}
          </q-td>
          <q-td key="duration" :props="props">
            {{ props.row.has_end === "0" ? "نا معلوم" : props.row.duration }}
          </q-td>
          <q-td key="location" :props="props">
            {{ props.row.location }}
          </q-td>
          <q-td key="is_external" :props="props">
            {{ props.row.is_external === "1" ? "دور" : "نزدیک" }}
          </q-td>
          <q-td key="is_approved_by_head" :props="props">
            <q-btn
              class="q-px-sm"
              v-if="
                canConfirmHead(props.row.Department) &&
                (props.row.is_approved_by_head === '0' ||
                  !props.row.is_approved_by_head)
              "
              dense
              :color="roles['head'].color"
              label="تأیید"
              @click="onApprove(props.row.id, 'head', props.row.Department)"
            />
            <span
              v-if="
                !canConfirmHead(props.row.Department) &&
                (props.row.is_approved_by_head === '0' ||
                  !props.row.is_approved_by_head)
              "
            >
              در انتظار تأیید...
            </span>
            <q-icon
              v-if="
                props.row.is_approved_by_head &&
                props.row.is_approved_by_head !== '0'
              "
              name="check"
              :color="roles['head'].color"
              size="sm"
            >
              <q-tooltip class="approve-tooltip">
                {{ props.row.is_approved_by_head }}
              </q-tooltip>
            </q-icon>
          </q-td>
          <q-td key="created_by" :props="props">
            {{ props.row.created_by }}
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
          v-model="agentsSearchText"
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
          label="مامور نزدیک"
          class="q-ml-sm"
          color="primary"
          to="/stats/agents/add/internal"
          icon="add"
        >
          <q-tooltip>ثبت مامور نزدیک</q-tooltip>
        </q-btn>
        <q-btn
          v-if="user && user.Department === '23'"
          outline
          label="مامور دور"
          class="q-ml-sm"
          color="primary"
          to="/stats/agents/add/external"
          icon="add"
        >
          <q-tooltip>ثبت مامور دور</q-tooltip>
        </q-btn>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { onMounted, computed, ref, onUnmounted, watch } from "vue";
import { ranks, roles, offTypes } from "src/store/variables";

export default {
  setup() {
    const $q = useQuasar();
    const store = useStore();

    let selectedDepartments = ref(null);
    let agentsSearchText = ref(null);

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
        name: "start_date",
        label: "شروع",
        align: "left",
        field: "start_date",
        sortable: true,
      },
      {
        name: "end_date",
        label: "پایان",
        align: "left",
        field: "end_date",
        sortable: true,
      },
      {
        name: "duration",
        label: "تعداد روز",
        align: "left",
        field: "duration",
        sortable: true,
      },
      {
        name: "location",
        label: "محل ماموریت",
        align: "left",
        field: "location",
        sortable: true,
      },
      {
        name: "is_external",
        label: "نوع مامور",
        align: "left",
        field: "is_external",
        sortable: true,
      },
      {
        name: "is_approved_by_head",
        label: "تأیید رئیس",
        align: "left",
        field: "is_approved_by_head",
        sortable: true,
      },
      // {
      //   name: "isApprovedByHR",
      //   label: "تأیید نیرو انسانی",
      //   align: "left",
      //   field: "isApprovedByHR",
      //   sortable: true,
      // },
      {
        name: "created_by",
        label: "ایجاد کننده",
        align: "left",
        field: "created_by",
        sortable: true,
      },
    ];

    const rows = computed(() => store.state.stats.agentsList);
    const user = computed(() => store.state.user.data);
    const fetchAgentsPending = computed(
      () => store.state.stats.fetchAgentsPending
    );

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

    onMounted(() => {
      fetchRecords();
    });

    watch(agentsSearchText, (value) => {
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
        .dispatch("stats/fetchAgents", {
          searchText: agentsSearchText.value,
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
        .dispatch("stats/approveAgent", {
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
      store.commit("stats/setAgentsList", []);
    });
    return {
      fetchRecords,
      columns,
      rows,
      ranks,
      offTypes,
      roles,
      user,
      fetchAgentsPending,
      selectedDepartments,
      agentsSearchText,
      canConfirmHead,
      selection: ref([]),
      onApprove,
      visibleColumns: ref([
        "ShRank",
        "Acp_Name",
        "Acp_Fami",
        "PerNo",
        "start_date",
        "end_date",
        "duration",
        "location",
        "is_approved_by_head",
        "is_external",
        "has_end",
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
