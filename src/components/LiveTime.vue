<template>
  <div class="text-bold">
    <q-chip color="white" outline class="q-pr-xs">
      <span class="d-inline-block" style="margin-bottom: -3px">
        {{ timeMinutes }} :
        {{ timeHours }}
      </span>
      <q-icon class="q-ml-sm" name="watch_later" size="20px" />
    </q-chip>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";

export default defineComponent({
  name: "LiveTime",
  setup() {
    // Variables
    let interval = ref(null);
    let hours = ref(0);
    let minutes = ref(0);
    // Update time function
    const updateTime = () => {
      const date = new Date(Date.now());
      hours.value = date.getHours();
      minutes.value = date.getMinutes();
    };
    // Start the interval on component mount
    onMounted(() => {
      interval.value = setInterval(() => {
        updateTime();
      }, 30000);

      updateTime();
    });
    // Destroy interval on component unmount
    onUnmounted(() => {
      clearInterval(interval.value);
    });

    const timeMinutes = computed(() =>
      minutes.value < 10 ? "0" + minutes.value : minutes.value
    );

    const timeHours = computed(() =>
      hours.value < 10 ? "0" + hours.value : hours.value
    );
    return {
      interval,
      hours,
      minutes,
      timeMinutes,
      timeHours,
      updateTime,
    };
  },
});
</script>
