<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="q-py-xs">
          <!-- <q-btn color="white" class="text-black" push>
            <div class="row items-center no-wrap">
              <div class="text-center q-pr-md">
                {{ user.name + " " + user.family }}
              </div>
              <q-icon left name="person" class="q-mr-none" />
            </div>
          </q-btn> -->
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
                  {{ user.name + " " + user.family }}
                </div>
              </div>
            </template>

            <div class="row no-wrap q-pa-md">
              <div class="column items-center" style="min-width: 110px">
                <q-avatar size="72px">
                  <q-img :ratio="1" :src="user.photo" />
                  <span
                    class="user-photo-placeholder border: 1px solid black"
                    >{{
                      user.name.charAt(0).toUpperCase() +
                      " " +
                      user.family.charAt(0).toUpperCase()
                    }}</span
                  >
                </q-avatar>
                <q-chip
                  class="q-mt-md"
                  dense
                  square
                  :label="user.perNo + ' : ش پ'"
                />
                <div class="text-subtitle1 q-mb-xs">
                  <q-chip dense square outline>
                    {{ user ? user.rank : "" }}
                  </q-chip>
                  {{ user ? user.name + " " + user.family : "" }}
                </div>

                <q-btn-group class="q-mt-sm">
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
                  v-model="user.department"
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
        </q-toolbar-title>

        <div>آمار - نسخه {{ appVersion }}</div>

        <img
          alt="Quasar logo"
          src="~assets/Roundel_of_Iran.png"
          class="q-ml-md"
          style="width: 35px; height: 35px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> منوی دسترسی </q-item-label>

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
    title: "پرسنل قسمت",
    caption: "ویرایش اطلاعات",
    icon: "group",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      appVersion,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({ user: "user/getUserData" }),
  },
});
</script>
<style lang="sass" scoped>
.user-photo-placeholder
  margin-top: -96%
  color: $primary
</style>
