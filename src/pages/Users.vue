<template>
  <div class="q-pa-md row items-start q-gutter-sm">
    <div class="col">
      <div class="row">
        <q-input filled v-model="usersSearch" dense label="جستجو"></q-input>
      </div>
    </div>
    <q-card class="user-card bg-grey-2" bordered flat>
      <q-card-section horizontal>
        <q-card-section class="col-2 flex flex-center">
          <q-img
            class="rounded-borders"
            style="max-width: 100px"
            src="~assets/SealOfTheIslamicRepublicOfIranAirForce.png"
          >
          </q-img>
        </q-card-section>

        <q-card-section q-pt-xs>
          <div>ستوانسوم وظیفه</div>
          <div class="text-h6 q-mt-sm q-mb-xs">حسین حیدری</div>
          <div class="text-caption text-grey">مدیریت نیروی انسانی</div>
        </q-card-section>

        <q-card-section class="col"> </q-card-section>
        <q-card-section class="col-auto items-end q-py-sm row">
          <div class="row">
            <q-btn @click="expanded = !expanded" flat class="q-px-sm" outline>
              <q-icon
                :name="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              />
              <q-icon name="admin_panel_settings" />
            </q-btn>
            <q-btn flat color="primary" icon="manage_accounts" />
            <q-btn flat dense color="negative" icon="delete" />
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <!-- <q-card-actions>

      </q-card-actions> -->

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section> شسم شیبمنه شیسب نمتت شیب </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      expanded: ref(false),
    };
  },
};
</script>

<style lang="sass" scoped>
.user-card
  width: 100%
</style>
