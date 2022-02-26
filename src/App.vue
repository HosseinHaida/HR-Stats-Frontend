<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  beforeCreate() {
    this.$store.dispatch("user/fetchUserData").then(({ status, message }) => {
      if (status === "error") {
        this.$q.notify({
          color: "red-5",
          icon: "warning",
          message: message,
        });
      }
      if (status === "notfound") {
        this.$q.notify({
          color: "warning",
          icon: "warning",
          message: message,
        });
        this.$router.push("/login");
      }
    });
  },
});
</script>
