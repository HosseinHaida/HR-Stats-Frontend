<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-form @submit="addPerson()">
      <div class="row">
        <div class="col-4 q-pa-sm">
          <q-select
            filled
            v-model="selectedRank"
            use-input
            input-debounce="0"
            label="درجه"
            :options="rankOptions"
            @filter="filterRanks"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  درجه یافت نشد
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div
          class="q-pa-sm"
          :class="prop['class']"
          v-for="(prop, i) in newPerson"
          :key="i"
        >
          <q-input filled v-model="prop['value']" :label="prop['label']">
            <template v-if="prop['icon']" v-slot:prepend>
              <q-icon :name="prop['icon']" />
            </template>
          </q-input>
        </div>
        <div class="col-4 q-pa-sm">
          <q-select
            filled
            v-model="selectedDepartment"
            use-input
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
      </div>
      <!-- <div class="row">
        <div class="col q-pa-sm">
          <q-checkbox v-model="isSoldier" label="وظیفه" />
        </div>
      </div> -->
      <div
        style="width: 100%"
        class="row fixed-bottom justify-end q-pa-md q-mt-lg bg-grey-1"
      >
        <q-btn type="submit" size="15px" color="primary">
          افزودن
          <q-icon class="q-ml-md" name="person_add_alt_1"></q-icon>
        </q-btn>
        <q-checkbox
          class="q-mx-sm bg-white q-pr-md q-pl-xs rounded-borders"
          v-model="isSoldier"
          label="وظیفه"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { ranks } from "src/store/variables";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const $q = useQuasar();

    const departments = computed(() => store.state.user.departments);

    const newPerson = ref([
      { name: "name", label: "نام", value: ref(null), class: "col-4" },
      { name: "family", label: "نشان", value: ref(null), class: "col-4" },
      {
        name: "perNo",
        label: "شماره پرسنلی",
        value: ref(null),
        class: "col-4",
        icon: "person",
      },
      { name: "nationalID", label: "کد ملی", value: ref(null), class: "col-4" },
    ]);

    let isSoldier = ref(false);

    // Departments QSelect
    let selectedDepartment = ref(null);
    let departmentOptions = ref([]);

    // Ranks QSelect
    let selectedRank = ref(null);
    let rankOptions = ref([]);

    const addPerson = () => {
      const personToBeInserted = {
        isSoldier: isSoldier.value,
        Name:
          newPerson.value && newPerson.value ? newPerson.value[0].value : "",
        Family:
          newPerson.value && newPerson.value ? newPerson.value[1].value : "",
        NewPerNo:
          newPerson.value && newPerson.value
            ? newPerson.value[2].value
            : "00000000",
        NewNationalID:
          newPerson.value && newPerson.value ? newPerson.value[3].value : null,
        Department:
          selectedDepartment && selectedDepartment.value
            ? selectedDepartment.value.value
            : "0",
        Rank:
          selectedRank && selectedRank.value ? selectedRank.value.value : "000",
      };

      store
        .dispatch("people/insertPerson", personToBeInserted)
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
            router.push("/people");
          }
        });
    };
    return {
      addPerson,
      newPerson,
      departmentOptions,
      selectedDepartment,
      rankOptions,
      selectedRank,
      isSoldier,
      departments,
      ranks,

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

      filterRanks(val, update) {
        if (val === "") {
          update(() => {
            // filter options attached to the 5th index in newPerson
            rankOptions.value = [];
            Object.entries(ranks).reduce((r, [key, value]) => {
              r = { label: value, value: key };
              rankOptions.value.push(r);
            }, []);
            rankOptions.value.reverse();
            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val;
          rankOptions.value = [];
          Object.entries(ranks).reduce((r, [key, value]) => {
            if (value.indexOf(needle) > -1)
              rankOptions.value.push({ label: value, value: key });
          }, []);
        });
      },
    };
  },
};
</script>

<style></style>
