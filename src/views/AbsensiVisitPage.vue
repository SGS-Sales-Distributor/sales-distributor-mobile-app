<template>
  <ion-page>
    <HeaderSection />
    <ion-content class="ion-padding" :fullscreen="true">
      <!-- Header -->
      <!-- End of header -->

      <LocationNotAllowed v-if="!statusGPS" />

      <!-- Card -->
      <div v-if="statusGPS" class="visit-container">
        <AddressInfoSection />

        <!-- Card Content -->
        <MapContentSection />
        <!-- End of Card Content -->

        <!-- Detail Store Card -->
        <div v-if="statusGPS" class="flex flex-col space-y-2" id="store-detail-card">
          <ion-card v-if="detailStoreInfoDistri" class="shadow-lg shadow-gray-300">
            <ion-card-header>
              <div class="flex justify-between">
                <ion-card-title>
                  <span class="font-bold text-gray-900 text-2xl">Data Detail Toko</span>
                </ion-card-title>
                <button id="close-btn" @click="closeDetailCardBtnHandler"
                  class="text-gray-900 hover:text-gray-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg"
                    viewBox="0 0 16 16">
                    <path
                      d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </button>
              </div>
              <ion-card-subtitle>
                <span class="font-medium text-gray-900">
                  Data dari toko
                  <span class="font-bold">{{
                    detailStoreInfoDistri.nama_toko
                  }}</span>
                  secara detail.
                </span>
              </ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <div class="border-t border-gray-200">
                <dl>
                  <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">Nama Toko</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.nama_toko }}
                    </dd>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.visit_id }}
                    </dd>
                  </div>
                  <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Nama Alias Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.alias_toko }}
                    </dd>
                  </div>
                  <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">Alamat Toko</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.alamat_toko }}
                    </dd>
                  </div>
                  <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Nomor Telepon Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.nomor_telepon_toko }}
                    </dd>
                  </div>
                  <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Nomor Fax Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.nomor_fax_toko }}
                    </dd>
                  </div>
                  <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Kode Unik Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.kode_toko }}
                    </dd>
                  </div>
                  <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Nama Pemilik Toko
                    </dt>
                    <dd v-if="detailStoreInfoDistri.nama_pemilik"
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.nama_pemilik }}
                    </dd>
                    <dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ion-badge color="danger">Tidak Ada</ion-badge>
                    </dd>
                  </div>
                  <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Email Pemilik Toko
                    </dt>
                    <dd v-if="detailStoreInfoDistri.email_pemilik"
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.email_pemilik }}
                    </dd>
                    <dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ion-badge color="danger">Tidak Ada</ion-badge>
                    </dd>
                  </div>
                </dl>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        <!-- End of Detail Store Card -->

        <div v-if="statusGPS" class="flex w-full px-4 pb-2 space-x-4">
          <ion-button :disabled="disabledCheckIn" @click="takeCheckInPicture" id="check-in-button"
            class="w-full py-2 rounded-lg font-bold text-nowrap"><ion-icon slot="start" :icon="logIn"></ion-icon>
            Check-In
          </ion-button>
          <ion-button :disabled="disabledCheckOut" @click="takeCheckOutPicture" id="check-out-button"
            class="w-full py-2 rounded-lg font-bold text-nowrap"><ion-icon slot="start" :icon="logOut"></ion-icon>
            Check-Out
          </ion-button>
        </div>
        <div v-if="checkInImageUrls.length > 0" class="grid grid-cols-2 gap-4 px-4 pb-2">
          <div v-for="(photoUrl, index) in checkInImageUrls" :key="`checkin-${index}`"
            class="flex flex-col items-center">
            <!-- <span class="mb-2 text-sm font-semibold text-gray-700">Foto Check-In {{ index + 1 }}</span> -->
            <span class="mb-2 text-sm font-semibold text-gray-700">Foto Check-In</span>
            <img :src="photoUrl" alt="Captured Check In Photo"
              style="max-width: 100%; height: 180px; border-radius: 10px" />
          </div>
        </div>
        <div v-if="checkOutImageUrls.length > 0" class="grid grid-cols-2 gap-4 px-4 pb-2">
          <div v-for="(photoUrl, index) in checkOutImageUrls" :key="`checkout-${index}`"
            class="flex flex-col items-center">
            <!-- <span class="mb-2 text-sm font-semibold text-gray-700">Foto Check-Out {{ index + 1 }}</span> -->
            <span class="mb-2 text-sm font-semibold text-gray-700">Foto Check-Out</span>
            <img :src="photoUrl" alt="Captured Check Out Photo"
              style="max-width: 100%; height: 180px; border-radius: 10px" />
          </div>
        </div>
        <!-- <div v-if="hasCapturedImage" class="mb-4 m-4">
          <label for="catatan_visit" class="block text-gray-700 text-sm font-semibold mb-2">Catatan Visit</label>
          <Field v-model="keterangan" name="keterangan" as="textarea" id="keterangan"
            class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
            placeholder="Catatan Visit Toko" cols="20" rows="10" aria-label="catatan_visit"
            aria-describedby="catatan_visit" v-bind:value="detailStoreInfoDistri.keterangan"></Field>
        </div> -->
        <div v-if="renderModCheckInBtn" class="mb-4 m-4">
          <label class="block text-gray-700 text-sm font-semibold mb-2">
            Catatan Check-In
          </label>
          <Field v-model="keteranganIn" as="textarea" class="form-input w-full px-4 py-2 border rounded-lg"
            placeholder="Catatan saat check-in" />
        </div>
        <div v-if="renderModeCheckOutBtn" class="mb-4 m-4">
          <label class="block text-gray-700 text-sm font-semibold mb-2">
            Catatan Check-Out
          </label>
          <Field v-model="keteranganOut" as="textarea" class="form-input w-full px-4 py-2 border rounded-lg"
            placeholder="Catatan saat check-out" />
        </div>
        <ion-grid v-if="statusGPS" :fixed="true">
          <ion-row v-if="renderModCheckInBtn">
            <ion-col style="margin: 20px">
              <ion-button @click="passCheckInAlert" id="save-btn"><ion-icon slot="start"
                  :icon="checkmarkCircleSharp"></ion-icon>
                Save</ion-button></ion-col>
            <ion-col></ion-col>
            <ion-col style="margin: 20px">
              <ion-button @click="clearImage" id="clear-btn"><ion-icon slot="start" :icon="trash"></ion-icon>
                Clear</ion-button>
            </ion-col>
          </ion-row>
          <ion-row v-if="renderModeCheckOutBtn">
            <ion-col style="margin: 20px">
              <ion-button @click="passCheckOutAlert" id="save-btn"><ion-icon slot="start"
                  :icon="checkmarkCircleSharp"></ion-icon>
                Save</ion-button>
            </ion-col>
            <ion-col></ion-col>
            <ion-col style="margin: 20px">
              <ion-button @click="clearImage" id="clear-btn"><ion-icon slot="start" :icon="trash"></ion-icon>
                Clear</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-searchbar v-if="visibleStores.length > 0" :debounce="300" @ionInput="searchStoreHandler($event)"
          placeholder="Cari nama toko..." color="light"></ion-searchbar>

        <div v-for="(store, index) in visibleStores" :key="index + 1" class="relative overflow-x-auto">
          <ion-card v-if="statusGPS" class="py-2 odd:bg-blue-500 even:bg-sky-400">
            <ion-card-header class="bg-gray-50">
              <div class="flex flex-col w-full h-full space-y-2">
                <div class="flex flex-row w-full h-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama Toko</label>
                  <p class="flex-initial w-44 text-right">
                    {{ store.nama_toko }}
                  </p>
                </div>
                <div v-if="store.tanggal_visit" class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Tanggal Visit</label>
                  <p class="flex-initial w-44 text-right">
                    {{
                      new Date(store.tanggal_visit).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          weekday: "long",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    }}
                  </p>
                </div>
                <div v-else class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial font-semibold">Tanggal Visit</label>
                  <ion-badge color="danger">Belum Visit</ion-badge>
                </div>
                <div v-if="store.waktu_masuk !== null" class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Waktu Check-In</label>
                  <p class="flex-initial w-44 text-right">
                    {{ store.waktu_masuk }} WIB
                  </p>
                </div>
                <div v-else class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial font-semibold">Waktu Check-In</label>
                  <ion-badge color="danger">Belum Absen</ion-badge>
                </div>
                <div v-if="store.waktu_keluar" class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Waktu Check-Out</label>
                  <p class="flex-initial w-44 text-right">
                    {{ store.waktu_keluar }} WIB
                  </p>
                </div>
                <div v-else class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial font-semibold">Waktu Check-Out</label>
                  <ion-badge color="danger">Belum Absen</ion-badge>
                </div>
                <div class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Status Approval</label>
                  <div v-if="store.approval === 1" class="flex justify-center items-center">
                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                    <ion-badge color="success">Disetujui</ion-badge>
                  </div>
                  <div v-else class="flex justify-center items-center">
                    <div class="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>
                    <ion-badge color="warning">Belum Disetujui</ion-badge>
                  </div>
                </div>
              </div>
            </ion-card-header>
            <ion-card-content class="bg-gray-50">
              <div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
                <ion-button :disabled="store.enableAbsenBtn" @click="fetchOneStoreData(store.store_id)" size="small">
                  <ion-icon slot="start" :icon="camera"></ion-icon>
                  Visit
                </ion-button>

                <!-- <router-link :to="{ name: 'storeDetail', params: { id: store.store_id } }"> -->
                <!-- <ion-button :disabled="true" @click="redirectToStoreDetailPage(store.store_id)" size="small">
                  <ion-icon slot="start" :icon="documentAttach"></ion-icon>
                  <span class="text-nowrap">Purchase Order</span>
                </ion-button> -->
                <!-- </router-link> -->
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        <ion-infinite-scroll @ionInfinite="ionInfinite">
          <ion-infinite-scroll-content loading-text="Load more stores..."
            loading-spinner="bubbles"></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </ion-content>
  </ion-page>
