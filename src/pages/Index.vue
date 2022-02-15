<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/SealOfTheIslamicRepublicOfIranAirForce.png"
      style="width: 200px; height: 200px"
    /> -->

    <q-date v-model="date" calendar="persian" today-btn></q-date>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      date: "1375/08/09",
    };
  },
});
</script>
