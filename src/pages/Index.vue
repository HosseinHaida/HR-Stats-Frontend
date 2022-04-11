<template>
  <q-page class="q-pa-md">
    <!-- <img
      alt="Quasar logo"
      src="~assets/SealOfTheIslamicRepublicOfIranAirForce.png"
      style="width: 200px; height: 200px"
    /> -->
    <div class="row items-start q-gutter-md">
      <q-card class="main-page-tiles col-3">
        <q-card-section
          class="bg-deep-purple-9 text-white main-page-tiles--header"
          @click="goTo('/users')"
        >
          <div class="text-h6">کاربران</div>
        </q-card-section>

        <q-card-actions vertical align="left">
          <q-btn to="/users" color="deep-purple-9" class="q-pr-md" flat>
            <q-icon class="q-mr-sm" name="view_list" />
            مشاهده لیست
          </q-btn>
          <q-btn to="/users/new" color="deep-purple-9" class="q-pr-md" flat>
            <q-icon class="q-mr-sm" name="person_add" />
            افزودن
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="main-page-tiles col-3">
        <q-card-section
          @click="goTo('/people')"
          class="bg-teal-9 text-white main-page-tiles--header"
        >
          <div>
            <span class="text-h6"> پرسنل </span>
            <span>(پایور و وظیفه)</span>
          </div>
        </q-card-section>

        <q-card-actions vertical align="left">
          <q-btn to="/people" color="teal-9" class="q-pr-md" flat>
            <q-icon class="q-mr-sm" name="view_comfy" />
            مشاهده لیست
          </q-btn>
          <q-btn to="/people/add" color="teal-9" class="q-pr-md" flat>
            <q-icon class="q-mr-sm" name="group_add" />
            افزودن
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="main-page-tiles col-3">
        <q-card-section
          @click="goTo('/stats/register')"
          class="bg-primary text-white main-page-tiles--header"
        >
          <div class="text-h6">آمار</div>
        </q-card-section>

        <q-card-actions vertical align="left">
          <q-btn to="/stats/query" color="primary" class="q-pr-md" flat>
            <q-icon class="q-mr-sm" name="view_module" />
            مشاهده
          </q-btn>
          <q-btn to="/stats/register" color="primary" flat class="q-pr-md">
            <q-icon class="q-mr-sm" name="library_add" />
            ثبت
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div
      v-if="user && user.Department === '23'"
      class="q-mt-xs row items-start q-gutter-md"
    >
      <q-card flat class="main-page-tiles col-3">
        <q-card-section>
          <div class="text-h6">سایر امکانات</div>
        </q-card-section>

        <q-card-actions vertical align="left">
          <div class="features-right-border q-pl-sm">
            سامانه دستور

            <div class="q-pa-md">
              <q-btn-dropdown color="blue-grey" label="افزودن اکسل">
                <q-list>
                  <q-item
                    clickable
                    v-for="(madde, i) in maddeHa"
                    @click="selectMaddeForUpload(i)"
                    :key="i"
                    v-close-popup
                  >
                    <!-- <q-item-section avatar>
                      <q-avatar
                        icon="folder"
                        color="primary"
                        text-color="white"
                      />
                    </q-item-section> -->
                    <q-item-section>
                      <q-item-label>
                        ماده {{ i }} - {{ madde.name }}
                      </q-item-label>
                      <!-- <q-item-label caption>February 22, 2016</q-item-label> -->
                    </q-item-section>
                    <!-- <q-item-section side class="cursor-auto">
                      <q-btn dense flat @click.stop="downloadHelp(i)">
                        <q-icon name="description" color="blue-grey"> </q-icon>
                        <q-tooltip> دانلود فایل اکسل خالی</q-tooltip>
                      </q-btn>
                    </q-item-section> -->
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <!-- Dialog when a Madde is chosen -->
              <q-dialog persistent v-model="showMaddeDialog">
                <q-card>
                  <q-card-section>
                    <div class="text-h6" style="min-width: 350px">
                      آپلود گروهی ماده {{ selectedMadde.number }} -
                      {{ selectedMadde.name }}
                    </div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-form>
                      <q-file
                        class="ellipsis"
                        dense
                        accept=".xlsx"
                        v-model="excelFile"
                        label="انتخاب فایل اکسل"
                        filled
                      >
                        <template v-slot:append>
                          <q-icon
                            v-if="!excelFile"
                            name="post_add"
                            class="cursor-pointer"
                          />
                        </template>
                      </q-file>
                    </q-form>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      v-if="excelFile"
                      color="positive"
                      label="بارگذاری"
                      icon="upload"
                      @click="uploadDastoorExcelFile()"
                      :loading="excelUploadPending"
                    >
                    </q-btn>
                    <q-btn
                      @click="exportColumnNames"
                      label="دانلود نام ستون‌ها"
                      color="primary"
                    />
                    <q-btn
                      flat
                      label="لغو"
                      color="primary"
                      @click="dismissUpload"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </div>

    <!-- <q-date v-model="date" calendar="persian" today-btn></q-date> -->
  </q-page>
</template>

<script>
import { useQuasar, exportFile } from "quasar";
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { maddeHa, maddeHaCols, militaryBaseName } from "../store/variables.js";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default defineComponent({
  name: "PageIndex",
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    const excelFile = ref(null);

    let showMaddeDialog = ref(false);
    let selectedMadde = ref(null);

    // Computed
    const user = computed(() => store.state.user.data);
    const excelUploadPending = computed(
      () => store.state.excessive.excelUploadPending
    );

    return {
      // date: "1375/08/09",
      showMaddeDialog,
      selectedMadde,
      excelFile,
      maddeHa,
      user,
      excelUploadPending,
      uploadDastoorExcelFile() {
        if (excelFile.value) {
          const formData = new FormData();
          formData.append("excel", excelFile.value);
          store
            .dispatch("excessive/uploadDastoorMaddeExcel", {
              excel: formData,
              selectedMadde: selectedMadde.value.table,
            })
            .then(({ status, message }) => {
              if (status === "error") {
                $q.notify({
                  color: "red-5",
                  icon: "warning",
                  message: message,
                });
              } else if (status === "success") {
                $q.notify({
                  color: "green-4",
                  icon: "cloud_done",
                  message: message,
                });
                dismissUpload();
                excelFile.value = null;
              }
            });
        }
      },
      exportColumnNames() {
        const content = [
          maddeHaCols[selectedMadde.value.number].map((col) =>
            wrapCsvValue(col)
          ),
        ];
        const status = exportFile(
          `${militaryBaseName}-HR-Madde${selectedMadde.value.number}-Columns.csv`,
          "\ufeff" + content,
          "text/csv"
        );
        if (status !== true) {
          $q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },
      dismissUpload() {
        showMaddeDialog.value = false;
        excelFile.value = null;
        selectedMadde.value = null;
      },
      selectMaddeForUpload(number) {
        selectedMadde.value = maddeHa[number];
        showMaddeDialog.value = true;
      },
      goTo(where) {
        router.push(where);
      },
    };
  },
});
</script>

<style lang="sass" scoped>
// .main-page-tiles
//   min-width: 250px
.main-page-tiles--header
  cursor: pointer
.features-right-border
  border-left: 2px solid $blue-grey
</style>
