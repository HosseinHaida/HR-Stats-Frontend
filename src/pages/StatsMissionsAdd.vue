<template>
  <q-page class="q-pa-md">
    <div
      style="font-size: 20px"
      class="q-mb-md q-pa-sm bg-grey-1 rounded-borders text-grey-6"
    >
      <span class="text-grey-6">
        <q-icon name="airplane_ticket" size="25px" class="q-mr-sm" />
        <span style="font-size: 18px"> ایجاد ماموریت </span>
      </span>
    </div>

    <q-form @submit="saveMission" v-if="user">
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col-12 q-pr-sm">
              <q-select
                v-model="who"
                label="نام"
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
              </q-select>
            </div>

            <div class="q-mt-md col-6 q-pr-sm">
              <q-input filled v-model="missionLoc" label="محل ماموریت" />
            </div>

            <div class="q-mt-md col-6 q-px-sm">
              <q-input
                filled
                v-model="transportationType"
                label="وسیله عزیمت"
              />
            </div>

            <div class="col-12 q-pr-sm q-mt-md">
              <q-input
                disable
                filled
                :model-value="departments[user.Department]"
                label="قسمت"
              />
            </div>
          </div>
        </div>

        <div class="col q-pl-sm">
          <q-date
            v-model="missionDuration"
            calendar="persian"
            subtitle="تاریخ (بازه)"
            today-btn
            range
            style="width: 100%"
          />
        </div>
      </div>

      <div
        style="width: 100%"
        class="row fixed-bottom justify-end q-pa-md q-mt-lg bg-grey-1"
      >
        <q-btn
          :loading="missionAddPending"
          size="15px"
          type="submit"
          color="primary"
        >
          <q-icon name="save" class="q-mr-sm" />
          ذخیره
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ranks } from "../store/variables.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    let who = ref(null);

    let missionDuration = ref(null);
    let missionLoc = ref(null);
    let transportationType = ref(null);

    let peopleOptions = ref([]);

    const departments = computed(() => store.getters["user/getDepartments"]);

    const people = computed(() => store.state.people.list);
    const user = computed(() => store.state.user.data);
    const missionAddPending = computed(
      () => store.state.stats.missionAddPending
    );

    const fetchPeople = () => {
      store
        .dispatch("people/fetchPeople", {
          searchText: "",
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

    onUnmounted(() => {
      store.commit("people/setPeopleList", []);
    });

    onMounted(() => {
      fetchPeople();
    });

    const saveMission = () => {
      if (
        !who.value ||
        !missionDuration.value ||
        !missionLoc.value ||
        !transportationType.value
      ) {
        $q.notify({
          color: "red-5",
          icon: "warning",
          message: "لطفا قسمت‌های خالی را پر کنید",
        });
        return;
      }

      store
        .dispatch("stats/addMission", {
          data: {
            who: who.value.value,
            missionDate: !missionDuration.value.from
              ? missionDuration.value
              : null,
            missionDurationFrom: missionDuration.value.from,
            missionDurationTo: missionDuration.value.to,
            missionLoc: missionLoc.value,
            transportationType: transportationType.value,
          },
        })
        .then(({ status, message }) => {
          if (status === "error") {
            $q.notify({
              color: "red-5",
              icon: "warning",
              message: message,
            });
          } else {
            $q.notify({
              color: "green-4",
              icon: "cloud_done",
              message: "ماموریت با موفقیت ثبت شد",
            });
            router.push("/stats/missions");
          }
        });
    };

    return {
      user,
      people,
      peopleOptions,
      fetchPeople,
      who,
      filterPeople,
      ranks,
      departments,
      missionDuration,
      missionLoc,
      transportationType,
      saveMission,
      missionAddPending,
    };
  },
};
</script>

<style></style>
