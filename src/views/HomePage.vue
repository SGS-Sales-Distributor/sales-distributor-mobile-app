<template>
  <ion-page>
    <HeaderSection />
    <ion-content fullscreen="true">
      <div class="home-menu">
        <!-- Header -->
        <!-- End of header -->
        <p>Akses : {{ jabatanName }}</p>
        <welcomeSection />
        <!-- Feature Section -->
        <FeatureSection />
        <!-- End of Feature Section -->

        <!-- Swipe to right and left -->
        <!-- <div class="py-6">
          <h1 class="lg:px-20 md:px-10 lg:mx-40 md:mx-20 font-bold text-3xl text-gray-800">Promo Terkini</h1>
          <div class="flex overflow-x-scroll pb-4 hide-scroll-bar">
            <div class="flex flex-nowrap lg:ml-40 md:ml-20 space-x-4">
              <div
                class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/8d2ia-banner website 1587x621.jpg" alt="promo-pertama"
                  class="w-full h-full object-cover">
              </div>
              <div
                class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/08e2b-banner-website-SA.png" alt="promo-pertama" class="w-full h-full object-cover">
              </div>
              <div
                class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/33jh8-blemish 1587x621.jpg" alt="promo-pertama" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div> -->

        <!-- End of swipe -->
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh()">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
      </div>
      <!-- <ion-button expand="block" @click="setOpen(true)">Open</ion-button> -->

      <ion-modal ref="modal" :is-open="isOpen">
        <!-- <ion-modal id="example-modal" ref="modal" trigger="open-custom-dialog"> -->
        <ion-toolbar>
          <ion-title>Visit Tidak Terpenuhi <br /> </ion-title>
          <p>
            <center>{{ formatedDate }}</center>
          </p>
          <ion-buttons slot="end">
            <ion-button color="light" @click="setOpen(false)">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <div class="wrapper">
          <div v-if="!selectedPlans">
            <ion-item v-for="(plans, index) in planStore" :key="index + 1">
              <ion-avatar slot="start">
                <img src="/public/flat-store-icons.png" />
              </ion-avatar>
              <ion-label>
                <h2>{{ plans.nama_toko }}</h2>
                <p>{{ plans.alamat_toko }}</p>
              </ion-label>
              <ion-button
                v-if="plans.idKetVisit === null"
                :disabled="false"
                @click="selectedPlans = plans"
                color="secondary"
                >Alasan</ion-button
              >
              <ion-button v-else :disabled="true" color="secondary"
                >Alasan</ion-button
              >
            </ion-item>
          </div>
          <!-- <div v-else><center><p>Tidak Ada Data</p></center></div> -->
          <div v-if="selectedPlans">
            <div>
              <ion-item>
                <ion-avatar slot="start">
                  <img src="/public/flat-store-icons.png" />
                </ion-avatar>
                <ion-label>
                  <h2>{{ selectedPlans.nama_toko }}</h2>
                  <p>{{ selectedPlans.alamat_toko }}</p>
                </ion-label>
              </ion-item>
            </div>
            <Form
              method="post"
              @submit="formKet"
              novalidate
              :validation-schema="formNotedVisit"
            >
              <ion-row>
                <ion-col>
                  <ErrorMessage name="ket_not_vst" class="mt-4 text-rose-500" />
                  <Field
                    v-model="formData.ket_not_vst"
                    as="textarea"
                    id="ket_not_vst"
                    name="ket_not_vst"
                    rows="4"
                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    placeholder="Alasan Tidak Visit Toko"
                    aria-describedby="ket_not_vst"
                  ></Field>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-button type="submit" id="save-btn" color="primary"
                    >Simpan</ion-button
                  >
                  <ion-button
                    @click="selectedPlans = null"
                    id="clear-btn"
                    color="danger"
                    >Kembali</ion-button
                  >
                </ion-col>
              </ion-row>
            </Form>
          </div>
        </div>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import * as Yup from "yup";
import FeatureSection from "./../components/home/FeatureSection.vue";
import HeaderSection from "../components/HeaderSection.vue";
import welcomeSection from "@/components/home/welcomeSection.vue";
import { onMounted, ref } from "vue";
import { refreshAccessTokenHandler } from "@/services/auth";
import axios from "axios";
import { API_URL } from "@/services/globalVariables";
import { presentLoading, stopLoading } from "@/services/loadingHandlers";
import {
  catchToast,
  catchToastInfo,
  catchToastError,
} from "@/services/toastHandlers";
import { IonButton, IonRefresher, IonRefresherContent } from "@ionic/vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { redirectAbsenIn, redirectAbsenOut } from "@/services/redirectHandlers";
import { data } from "@maptiler/sdk";

