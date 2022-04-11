<template>
  <q-page class="q-pa-md">
    <q-form>
      <div class="row">
        <div class="col-6">
          <q-input v-model="personID" label="درخواست کننده" dense filled>
            <template v-slot:after>
              <q-btn :loading="findingPersonPending" push @click="findPerson()">
                <q-icon name="search" />
              </q-btn>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        {{ personFetched }}
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const store = useStore();
    const $q = useQuasar();

    let personID = ref(null);
    let personFetched = ref(null);

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

    const findingPersonPending = computed(
      () => store.state.people.findingPersonPending
    );

    return {
      personID,
      personFetched,
      findPerson,
      findingPersonPending,
    };
  },
};
</script>

<style></style>