</template>

<script setup>
import axios from "axios";
import { IonSearchbar } from "@ionic/vue";

import {
  documentAttach,
  camera,
  constructOutline,
  logIn,
  logOut,
  trash,
  checkmarkCircleSharp,
} from "ionicons/icons";

import HeaderSection from "@/components/HeaderSection.vue";
import AddressInfoSection from "@/components/absensi/AddressInfoSection.vue";
import LocationNotAllowed from "./../components/absensi/LocationNotAllowed.vue";
import MapContentSection from "@/components/absensi/MapContentSection.vue";
import router from "@/router";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { computed, nextTick, onMounted, ref, shallowRef } from "vue";
import { alertController, IonRefresher, IonRefresherContent } from "@ionic/vue";

import {
  printCurrentPosition,
  checkLocationAccess,
} from "@/services/locationHandlers";
import {
  statusGPS,
  API_URL,
  latitude,
  longitude,
  currentRoute,
} from "@/services/globalVariables";
import {
  catchToast,
  catchToastError,
  catchToastWarn,
} from "@/services/toastHandlers";
import { refreshAccessTokenHandler } from "@/services/auth.js";
import { presentLoading, stopLoading } from "@/services/loadingHandlers";
import {
  redirectToHomePage,
  redirectToStoreDetailPage,
} from "@/services/redirectHandlers";
import { Field } from "vee-validate";

