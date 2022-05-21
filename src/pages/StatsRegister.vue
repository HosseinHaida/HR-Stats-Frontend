<template>
  <q-page v-if="user && user.permissions" class="q-pa-md row items-start">
    <q-card
      class="col-12 q-pa-md"
      v-if="selectedAuthedDepartment && selectedAuthedDepartment.value"
    >
      <div class="col-12 row justify-between items-center text-bold">
        <span>
          <span class="text-grey-6">
            <q-icon name="note_alt" size="25px" class="q-mr-sm" />
            <span style="font-size: 18px"> ثبت آمار روزانه </span>
          </span>
        </span>
        <span class="text-h6">
          {{ selectedAuthedDepartment.label }}
        </span>
        <span style="font-size: 15px" class="text-grey-6 q-mr-sm">
          {{ weekDay }} -
          {{ today }}
        </span>
      </div>
      <div class="col-12 q-mt-xs">
        <div class="q-pa-md">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            flat
            table-header-class="bg-grey-2"
            binary-state-sort
            :visible-columns="visibleColumns"
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
                class="q-ml-md col"
                v-model="peopleSearchText"
                dense
                filled
                debounce="400"
                label="جستجو"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
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
                <q-td key="IsSoldier" :props="props">
                  {{ props.row.IsSoldier === "1" ? "وظیفه" : "پایور" }}
                </q-td>
                <q-td key="State" :props="props">
                  <span
                    v-if="personnelStatus[props.row.PerNo]"
                    class="q-px-sm q-py-xs"
                  >
                    <!--  rounded-borders text-positive border-positive -->
                    <!-- <q-icon
                      name="done"
                      color="positive"
                      size="xs"
                      style="margin-top: -2px"
                    />
                    {{ personnelStatus[props.row.PerNo]["label"]  }} -->
                    <q-btn-group>
                      <q-btn
                        :icon="isHazer(props.row.PerNo) ? 'check' : 'circle'"
                        :color="
                          isHazer(props.row.PerNo) ? 'positive' : 'grey-5'
                        "
                        @click="
                          personnelStatus[props.row.PerNo] = {
                            value: 'Hazer',
                            label: 'حاضر',
                          }
                        "
                        push
                        label="حاضر"
                      />
                      <q-btn
                        :icon="isGhayeb(props.row.PerNo) ? 'close' : 'circle'"
                        :color="
                          isGhayeb(props.row.PerNo) ? 'negative' : 'grey-5'
                        "
                        @click="
                          personnelStatus[props.row.PerNo] = {
                            value: 'Ghayeb',
                            label: 'غایب',
                          }
                        "
                        push
                        label="غایب"
                      />
                    </q-btn-group>
                  </span>
                  <!-- <q-popup-edit
                    auto-save
                    :ref="'popup_' + props.row.PerNo"
                    v-model="props.row.State"
                  >
                    <q-select
                      filled
                      v-model="personnelStatus[props.row.PerNo]"
                      use-input
                      dense
                      input-debounce="0"
                      label="ثبت وضعیت"
                      :options="statusOptions"
                      @filter="filterStatuses"
                    >
                      <template v-slot:prepend>
                        <q-icon name="label" />
                      </template>
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            وضعیت یافت نشد
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </q-popup-edit> -->
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <q-card-actions>
        <q-btn
          :loading="registerPending"
          @click="onStatsRegister()"
          color="primary"
        >
          <q-icon class="q-mr-xs" name="done_all" />
          تایید و ذخیره
        </q-btn>
        <!-- <q-btn color="secondary"> ذخیره پیش نویس </q-btn> -->
      </q-card-actions>
    </q-card>

    <!-- Placeholder when no department is selected -->
    <q-card v-else class="col-12 q-pa-md">
      <div class="row justify-between q-gutter-md q-mb-md">
        <div class="col-3 q-py-xs text-grey-4 bg-grey-4 rounded-borders">_</div>
        <div class="col-2 q-py-xs text-grey-4 bg-grey-4 rounded-borders">_</div>
        <div class="col-3 q-py-xs text-grey-4 bg-grey-4 rounded-borders">_</div>
      </div>
      <div class="row q-mt-xl justify-center q-gutter-sm">
        <div class="col-2 q-py-sm text-grey-4 bg-grey-4 rounded-borders">_</div>
        <div class="col-9 q-py-sm text-grey-4 bg-grey-4 rounded-borders">_</div>
      </div>
      <div class="row q-mt-md justify-center q-pb-xl q-gutter-sm">
        <div
          v-for="(tempTableCol, i) in 50"
          :key="i"
          class="col-2 q-py-xs text-grey-4 bg-grey-4 rounded-borders"
        >
          _
        </div>
        <div
          class="col-12 q-mt-lg q-py-xs text-grey-4 bg-grey-4 rounded-borders"
        >
          _
        </div>
      </div>
    </q-card>

    <q-dialog persistent v-model="authedDepartmentsSelectToggle">
      <q-card
        @click="selectAuthedDepartment(authedDep)"
        class="q-mr-sm bg-primary text-white cursor-pointer"
        v-for="(authedDep, i) in user.permissions.authedDepartments"
        :key="i"
      >
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ departments[authedDep.value] }}
            </div>
            <q-badge class="q-ml-sm" square>
              - {{ roles[authedDep.role].label }}
            </q-badge>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    {{ todaysStats }}
  </q-page>
