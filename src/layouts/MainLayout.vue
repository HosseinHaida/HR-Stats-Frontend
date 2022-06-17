<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="row items-center">
          <!-- <div class="row"> -->
          <q-btn-dropdown
            class="col-auto"
            v-if="user"
            size="13px"
            color="grey-1"
            push
            no-caps
            text-color="dark"
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-icon left name="person" />
                <div class="text-center" style="text-transform: uppercase">
                  {{ user.Name + " " + user.Family }}
                </div>
              </div>
            </template>

            <div class="row no-wrap q-pt-md justify-center">
              <div
                class="col text-center q-px-none"
                style="min-width: 110px; width: 100%"
              >
                <q-avatar class="user-photo-avatar" size="80px">
                  <q-img :ratio="1" :src="user.Photo" />
                  <span class="user-photo-placeholder">{{
                    user.Name.charAt(0).toUpperCase() +
                    " " +
                    user.Family.charAt(0).toUpperCase()
                  }}</span>
                </q-avatar>

                <div class="row q-mt-md">
                  <q-list separator class="col-12" dense>
                    <q-item to="/profile" clickable v-close-popup>
                      <q-item-section class="text-primary text-left">
                        اطلاعات شخصی
                      </q-item-section>
                      <q-item-section side>
                        <q-icon color="primary" size="xs" name="account_box" />
                      </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section class="text-primary text-left">
                        درخواست‌ها
                      </q-item-section>
                      <q-item-section side>
                        <q-icon size="xs" name="receipt" color="primary" />
                      </q-item-section>
                      <q-menu anchor="center left" self="center start">
                        <q-list>
                          <q-item
                            class="text-primary text-left"
                            dense
                            clickable
                          >
                            <q-item-section> مرخصی </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_left" />
                            </q-item-section>
                            <q-menu anchor="bottom left" self="center start">
                              <q-list>
                                <q-item
                                  to="/stats/daysoff"
                                  class="text-primary"
                                  dense
                                  clickable
                                >
                                  <q-item-section> ثبت </q-item-section>
                                  <q-item-section side>
                                    <q-icon name="add" />
                                  </q-item-section>
                                </q-item>
                                <q-item
                                  to="/stats/daysoff/list"
                                  class="text-primary"
                                  dense
                                  clickable
                                >
                                  <q-item-section> نمایش </q-item-section>
                                  <q-item-section side>
                                    <q-icon name="visibility" />
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </q-menu>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                    <q-item @click="logout" clickable v-close-popup>
                      <q-item-section class="text-negative text-left">
                        خروج
                      </q-item-section>
                      <q-item-section side>
                        <q-icon color="negative" size="xs" name="logout" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>
          </q-btn-dropdown>
          <q-btn
            class="col-auto"
            v-else
            size="13px"
            color="grey-1"
            push
            to="/login"
            text-color="dark"
            icon="login"
            label="ورود به سامانه"
          />
          <div class="col text-center" style="font-size: 14px">
            سامانه آمار و اطلاعات پرسنل
            <span class="text-bold">
              {{ militaryBaseNameFa }}
            </span>
          </div>
        </q-toolbar-title>

        <LiveTime />

        <!-- <div>آمار - نسخه {{ appVersion }}</div> -->

        <!-- <img
          alt="HR App Logo"
          src="~assets/Roundel_of_Iran.png"
          class="q-ml-md"
          style="width: 35px; height: 35px"
        /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="!leftDrawerOpen || drawerMiniState"
      @click.capture="toggleLeftDrawer"
      :width="57"
      bordered
      :breakpoint="500"
    >
      <div class="row justify-center">
        <!-- button for the available routes -->
        <div class="col-auto q-mt-sm" v-for="(link, i) in links" :key="i">
          <q-btn :to="link.to" color="primary" flat :icon="link.icon">
            <q-tooltip
              :delay="500"
              anchor="center right"
              self="center end"
              transition-show="jump-right"
              transition-hide="jump-left"
              :offset="[2, 0]"
            >
              <span style="font-size: 14px"> {{ link.tooltip }} </span>
            </q-tooltip>
          </q-btn>
        </div>

        <!-- button for the stats routes -->
        <div class="col-auto q-mt-sm">
          <q-btn color="primary" flat icon="table_chart">
            <q-menu anchor="top right" self="top end">
              <q-list separator dense style="min-width: 100px">
                <q-item to="/stats/register" clickable v-close-popup>
                  <q-item-section> آمار روزانه </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section> ثبت وضعیت </q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_left" />
                  </q-item-section>

                  <q-menu anchor="top right" self="top end">
                    <q-list style="min-width: 150px">
                      <q-item to="/stats/missions" dense clickable>
                        <q-item-section> ماموریت </q-item-section>
                        <q-item-section side>
                          <q-icon name="airplane_ticket" />
                        </q-item-section>
                      </q-item>
                      <q-item to="/stats/agents" dense clickable>
                        <q-item-section> مامور </q-item-section>
                        <q-item-section side>
                          <q-icon name="output" />
                        </q-item-section>
                      </q-item>
                      <!-- <q-item to="/stats/agents/add/internal" dense clickable>
                        <q-item-section> مامور نزدیک </q-item-section>
                        <q-item-section side>
                          <q-icon name="alt_route" />
                        </q-item-section>
                      </q-item> -->
                    </q-list>
                  </q-menu>
                </q-item>
                <q-item to="/stats/query" clickable v-close-popup>
                  <q-item-section> گزارش گیری </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip
              :delay="500"
              transition-show="jump-right"
              transition-hide="jump-left"
              :offset="[2, 0]"
            >
              <span style="font-size: 14px"> آمار </span>
            </q-tooltip>
          </q-btn>
        </div>

        <!-- button for the excessive features of the app -->
        <div class="col-auto q-mt-sm">
          <q-btn color="primary" flat icon="more_horiz">
            <q-menu anchor="center right" self="center end">
              <q-list dense style="min-width: 100px">
                <q-item clickable>
                  <q-item-section> امکانات سامانه دستور </q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_left" />
                  </q-item-section>

                  <q-menu anchor="center right" self="center end">
                    <q-list>
                      <q-item to="/dastoor/upload" dense clickable>
                        <q-item-section>
                          بارگذاری گروهی ماده دستور
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="post_add" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip
              :delay="500"
              transition-show="jump-right"
              transition-hide="jump-left"
              :offset="[2, 0]"
            >
              <span style="font-size: 14px"> سایر امکانات </span>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-drawer>

    <!-- <q-drawer v-model="leftDrawerOpen" :width="180" bordered>
      <q-list>
        <q-item-label header> دسترسی سامانه </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";