const user = ref(JSON.parse(localStorage.getItem("user")));
const isStoreDetailCardVisible = ref(false);
const renderModCheckInBtn = ref(false);
const renderModeCheckOutBtn = ref(false);
const disabledCheckIn = ref(true);
const disabledCheckOut = ref(true);
const disabledPurchaseOrderBtn = ref(true);
const detailStoreInfoDistri = ref(null);
const imageUrl = shallowRef("");
const imageLocation = ref(null);
const checkInImageUrls = ref([]);
const checkInImageLocations = ref([]);
const checkOutImageUrls = ref([]);
const checkOutImageLocations = ref([]);
const keteranganIn = ref("");
const keteranganOut = ref("");

const storeInfoDistri = ref([]);
const hasCapturedImage = computed(() => {
  return (
    checkInImageUrls.value.length > 0 || checkOutImageUrls.value.length > 0
  );
});

const lastIndex = ref(5);
const visibleStores = computed(() => {
  return storeInfoDistri.value && storeInfoDistri.value.length > 0
    ? storeInfoDistri.value.slice(0, lastIndex.value)
    : [];
});
const reachedEnd = computed(() => {
  return (
    Array.isArray(storeInfoDistri.value) &&
    lastIndex.value >= storeInfoDistri.value.length
  );
});

