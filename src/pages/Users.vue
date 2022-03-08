<template>
  <div class="q-pa-md row items-start">
    <div class="col-12">
      <div class="row q-pb-sm">
        <div class="col-6 q-pr-sm">
          <q-input
            filled
            v-model="usersSearchText"
            dense
            debounce="400"
            label="جستجو"
          ></q-input>
        </div>
        <div class="col-5 q-pl-sm">
          <q-select
            filled
            v-model="selectedDepartment"
            use-input
            dense
            input-debounce="0"
            label="قسمت"
            :options="departmentOptions"
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
        </div>
        <div class="col q-pl-md">
          <div class="row">
            <q-btn to="/users/new" class="col-12" icon="add" outline>
              <q-tooltip>افزودن کاربر سامانه</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div v-if="users && users.length < 1" class="col-12">
      <div class="note-warning q-pa-md rounded-borders">کاربری یافت نشد</div>
    </div>
    <div class="col-4 q-pa-sm" v-for="(user, i) in users" :key="i">
      <q-card bordered flat>
        <q-badge
          style="border-radius: 4px"
          class="q-px-sm q-py-xs"
          :color="roles[user.Role].badgeColor"
          floating
          >{{ roles[user.Role].label }}</q-badge
        >
        <q-card-section horizontal>
          <q-card-section class="col-3 flex flex-center">
            <q-img
              class="rounded-borders"
              style="max-width: 100px"
              src="~assets/SealOfTheIslamicRepublicOfIranAirForce.png"
            />
          </q-card-section>

          <q-card-section class="col" q-pt-xs>
            <div>
              {{ ranks[user.Rank] }}
              {{ user.IsSoldier === "1" ? " وظیفه" : "" }}
            </div>
            <div style="font-size: 17px" class="q-mt-sm q-mb-xs">
              {{ user.Name + " " + user.Family }}
            </div>
            <div class="text-caption">
              {{ departmentsIndexed[user.Department] }}
            </div>
          </q-card-section>

          <q-card-section class="items-end q-py-sm row col justify-end">
            <div class="row">
              <q-btn :to="'/users/' + user.PerNo" flat icon="manage_accounts" />
              <q-btn flat dense color="negative" icon="delete" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { ranks, roles } from "src/store/variables";
import { useQuasar } from "quasar";

export default {
  setup() {
    const store = useStore();
    const $q = useQuasar();

    let usersSearchText = ref(null);

    // Departments QSelect
    let selectedDepartment = ref(null);
    let departmentOptions = ref([]);

    // Computed
    const users = computed(() => store.state.users.list);
    const departments = computed(() => store.state.user.departments);
    const departmentsIndexed = computed(() =>
      Object.assign(
        {},
        ...store.state.user.departments.map(({ label, value }) => ({
          [value]: label,
        }))
      )
    );

    const fetchUsers = () => {
      store
        .dispatch("users/fetchUsers", {
          searchText: usersSearchText.value,
          department:
            selectedDepartment && selectedDepartment.value
              ? selectedDepartment.value.value
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

    watch(usersSearchText, () => {
      fetchUsers();
    });

    watch(selectedDepartment, () => {
      fetchUsers();
    });

    onMounted(() => {
      fetchUsers();
    });

    return {
      selectedDepartment,
      departmentOptions,
      usersSearchText,
      fetchUsers,
      users,
      ranks,
      roles,
      departmentsIndexed,

      filterDepartments(val, update) {
        if (val === "") {
          update(() => {
            // filter departmentOptions
            departmentOptions.value = departments.value.map((a) => {
              return { ...a };
            });
            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val;
          departmentOptions.value = departments.value.filter((v) => {
            return v.label.indexOf(needle) > -1;
          });
        });
      },
    };
  },
};
</script>
