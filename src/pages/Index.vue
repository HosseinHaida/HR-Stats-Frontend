<template>
  <q-page class="q-pa-md row items-start q-gutter-md">
    <!-- <img
      alt="Quasar logo"
      src="~assets/SealOfTheIslamicRepublicOfIranAirForce.png"
      style="width: 200px; height: 200px"
    /> -->

    <q-card class="main-page-tiles">
      <q-card-section
        class="bg-deep-purple-9 text-white main-page-tiles--header"
        @click="goTo('/users')"
      >
        <div class="text-h6">کاربران</div>
      </q-card-section>

      <q-card-actions vertical align="left">
        <q-btn to="/users" color="deep-purple-9" class="q-pr-sm" flat>
          <q-icon class="q-mr-sm" name="view_list" />
          مشاهده لیست
        </q-btn>
        <q-btn color="deep-purple-9" class="q-pr-sm" flat>
          <q-icon class="q-mr-sm" name="person_add" />
          افزودن
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="main-page-tiles">
      <q-card-section
        @click="goTo('/people')"
        class="bg-teal-9 text-white main-page-tiles--header"
      >
        <div>
          <span class="text-h6"> پرسنل </span>
          <span>(پایور و وظیفه)</span>
        </div>
      </q-card-section>

      <q-card-actions vertical align="left">
        <q-btn to="/people" color="teal-9" class="q-pr-sm" flat>
          <q-icon class="q-mr-sm" name="view_comfy" />
          مشاهده لیست
        </q-btn>
        <q-btn color="teal-9" class="q-pr-sm" flat>
          <q-icon class="q-mr-sm" name="group_add" />
          افزودن
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="main-page-tiles">
      <q-card-section
        @click="goTo('/stats')"
        class="bg-primary text-white main-page-tiles--header"
      >
        <div class="text-h6">آمار</div>
      </q-card-section>

      <q-card-actions vertical align="left">
        <q-btn color="primary" class="q-pr-sm" flat>
          <q-icon class="q-mr-sm" name="view_module" />
          مشاهده
        </q-btn>
        <q-btn color="primary" flat class="q-pr-sm">
          <q-icon class="q-mr-sm" name="library_add" />
          ثبت
        </q-btn>
      </q-card-actions>
    </q-card>

    <!-- <q-date v-model="date" calendar="persian" today-btn></q-date> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageIndex",
  setup() {
    const router = useRouter();
    return {
      // date: "1375/08/09",
      goTo(where) {
        router.push(where);
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.main-page-tiles
  min-width: 250px
.main-page-tiles--header
  cursor: pointer
</style>