const ionInfinite = (event) => {
  if (!reachedEnd.value) {
    setTimeout(() => {
      lastIndex.value += 5;

      event.target.complete();
    }, 500);
  } else {
    event.target.disabled = true;
  }
};

const handleRefresh = () => {
  window.location.reload();
  setTimeout(() => {
    event.target.complete();
  }, 1000);
};

function searchStoreHandler(event) {
  const query = event.target.value.toLowerCase();

  fetchStoresData(query);
}

function showDetailStoreCard() {
  isStoreDetailCardVisible.value = true;
  syncVisitButtons();

  const storeDetailElement = document.getElementById("store-detail-card");
  storeDetailElement.style.display = "block";
}

function syncVisitButtons() {
  const detail = detailStoreInfoDistri.value;

  if (!detail) {
    disabledCheckIn.value = true;
    disabledCheckOut.value = true;
    return;
  }

  const hasCheckIn = detail.waktu_masuk !== null;
  const hasCheckOut = detail.waktu_keluar !== null;

  if (!hasCheckIn) {
    disabledCheckIn.value = false;
    disabledCheckOut.value = true;
    return;
  }

  if (hasCheckIn && !hasCheckOut) {
    disabledCheckIn.value = true;
    disabledCheckOut.value = false;
    return;
  }

  disabledCheckIn.value = false;
  disabledCheckOut.value = true;
}

function closeDetailCardBtnHandler() {
  isStoreDetailCardVisible.value = false;
  disabledCheckIn.value = true;
  disabledCheckOut.value = true;

  const storeDetailElement = document.getElementById("store-detail-card");
  storeDetailElement.style.display = "none";
}

function clearImage() {
  imageUrl.value = null;
  imageLocation.value = null;
  checkInImageUrls.value = [];
  checkInImageLocations.value = [];
  checkOutImageUrls.value = [];
  checkOutImageLocations.value = [];
  keteranganIn.value = "";
  keteranganOut.value = "";
  renderModCheckInBtn.value = false;
  renderModeCheckOutBtn.value = false;
  syncVisitButtons();
}

function goToPurchase(store_id) {
  try {
    this.router.replace(
      { name: "storeDetail", params: { id: store_id } },
      "forward"
    );
    catchToastError(store_id, 3000);
  } catch (error) {
    catchToastError(error.response, 3000);
  }
}

function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
}

async function passCheckInAlert() {
  return alertController
    .create({
      header: "Konfirmasi Absen Check In",
      message: "Apakah kamu yakin?",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
          handler: () => {
            console.log("Batal melakukan absensi check-in");
          },
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            saveCheckInImage();

            console.log("Berhasil melakukan absensi check-in");
          },
        },
      ],
    })
    .then((a) => a.present());
}

async function passCheckOutAlert() {
  return alertController
    .create({
      header: "Konfirmasi Absen Check Out",
      message: "Apakah kamu yakin?",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
          handler: () => {
            console.log("Batal melakukan absensi check-out");
          },
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            console.log("Berhasil melakukan absensi check-out");

            saveCheckOutImage();
          },
        },
      ],
    })
    .then((a) => a.present());
}

