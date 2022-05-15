<template>
  <q-page v-if="user" class="q-pa-md">
    <div class="row">
      <div class="col-6 q-pr-sm">
        <q-card class="q-pa-md" flat bordered>
          <div class="flex justify-between">
            <q-avatar class="user-photo-avatar" size="150px">
              <q-img :ratio="1" :src="user.Photo" />
              <span class="user-photo-placeholder">
                {{
                  user.Name.charAt(0).toUpperCase() +
                  " " +
                  user.Family.charAt(0).toUpperCase()
                }}
              </span>
            </q-avatar>
            <q-file
              class="ellipsis self-end"
              dense
              v-model="profilePhoto"
              accept="image/*"
              label="انتخاب تصویر"
              :borderless="!!profilePhoto"
              :filled="!profilePhoto"
              style="max-width: 235px"
            >
              <template v-slot:append>
                <q-icon
                  v-if="!profilePhoto"
                  name="add_a_photo"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:prepend>
                <q-btn
                  v-if="profilePhoto"
                  class="q-mr-sm"
                  color="positive"
                  push
                  dense
                  icon="upload"
                  @click="uploadProfilePhoto()"
                  :loading="profilePhotoUploadPending"
                >
                  <q-tooltip>آپلود فایل انتخابی</q-tooltip>
                </q-btn>
              </template>
            </q-file>
          </div>
        </q-card>
      </div>
      <div class="col-6 q-pl-sm">
        <q-card class="q-pa-md" flat bordered>
          <div class="flex justify-between">
            <q-avatar
              square
              class="user-photo-avatar rounded-borders"
              size="150px"
            >
              <q-img :ratio="1" :src="user.Signature" />
              <span class="user-photo-placeholder"> امضا </span>
            </q-avatar>
            <q-btn color="primary" class="q-ml-md self-end">
              <q-icon class="q-ml-xs" name="draw" />
            </q-btn>
          </div>
        </q-card>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12">
        <q-card class="q-px-md q-pb-md q-pt-sm" flat bordered>
          <q-table
            title="اطلاعات شخصی"
            :rows="row"
            :columns="columns"
            row-key="PerNo"
            table-header-class="bg-grey-2"
            hide-bottom
          />
        </q-card>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12">
        <q-card class="q-px-md q-pb-md" flat bordered>
          <q-card-section>
            <div class="text-h6">ویرایش رمز عبور</div>
          </q-card-section>
          <div class="row">
            <div class="col-6 q-pr-sm">
              <q-input filled label="رمز عبور قبلی"></q-input>
            </div>
            <div class="col-6 q-pl-sm">
              <q-input filled label="رمز عبور جدید"> </q-input>
            </div>
          </div>

          <q-card-actions class="q-mt-sm">
            <q-btn flat color="positive">
              <q-icon class="q-mr-sm" name="save" />
              ذخیره رمز عبور
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { ranks } from "../store/variables.js";
// import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const store = useStore();
    // const router = useRouter();
    const $q = useQuasar();

    const profilePhoto = ref(null);
    const user = computed(() => store.state.user.data);
    const profilePhotoUploadPending = computed(
      () => store.state.user.profilePhotoUploadPending
    );
    const row = computed(() => {
      const array = [];
      array.push({
        Rank: user.value.Rank,
        Name: user.value.Name,
        Family: user.value.Family,
        PerNo: user.value.PerNo,
        Department: user.value.Department,
        IsSoldier: user.value.IsSoldier,
        Branch: user.value.Branch,
        NationalID: user.value.NationalID,
        Head: user.value.head
          ? `${ranks[user.value.head.Rank]} ${user.value.head.Name} ${
              user.value.head.Family
            }`
          : "_",
      });
      return array;
    });
    const departments = computed(() =>
      Object.assign(
        {},
        ...store.state.user.departments.map(({ label, value }) => ({
          [value]: label,
        }))
      )
    );

    const columns = [
      {
        name: "Rank",
        label: "درجه",
        align: "left",
        field: (row) => ranks[row.Rank],
      },
      {
        name: "Name",
        required: true,
        label: "نام",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
      },
      {
        name: "Family",
        label: "نشان",
        align: "left",
        field: "Family",
      },
      {
        name: "PerNo",
        label: "شماره کارگزینی",
        align: "left",
        field: "PerNo",
      },
      {
        name: "Department",
        label: "قسمت",
        align: "left",
        field: (row) => departments.value[row.Department],
      },
      {
        name: "IsSoldier",
        label: "نوع",
        align: "left",
        field: (row) => (row.IsSoldier === "1" ? "وظیفه" : "پایور"),
      },
      {
        name: "Branch",
        label: "شعبه",
        align: "left",
        field: "Branch",
      },
      {
        name: "Head",
        label: "رئیس",
        align: "left",
        field: "Head",
      },
      {
        name: "NationalID",
        label: "کد ملی",
        align: "left",
        field: "NationalID",
      },
    ];

    const uploadProfilePhoto = () => {
      if (!profilePhoto.value) return;
      const formData = new FormData();
      formData.append("photo", profilePhoto.value);
      store
        .dispatch("user/uploadProfilePhoto", formData)
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

            store.dispatch("user/fetchUserData").then(() => {
              profilePhoto.value = null;
            });
          }
        });
    };

    return {
      user,
      row,
      columns,
      departments,
      ranks,
      profilePhoto,
      uploadProfilePhoto,
      profilePhotoUploadPending,
    };
  },
};
</script>

<style lang="sass" scoped>
.user-photo-placeholder
  font-size: 40px
</style>
