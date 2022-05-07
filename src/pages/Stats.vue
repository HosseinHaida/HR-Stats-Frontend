<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div class="row">
      <q-btn color="primary" to="/stats/register">
        <q-icon class="q-mr-sm" name="launch" />
        ثبت وضعیت روزانه
      </q-btn>
    </div>

    <div class="row">
      <q-btn color="primary" to="/stats/query">
        <q-icon class="q-mr-sm" name="launch" />
        مشاهده آمار قسمت ها
      </q-btn>
    </div>

    <div class="row">
      <q-btn color="primary" to="/stats/daysoff">
        <q-icon class="q-mr-sm" name="launch" />
        ثبت مرخصی
      </q-btn>
    </div>

    <div class="row">
      <q-btn color="primary" to="/stats/daysoff/list">
        <q-icon class="q-mr-sm" name="launch" />
        مشاهده مرخصی‌ها
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style></style>