// rest api (backend server)
async function fetchStoresData(query = "") {
  try {
    await presentLoading();
    refreshAccessTokenHandler();
    lastIndex.value = 5;

    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;
    const userId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.get(
      `${API_URL.value}/api/v2/stores/call-plans`,
      {
        headers: headers,
        params: {
          q: query,
          userId: userId.user_id,
        },
      }
    );

    storeInfoDistri.value = Array.isArray(response.data.resource.data)
      ? response.data.resource.data
      : [];

    let canAbsenVisit = true;
    Object.keys(storeInfoDistri.value).forEach((key) => {
      const value = storeInfoDistri.value[key];

      if (value.waktu_keluar == null || value.waktu_masuk == null) {
        value.enableAbsenBtn = false;
        canAbsenVisit = false;
      } else {
        value.enableAbsenBtn = true;
      }

      if (value.waktu_keluar !== null && value.waktu_masuk !== null) {
        value.enableAbsenBtn = true;
      }

      // console.log(value.waktu_masuk);
      if (value.waktu_masuk !== null) {
        value.enablePurchaseOrderBtn = false;
      } else {
        value.enablePurchaseOrderBtn = true;
      }

      // catchToastError(statusGPS.value);
      // if (!statusGPS.value) {
      //   value.enablePurchaseOrderBtn = true;
      //   value.enableAbsenBtn = true;
      // }
    });
  } catch (error) {
    // catchToastError('Failed to fetch store data', 3000);
    catchToastWarn("Belum Ada Call Plan Hari Ini!", 3000);

    console.error("Failed to fetch store data: ", error);
  } finally {
    await stopLoading();
  }
}

async function fetchOneStoreData(id) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;
    const userId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.get(`${API_URL.value}/api/v2/stores/${id}`, {
      headers: headers,
      params: {
        userId: userId.user_id,
      },
    });

    detailStoreInfoDistri.value = response.data.resource;

    showDetailStoreCard();

    await nextTick();

    document.getElementById("check-in-button").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } catch (error) {
    catchToastError(`Failed to fetch store ${id}`, 3000);

    console.error(`Failed to fetch store ${id}: `, error);
  }
}

async function uploadCheckInImage(userNumber) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    let formData = new FormData();
    formData.append("image", checkInImageLocations.value[0]);
    if (checkInImageLocations.value[1]) {
      formData.append("image_secondary", checkInImageLocations.value[1]);
    }
    formData.append("store_id", detailStoreInfoDistri.value.store_id);
    formData.append("lat_in", latitude.value);
    formData.append("long_in", longitude.value);
    formData.append("keterangan", keteranganIn.value);

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      "Content-Type": "multipart/form-data",
    };

    await presentLoading();

    await axios.post(
      `${API_URL.value}/api/v2/salesmen/${userNumber}/visits`,
      formData,
      {
        headers: headers,
      }
    );

    await fetchStoresData();

    checkInImageUrls.value = [];
    checkInImageLocations.value = [];
    imageUrl.value = null;
    storeInfoDistri.value = null;
    detailStoreInfoDistri.value = null;
    keteranganIn.value = "";
    disabledCheckOut.value = true;

    catchToast("Sukses upload gambar untuk absensi check-in", 3000);
  } catch (error) {
    catchToastError("Gagal upload gambar untuk absensi check-in", 3000);

    // console.error('Gagal upload gambar untuk absensi check-in', error);
    console.log(error?.response?.data?.message || error.message);
  } finally {
    await stopLoading();
  }
}

