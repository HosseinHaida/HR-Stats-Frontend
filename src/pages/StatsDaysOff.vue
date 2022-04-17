<template>
  <q-page class="q-pa-md">
    <q-form>
      <div class="row">
        <div class="col">
          <q-select
            v-model="searchText"
            label="درخواست کننده"
            dense
            filled
            :options="peopleOptions"
            use-input
            @filter="filterPeople"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  فرد مورد نظر یافت نشد
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:after>
              <q-btn :loading="findingPersonPending" push @click="findPerson()">
                <q-icon name="search" />
              </q-btn>
            </template>
          </q-select>
        </div>
      </div>
      <div class="row">
        {{ personFetched }}
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ranks } from "../store/variables.js";

export default {
  setup() {
    const store = useStore();
    const $q = useQuasar();

    let personID = ref(null);
    let personFetched = ref(null);
    let searchText = ref(null);

    let peopleOptions = ref([]);

    const findPerson = () => {
      store
        .dispatch("people/findPerson", {
          id: personID.value,
        })
        .then(({ status, message, fetchedPerson }) => {
          if (status === "success") {
            personFetched.value = fetchedPerson;
          } else if (status === "error") {
            $q.notify({
              color: "red-5",
              icon: "warning",
              message: message,
            });
          }
        });
    };

    const people = computed(() => store.state.people.list);
    const user = computed(() => store.state.user.data);

    const fetchPeople = () => {
      // console.log(searchText.value);
      // console.log(user.value.permissions.authedDepartments);
      store
        .dispatch("people/fetchPeople", {
          searchText: searchText.value,
          departments: "based_on_auth",
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

    const filterPeople = (val, update) => {
      if (val === "") {
        update(() => {
          // filter peopleOptions
          peopleOptions.value = people.value.map((a) => {
            return {
              value: a.PerNo,
              label: `${ranks[a.Rank]} ${a.Name} ${a.Family} - ${a.PerNo}`,
            };
          });
        });
        return;
      }

      update(() => {
        const needle = val;
        let temp = [];
        peopleOptions.value = people.value.filter((v) => {
          if (
            v.Name.indexOf(needle) > -1 ||
            v.Family.indexOf(needle) > -1 ||
            v.PerNo.indexOf(needle) > -1
          ) {
            temp.push({
              value: v.PerNo,
              label: `${ranks[v.Rank]} ${v.Name} ${v.Family} - ${v.PerNo}`,
            });
            return;
          }
        });
        peopleOptions.value = temp;
      });
    };

    watch(searchText, (value) => {
      fetchPeople();
    });

    onUnmounted(() => {
      store.commit("people/setPeopleList", []);
    });

    onMounted(() => {
      fetchPeople();
    });

    const findingPersonPending = computed(
      () => store.state.people.findingPersonPending
    );

    return {
      personID,
      personFetched,
      findPerson,
      findingPersonPending,
      user,
      people,
      peopleOptions,
      fetchPeople,
      searchText,
      filterPeople,
    };
  },
};
</script>

<style></style>
