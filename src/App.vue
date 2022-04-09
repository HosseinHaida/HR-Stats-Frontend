<template>
  <router-view />
</template>
<script>
import { defineComponent, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    onBeforeMount(() => {
      store.dispatch("user/fetchUserData").then(({ status, message }) => {
        if (status === "error") {
          $q.notify({
            color: "red-5",
            icon: "warning",
            message: message,
          });
        }
        if (status === "notfound") {
          $q.notify({
            color: "warning",
            icon: "warning",
            message: message,
          });
          router.push("/login");
        }
      });
    });
  },
});
</script>