async function uploadCheckOutImage(userNumber) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    let formData = new FormData();
    formData.append("image", checkOutImageLocations.value[0]);
    if (checkOutImageLocations.value[1]) {
      formData.append("image_secondary", checkOutImageLocations.value[1]);
    }
    formData.append("lat_out", latitude.value);
    formData.append("long_out", longitude.value);
    formData.append("keterangan_out", keteranganOut.value);

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      "Content-Type": "multipart/form-data",
    };

    await presentLoading();

    await axios.post(
      `${API_URL.value}/api/v2/salesmen/${userNumber}/visits/${detailStoreInfoDistri.value.visit_id}`,
      formData,
      {
        headers: headers,
      }
    );

    await fetchStoresData();

    checkOutImageUrls.value = [];
    checkOutImageLocations.value = [];
    imageUrl.value = null;
    storeInfoDistri.value = null;
    detailStoreInfoDistri.value = null;
    keteranganOut.value = "";

    catchToast("Sukses upload gambar untuk absensi check-out", 3000);
    redirectToHomePage();
  } catch (error) {
    catchToastError("Gagal upload gambar untuk absensi check-out", 3000);

    console.error("Gagal upload gambar untuk absensi check-out", error);
  } finally {
    await stopLoading();
  }
}

async function saveCheckInImage() {
  if (checkInImageLocations.value.length === 0) {
    catchToastWarn("Ambil foto check-in terlebih dahulu", 3000);
    return;
  }

  await uploadCheckInImage(user.value.number);

  disabledPurchaseOrderBtn.value = false;

  disabledCheckIn.value = true;

  if (renderModCheckInBtn.value) {
    renderModCheckInBtn.value = false;
  }

  // if (disabledCheckOut.value) {
  //   disabledCheckOut.value = false;
  // }
}

async function saveCheckOutImage() {
  if (checkOutImageLocations.value.length === 0) {
    catchToastWarn("Ambil foto check-out terlebih dahulu", 3000);
    return;
  }

  await uploadCheckOutImage(user.value.number);

  disabledCheckOut.value = true;

  if (renderModeCheckOutBtn.value) {
    renderModeCheckOutBtn.value = false;
  }
}

async function takeCheckInPicture() {
  try {
    if (checkInImageUrls.value.length >= 2) {
      catchToastWarn("Foto check-in maksimal 2 kali dalam satu sesi", 3000);
      return;
    }

    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    if (image && image.webPath) {
      renderModCheckInBtn.value = true;
      checkInImageUrls.value.push(image.webPath.toString());
      checkInImageLocations.value.push(
        await fetch(image.webPath).then((r) => r.blob())
      );
    } else {
      catchToastError("Failed to capture photo or image path is missing", 3000);

      console.error("Failed to capture photo or image path is missing");
    }
  } catch (error) {
    catchToastError("Error when capturing photo", 3000);

    console.error("Error when capturing photo: ", error);
  }
}

async function takeCheckOutPicture() {
  try {
    if (checkOutImageUrls.value.length >= 2) {
      catchToastWarn("Foto check-out maksimal 2 kali dalam satu sesi", 3000);
      return;
    }

    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    if (image && image.webPath) {
      renderModeCheckOutBtn.value = true;
      checkOutImageUrls.value.push(image.webPath.toString());
      checkOutImageLocations.value.push(
        await fetch(image.webPath).then((r) => r.blob())
      );
    } else {
      catchToastError("Failed to capture photo or image path is missing", 3000);

      console.error("Failed to capture photo or image path is missing");
    }
  } catch (error) {
    catchToastError("Error when capturing photo", 3000);

    console.error("Error when capturing photo: ", error);
  }
}

onMounted(async () => {
  currentRoute.value = null;
  await presentLoading();

  refreshAccessTokenHandler();
  printCurrentPosition();
  if (user != null || user != "") {
    await fetchStoresData();
  }
  await checkLocationAccess();

  await stopLoading();
});
</script>

<style scoped>
#save-btn {
  --background: green;
}

#clear-btn {
  --background: red;
}

ion-col {
  background-color: transparent;
}

ion-content {
  --backgroun: white;
}

ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}

ion-button {
  --background: #40a2d8;
}

ion-button[disabled] {
  --background: rgb(228, 228, 228);
  --color: rgb(126, 126, 126);
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}

.store-detail-card {
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  opacity: 0;
  transform: translateY(-10px);
}

.store-detail-card.show {
  opacity: 1;
  transform: translateY(0);
}

.visit-container {
  margin-top: 28%;
  flex-direction: column;
  /* background-color: white; */
  align-items: center;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