const isOpen = ref(false);
const planStore = ref([]);
const modal = ref();
const selectedPlans = ref(null);
const submitedPlans = ref(null);
const jabatanName = ref(null);

const setOpen = (open = Boolean) => (isOpen.value = open);

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const tday = new Date(
  new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  })
);
const m = String(tday.getMonth() + 1).padStart(2, "0");
const d =
  days[tday.getDay()] === "Senin"
    ? String(tday.getDate() - 2)
    : String(tday.getDate() - 1).padStart(2, "0");
const y = String(tday.getFullYear());

const formData = ref({
  ket_not_vst: null,
});

const tokenset = localStorage.getItem("tokens")
  ? JSON.parse(localStorage.getItem("tokens"))
  : null;

const formatedDate =
  (days[tday.getDay()] === "Senin"
    ? days[tday.getDay() + 5]
    : days[tday.getDay() - 1]) +
  ", " +
  (
    "0" +
    (days[tday.getDay()] === "Senin" ? tday.getDate() - 2 : tday.getDate() - 1)
  ).slice(-2) +
  " " +
  bulan[tday.getMonth()] +
  " " +
  tday.getFullYear();

const nowDate = y + "-" + m + "-" + d;
const userId = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";

const formNotedVisit = Yup.object().shape({
  ket_not_vst: Yup.string().required(
    "Keterangan Harus Diisi, tidak boleh kosong!"
  ),
});

// const handleRefresh = (event) => {
//   window.location.reload();
//   setTimeout(() => {
//     event.target.complete();
//   }, 2000);
// };

const handleRefresh = (event) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
};

async function getJabatanName() {
  try {
    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.get(
      `${API_URL.value}/api/v2/jabatanbyOne/${userId.jabatan_id}`,
      { headers: headers }
    );

    jabatanName.value = response.data.jabatan;
    // catchToast(jabatanName.value, 3000);
  } catch (error) {
    catchToastError(error.response.data.message, 3000);
  }
}

async function getNotVisited() {
  try {
    presentLoading();
    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.get(
      `${API_URL.value}/api/sgs/call-plans/notVisited/${userId.user_id}/`,
      {
        headers: headers,
        userId: userId.user_id,
        params: {
          tomorrow: nowDate,
        },
      }
    );
    switch (jabatanName.value) {
      case "Sales Officer":
        isOpen.value = false;
        getAbsenDay();
        break;

      case "Beauty Advisor":
        isOpen.value = false;
        getAbsenDay();
        break;

      case "Merchandiser":
        isOpen.value = false;
        getAbsenDay();
        break;

      case "Sales Merchandiser":
        isOpen.value = false;
        getAbsenDay();
        break;

      case "Beauty Promotor":
        isOpen.value = false;
        getAbsenDay();
        break;

      default:
        isOpen.value = true;
        planStore.value = response.data.resource;
        break;
    }

    stopLoading();
  } catch (error) {
    // console.log(error.message);
    catchToastError(error.response.data.message, 3000);
  } finally {
    stopLoading();
  }
}

async function getAbsenDay() {
  try {
    presentLoading();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenset.access_token}`,
    };

    const response = await axios.get(
      `${API_URL.value}/api/v2/getAbsen/${userId.user_id}/`,
      {
        headers: headers,
      }
    );

    const datAbsen = response.data;
  } catch (error) {
    console.log(error.response, 3000);
    if (error.response && error.response.data.status == 404) {
      redirectAbsenIn();
    }
  } finally {
    stopLoading();
  }
}

async function formKet() {
  try {
    presentLoading();
    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;
    const userID = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.post(
      `${API_URL.value}/api/v2/plantsNotvisit`,
      {
        id_master_call_plan_detail: selectedPlans.value.idPlanDetail,
        ket: ket_not_vst.value,
        created_by: userID.fullname,
        updated_by: null,
      },
      {
        headers: headers,
      }
    );

    catchToast(response.data.message, 3000);
    isOpen.value = false;

    selectedPlans.value = null;
    ket_not_vst.value = null;
  } catch (error) {
    console.log(error.message);
  } finally {
    stopLoading();
  }
}

onMounted(() => {
  getJabatanName();
  getNotVisited();

  refreshAccessTokenHandler();
});
</script>

<style scoped>
ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}

.hide-scroll-bar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}

ion-modal {
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal ion-icon {
  margin-right: 6px;

  width: 48px;
  height: 48px;

  padding: 4px 0;

  color: #aaaaaa;
}

ion-modal .wrapper {
  margin-bottom: 10px;
}

.home-menu {
  margin-top: 28%;
  flex-direction: column;
  background-color: white;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
