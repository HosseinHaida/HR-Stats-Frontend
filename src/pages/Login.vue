<template>
  <QPage
    class="window-height window-width row justify-center items-center bg-grey-1"
  >
    <q-form @submit="onSubmit" class="column">
      <div class="row">
        <q-card class="login-card q-pa-sm" flat bordered>
          <q-card-section class="row justify-center">
            <h5
              style="text-shadow: 2px 2px 2px #cccccc"
              class="text-h5 q-my-none text-bold"
            >
              آمار و اطلاعات پرسنل
            </h5>
            <div class="text-bold text-grey-9 q-mt-xs">
              فرماندهی آموزش های هوایی شهید خضرایی
            </div>
          </q-card-section>
          <q-card-section class="row justify-center">
            <img
              alt="Quasar logo"
              src="~assets/SealOfTheIslamicRepublicOfIranAirForce.png"
              style="width: 170px; height: 170px"
            />
          </q-card-section>

          <q-card-section class="q-pa-sm q-gutter-sm q-mb-sm">
            <q-input filled v-model="userID" label="شماره کارگزینی">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              filled
              v-model="password"
              type="password"
              label="کلمه عبور"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions>
            <q-btn
              :loading="signinPending"
              color="primary"
              type="submit"
              align="around"
              class="btn-fixed-width"
              label="ورود"
              icon="login"
            >
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-form>
  </QPage>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const $q = useQuasar();

    const userID = ref(null);
    const password = ref(null);

    const signinPending = computed(() => store.state.user.signinPending);

    return {
      userID,
      password,
      signinPending,

      onSubmit() {
        store
          .dispatch("user/signin", {
            userID: userID.value,
            password: password.value,
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
                icon: "login",
                message: message,
              });
              router.push("/");
            }
          });
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  width: 350px
.btn-fixed-width
  width: 90px
</style>
