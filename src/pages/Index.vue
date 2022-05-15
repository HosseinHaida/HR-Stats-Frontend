<template>
  <q-page>
    <q-carousel
      style="height: calc(100vh - 50px)"
      animated
      v-model="slide"
      thumbnails
      :autoplay="true"
    >
      <q-carousel-slide :name="1" img-src="~assets/1.jpg" />
      <q-carousel-slide :name="2" img-src="~assets/2.jpg" />
      <q-carousel-slide :name="4" img-src="~assets/4.jpg" />
    </q-carousel>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
// import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageIndex",
  setup() {
    // const router = useRouter();

    return {
      slide: ref(1),
      // goTo(where) {
      //   router.push(where);
      // },
    };
  },
});
</script>

<style lang="sass" scoped>
.main-page-tiles--header
  cursor: pointer
.features-right-border
  border-left: 2px solid $blue-grey
</style>