import LiveTime from "components/LiveTime.vue";
import { militaryBaseNameFa } from "../store/variables.js";

const links = [
  {
    tooltip: "صفحه اصلی",
    icon: "home",
    to: "/",
  },
  {
    tooltip: "کاربران",
    icon: "recent_actors",
    to: "/users",
  },
  {
    tooltip: "پرسنل",
    icon: "people",
    to: "/people",
  },
  // {
  //   tooltip: "آمار",
  //   icon: "table_chart",
  //   to: "/stats",
  // },
];

import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { ranks } from "../store/variables.js";

export default defineComponent({
  name: "MainLayout",

  components: {
    LiveTime,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();

    const leftDrawerOpen = ref(false);
    const drawerMiniState = ref(false);

    const user = computed(() => store.state.user.data);

    return {
      links,
      militaryBaseNameFa,
      leftDrawerOpen,
      drawerMiniState,
      user,
      ranks,

      toggleLeftDrawer(e) {
        // leftDrawerOpen.value = !leftDrawerOpen.value;
        if (drawerMiniState.value) {
          drawerMiniState.value = false;
          e.stopPropagation();
        }
      },

      logout() {
        store.commit("user/logout");
        $q.notify({
          color: "light-blue-4",
          icon: "logout",
          message: "خروج موفق",
        });
        router.push("/login");
      },
    };
  },
});
</script>
<style></style>
