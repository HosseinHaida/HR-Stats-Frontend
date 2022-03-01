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
import { ref } from "vue";

export default {
  setup() {
    const userID = ref("");
    const password = ref("");

    return {
      userID,
      password,
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("user/signin", {
          userID: this.userID,
          password: this.password,
        })
        .then(({ status, message }) => {
          if (status === "error") {
            this.$q.notify({
              color: "red-5",
              icon: "warning",
              message: message,
            });
          } else if (status === "success") {
            this.$q.notify({
              color: "green-4",
              icon: "login",
              message: message,
            });
            this.$router.push("/");
          }
        });
    },
  },
  computed: {
    signinPending() {
      return this.$store.state.user.signinPending;
    },
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
