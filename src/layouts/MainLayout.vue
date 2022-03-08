<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-py-xs">
          <q-btn-dropdown
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

            <div class="row no-wrap q-pa-md">
              <div class="column items-center" style="min-width: 110px">
                <q-avatar class="user-photo-avatar" size="72px">
                  <q-img :ratio="1" :src="user.Photo" />
                  <span
                    class="user-photo-placeholder border: 1px solid black"
                    >{{
                      user.Name.charAt(0).toUpperCase() +
                      " " +
                      user.Family.charAt(0).toUpperCase()
                    }}</span
                  >
                </q-avatar>
                <q-chip class="q-mt-md q-pt-xs" dense square>
                  <span
                    class="display-block q-mr-xs"
                    style="margin-top: -5px; font-size: 12px"
                  >
                    {{ user.IsSoldier === "1" ? "ش پ" : "ش م" }} :
                  </span>
                  {{ user.IsSoldier === "1" ? user.NationalID : user.PerNo }}
                </q-chip>
                <div class="text-subtitle1 q-mb-xs">
                  <span class="text-grey text-italic">
                    {{ user ? ranks[user.Rank] : "" }}
                  </span>
                  {{ user ? user.Name + " " + user.Family : "" }}
                </div>

                <q-btn-group class="q-mt-xs">
                  <q-btn
                    :color="user ? 'negative' : 'positive'"
                    :label="user ? 'خروج' : 'ورود'"
                    size="12px"
                    @click="logout"
                    v-close-popup />
                  <q-btn
                    v-if="user"
                    to="/profile"
                    label="اطلاعات شخصی"
                    color="primary"
                    size="12px"
                    v-close-popup
                /></q-btn-group>

                <q-input
                  v-model="departments[user.Department]"
                  class="q-mt-md"
                  type="textarea"
                  label="قسمت"
                  outlined
                  style="background-color: #fafad2"
                  color="primary"
                  readonly
                />
              </div>
            </div>
          </q-btn-dropdown>
          <q-btn
            v-else
            size="13px"
            color="grey-1"
            push
            to="/login"
            text-color="dark"
            icon="login"
            label="ورود به سامانه"
          />

          <q-btn class="q-ml-sm" to="/" flat>
            <q-icon name="home" />
          </q-btn>
        </q-toolbar-title>

        <div>آمار - نسخه {{ appVersion }}</div>

        <!-- <img
          alt="HR App Logo"
          src="~assets/Roundel_of_Iran.png"
          class="q-ml-md"
          style="width: 35px; height: 35px"
        /> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="180" bordered>
      <q-list>
        <q-item-label header> دسترسی سامانه </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { appVersion } from "../store/variables.js";

const linksList = [
  {
    title: "لیست کاربران",
    icon: "manage_accounts",
    link: "/users",
  },
  {
    title: "لیست پرسنل",
    caption: "پایور و وظیفه",
    icon: "people",
    link: "/people",
  },
  {
    title: "آمار",
    caption: "مشاهده و ثبت",
    icon: "receipt_long",
    link: "/stats",
  },
];

import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { ranks } from "../store/variables.js";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();

    const leftDrawerOpen = ref(false);

    const user = computed(() => store.state.user.data);
    const departments = computed(() =>
      Object.assign(
        {},
        ...store.state.user.departments.map(({ label, value }) => ({
          [value]: label,
        }))
      )
    );

    return {
      essentialLinks: linksList,
      appVersion,
      leftDrawerOpen,
      user,
      departments,
      ranks,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
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
<style lang="sass" scoped>
.user-photo-placeholder
  margin-top: -107%
  font-size: 22px
  color: $primary
.user-photo-avatar
  border: 1px solid $primary
</style>
