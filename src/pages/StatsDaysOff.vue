<template>
  <q-page class="q-pa-md">
    <div
      style="font-size: 20px"
      class="q-mb-md q-pa-sm bg-grey-1 rounded-borders text-grey-6"
    >
      <span class="text-grey-6">
        <q-icon name="receipt" size="25px" class="q-mr-sm" />
        <span style="font-size: 18px"> ثبت مرخصی </span>
      </span>
    </div>

    <q-form @submit="saveOffDays">
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="col-6 q-pr-sm">
              <!-- <q-select
                v-model="requester"
                label="درخواست کننده"
                filled
                :options="peopleOptions"
                use-input
                @filter="filterPeople"
                :loading="findingPersonPending"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      فرد مورد نظر یافت نشد
                    </q-item-section>
                  </q-item>
                </template>
              </q-select> -->
              <q-input
                filled
                :model-value="
                  ranks[user.Rank] +
                  ' ' +
                  user.Name +
                  ' ' +
                  user.Family +
                  ' - ' +
                  user.PerNo
                "
                label="درخواست کننده"
                disable
              >
              </q-input>
            </div>
            <div class="col-6 q-px-sm">
              <q-select
                v-model="successor"
                label="جانشین"
                filled
                :options="peopleOptions"
                use-input
                @filter="filterPeople"
                :loading="findingPersonPending"
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
              <q-input filled v-model="daysOffLoc" label="مقصد" />
            </div>

            <div class="q-mt-md col-6 q-px-sm">
              <q-input
                filled
                v-model="daysOffSpecLoc"
                label="نشانی محل استفاده"
              />
            </div>

            <div class="q-mt-md col-6 q-pr-sm">
              <q-input
                filled
                v-model="daysOffTransit"
                label="رفت و برگشت"
                type="number"
                :min="0"
              />
            </div>

            <div class="q-mt-md col-6 q-px-sm">
              <q-select
                filled
                :options="offDaysTypes"
                v-model="daysOffType"
                label="نوع مرخصی"
              />
            </div>

            <div class="col-6 q-pr-sm q-mt-md">
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
            v-model="daysOffDuration"
            calendar="persian"
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
          :loading="daysOffPending"
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
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ranks, offDaysTypes } from "../store/variables.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    let successor = ref(null);

    let daysOffDuration = ref(null);
    let daysOffTransit = ref(null);
    let daysOffType = ref(null);
    let daysOffLoc = ref(null);
    let daysOffSpecLoc = ref(null);

    let peopleOptions = ref([]);

    const departments = computed(() => store.getters["user/getDepartments"]);

    // const findPerson = () => {
    //   store
    //     .dispatch("people/findPerson", {
    //       id: successor.value.value,
    //     })
    //     .then(({ status, message, person }) => {
    //       if (status === "success") {
    //         if (flag === 0) personFetched.value = person;
    //       } else if (status === "error") {
    //         $q.notify({
    //           color: "red-5",
    //           icon: "warning",
    //           message: message,
    //         });
    //       }
    //     });
    // };

    const people = computed(() => store.state.people.list);
    const user = computed(() => store.state.user.data);
    const daysOffPending = computed(() => store.state.stats.daysOffPending);

    const fetchPeople = () => {
      store
        // HR Users are also only able to insert
        // days-off for their own department staff
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

    // watch(successor, (value) => {
    //   if (value && value.value) {
    //     findSuccessor();
    //   }
    // });

    onUnmounted(() => {
      store.commit("people/setPeopleList", []);
    });

    onMounted(() => {
      fetchPeople();
    });

    const saveOffDays = () => {
      if (
        !successor.value ||
        !daysOffDuration.value ||
        !daysOffDuration.value ||
        !daysOffTransit.value ||
        !daysOffType.value ||
        !daysOffLoc.value ||
        !daysOffSpecLoc.value
      ) {
        $q.notify({
          color: "red-5",
          icon: "warning",
          message: "لطفا قسمت‌های خالی را پر کنید",
        });
        return;
      }

      store
        .dispatch("stats/setDaysOff", {
          data: {
            successor: successor.value.value,
            daysOffDate: !daysOffDuration.value.from
              ? daysOffDuration.value
              : null,
            daysOffDurationFrom: daysOffDuration.value.from,
            daysOffDurationTo: daysOffDuration.value.to,
            daysOffTransit: daysOffTransit.value,
            daysOffType: daysOffType.value.value,
            daysOffLoc: daysOffLoc.value,
            daysOffSpecLoc: daysOffSpecLoc.value,
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
              message: "مرخصی با موفقیت ثبت شد",
            });
            router.push("/stats/daysoff/list");
          }
        });
    };

    const findingPersonPending = computed(
      () => store.state.people.findingPersonPending
    );

    return {
      // personFetched,
      // findPerson,
      findingPersonPending,
      user,
      people,
      peopleOptions,
      fetchPeople,
      successor,
      filterPeople,
      ranks,
      departments,
      daysOffDuration,
      daysOffTransit,
      daysOffType,
      daysOffLoc,
      daysOffSpecLoc,
      offDaysTypes,
      saveOffDays,
      daysOffPending,
    };
  },
};
</script>

<style></style>