</template>

<script>
import { computed, ref, onBeforeMount, watch, toRefs } from "vue";
import { useStore } from "vuex";
import { roles, ranks, statuses } from "src/store/variables";
import { useQuasar } from "quasar";

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
  // {
  //   name: "Department",
  //   label: "قسمت",
  //   align: "left",
  //   field: (row) => departments.value[row.Department],
  //   sortable: true,
  // },
  {
    name: "IsSoldier",
    label: "نوع",
    align: "left",
    field: "IsSoldier",
    sortable: true,
  },
  {
    name: "State",
    label: "وضعیت",
    align: "left",
    field: "State",
    sortable: true,
  },
];

export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user.data);
    const $q = useQuasar();

    const weekDayNames = [
      "شنبه",
      "یک شنبه",
      "دو شنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنج شنبه",
      "جمعه",
    ];

    const today = ref(
      new Date().toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    const weekDay = ref(weekDayNames[new Date(Date.now()).getDay() + 1]);

    let personnelStatus = ref({});
    let statusOptions = ref([]);

    const authedDepartmentsSelectToggle = ref(false);
    const selectedAuthedDepartment = ref(null);

    const rows = computed(() => store.state.people.list);
    const departments = computed(() => store.getters["user/getDepartments"]);
    const registerPending = computed(() => store.state.stats.registerPending);
    const todaysStats = computed(() => store.state.stats.todaysStats);

    const isHazer = (perNo) =>
      personnelStatus.value[perNo] &&
      personnelStatus.value[perNo]["value"] === "Hazer";
    const isGhayeb = (perNo) =>
      personnelStatus.value[perNo] &&
      personnelStatus.value[perNo]["value"] === "Ghayeb";

    const selectAuthedDepartment = (selection) => {
      selectedAuthedDepartment.value = selection;
      authedDepartmentsSelectToggle.value = false;
      fetchPeople();
      fetchTodaysStatsIfAlreadySet();
    };

    let peopleSearchText = ref(null);

    const checkUserDepartmentsAndSet = async () => {
      if (user.value.permissions.authedDepartments.length > 1) {
        authedDepartmentsSelectToggle.value = true;
      } else {
        selectedAuthedDepartment.value =
          user.value.permissions.authedDepartments[0];
        fetchPeople();
      }
    };

    onBeforeMount(async () => {
      if (user.value && user.value.permissions) {
        checkUserDepartmentsAndSet();
      } else {
        await store.dispatch("user/fetchUserData").then(() => {
          checkUserDepartmentsAndSet();
        });
        fetchPeople();
      }
      fetchTodaysStatsIfAlreadySet();
    });

    const fetchTodaysStatsIfAlreadySet = () => {
      if (!selectedAuthedDepartment.value) return;
      store
        .dispatch("stats/fetchAlreadySetStats", {
          department: selectedAuthedDepartment.value["value"],
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

    const fetchPeople = () => {
      if (!selectedAuthedDepartment.value) return;
      store
        .dispatch("people/fetchPeople", {
          searchText: peopleSearchText.value,
          departments: selectedAuthedDepartment.value["value"],
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

    watch(todaysStats, (value) => {
      console.log("samoaleikom");
    });

    watch(rows, (value) => {
      value.forEach((person) => {
        if (!personnelStatus.value[person.PerNo]) {
          personnelStatus.value[person.PerNo] = {
            label: "حاضر",
            value: "Hazer",
          };
        }
      });
    });

    return {
      user,
      today,
      weekDay,
      authedDepartmentsSelectToggle,
      roles,
      departments,
      selectedAuthedDepartment,
      columns,
      ranks,
      personnelStatus,
      statusOptions,
      registerPending,
      todaysStats,
      visibleColumns: ref([
        "Name",
        "Family",
        "PerNo",
        "Rank",
        "IsSoldier",
        "State",
      ]),
      rows: ref(rows),
      peopleSearchText,
      selectAuthedDepartment,
      fetchPeople,
      isHazer,
      isGhayeb,
      onStatsRegister() {
        // console.log(personnelStatus.value);
        store
          .dispatch("stats/register", {
            stats: personnelStatus.value,
            department: selectedAuthedDepartment.value["value"],
          })
          .then(({ status, message, delay }) => {
            if (status === "error") {
              $q.notify({
                color: "red-5",
                icon: "warning",
                message: message,
              });
            } else if (status === "success") {
              if (delay)
                $q.notify({
                  color: "warning",
                  icon: "cloud_done",
                  message: "آمار قسمت با وجود تاخیر ثبت شد",
                });
              else
                $q.notify({
                  color: "green-4",
                  icon: "cloud_done",
                  message: message,
                });
            }
          });
      },

      filterStatuses(val, update) {
        if (val === "") {
          update(() => {
            // filter options attached to the 5th index in newUser
            statusOptions.value = [];
            Object.entries(statuses).reduce((r, [key, value]) => {
              r = { label: value, value: key };
              statusOptions.value.push(r);
            }, []);
          });
          return;
        }

        update(() => {
          const needle = val;
          statusOptions.value = [];
          Object.entries(statuses).reduce((r, [key, value]) => {
            if (value.indexOf(needle) > -1)
              statusOptions.value.push({ label: value, value: key });
          }, []);
        });
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.border-positive
  border: 1px solid $positive
</style>
