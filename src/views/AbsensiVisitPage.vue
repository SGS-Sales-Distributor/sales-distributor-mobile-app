<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header -->
      <HeaderSection />
      <!-- End of header -->

      <LocationNotAllowed v-if="!statusGPS" />

      <!-- Card -->
      <div v-if="statusGPS" class="flex min-h-full flex-col px-4 py-4">
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
                  Data dari toko <span class="font-bold">{{ detailStoreInfoDistri.nama_toko }}</span> secara detail.
                </span>
              </ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <div class="border-t border-gray-200">
                <dl>
                  <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Nama Toko
                    </dt>
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
                    <dt class="text-md font-bold text-gray-900">
                      Alamat Toko
                    </dt>
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
                    <dd v-if="detailStoreInfoDistri.nama_pemilik_toko"
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.nama_pemilik_toko }}
                    </dd>
                    <dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ion-badge color="danger">Tidak Ada</ion-badge>
                    </dd>
                  </div>
                  <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-md font-bold text-gray-900">
                      Email Pemilik Toko
                    </dt>
                    <dd v-if="detailStoreInfoDistri.email_pemilik_toko"
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ detailStoreInfoDistri.email_pemilik_toko }}
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
            class="w-full py-2 rounded-lg font-bold text-nowrap">
            Check-In
          </ion-button>
          <ion-button :disabled="disabledCheckOut" @click="takeCheckOutPicture" id="check-out-button"
            class="w-full py-2 rounded-lg font-bold text-nowrap">
            Check-Out
          </ion-button>
        </div>
        <div class="flex w-full items-center justify-center px-4 pb-2">
          <img v-if="imageUrl" :src="imageUrl" id="preview-photo" alt="Captured Photo"
            style="max-width: 100%; height: 400px;" />
        </div>

        <ion-grid v-if="statusGPS" :fixed="true">
          <ion-row v-if="renderModCheckInBtn">
            <ion-col style="margin: 20px">
              <ion-button @click="passCheckInAlert" id="save-btn">Save</ion-button></ion-col>
            <ion-col></ion-col>
            <ion-col style="margin: 20px">
              <ion-button @click="clearImage" id="clear-btn">Clear</ion-button>
            </ion-col>
          </ion-row>
          <ion-row v-if="renderModeCheckOutBtn">
            <ion-col style="margin: 20px">
              <ion-button @click="passCheckOutAlert" id="save-btn">Save</ion-button>
            </ion-col>
            <ion-col></ion-col>
            <ion-col style="margin: 20px">
              <ion-button @click="clearImage" id="clear-btn">Clear</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-searchbar :debounce="300" @ionInput="searchStoreHandler($event)" placeholder="Cari nama toko..." color="light"></ion-searchbar>

        <div v-for="(store, index) in visibleStores" :key="index + 1" class="relative overflow-x-auto">
          <ion-card v-if="statusGPS" class="py-2 odd:bg-blue-500 even:bg-sky-400">
            <ion-card-header class="bg-gray-50">
              <div class="flex flex-col w-full h-full space-y-2">
                <div class="flex flex-row w-full h-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama Toko</label>
                  <p class="flex-initial w-44 text-right">{{ store.nama_toko }}</p>
                </div>
                <div v-if="store.tanggal_visit" class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Tanggal Visit</label>
                  <p class="flex-initial w-44 text-right">{{ new Date(store.tanggal_visit).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    weekday: 'long',
                    month: 'long',
                    year: 'numeric'
                  }) }}</p>
                </div>
                <div v-else class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial font-semibold">Tanggal Visit</label>
                  <ion-badge color="danger">Belum Visit</ion-badge>
                </div>
                <div v-if="store.waktu_masuk !== null" class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Waktu Check-In</label>
                  <p class="flex-initial w-44 text-right">{{ store.waktu_masuk }} WIB</p>
                </div>
                <div v-else class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial font-semibold">Waktu Check-In</label>
                  <ion-badge color="danger">Belum Absen</ion-badge>
                </div>
                <div v-if="store.waktu_keluar" class="flex flex-row w-full justify-between space-x-2">
                  <label for="nama-toko" class="flex-initial w-56 font-semibold">Waktu Check-Out</label>
                  <p class="flex-initial w-44 text-right">{{ store.waktu_keluar }} WIB</p>
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
                    <div class="h-2.5 w-2.5 rounded-full bg-rose-600 me-2"></div>
                    <ion-badge color="danger">Belum Disetujui</ion-badge>
                  </div>
                </div>
              </div>
            </ion-card-header>
            <ion-card-content class="bg-gray-50">
              <div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
                <ion-button :disabled="store.enableAbsenBtn" @click="fetchOneStoreData(store.store_id)"
                  size="small">
                  <ion-icon slot="start" :icon="camera"></ion-icon>
                  Absen
                </ion-button>

                <router-link :to="{ name: 'storeDetail', params: { id: store.store_id } }">
                  <ion-button :disabled="store.enablePurchaseOrderBtn" size="small">
                    <ion-icon slot="start" :icon="documentAttach"></ion-icon>
                    <span class="text-nowrap">Purchase Order</span>
                  </ion-button>
                </router-link>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        <ion-infinite-scroll @ionInfinite="ionInfinite">
          <ion-infinite-scroll-content loading-text="Load more stores..." loading-spinner="bubbles"></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import axios from 'axios';

import {
  documentAttach,
  camera
} from 'ionicons/icons';

import HeaderSection from '@/components/HeaderSection.vue';
import AddressInfoSection from '@/components/absensi/AddressInfoSection.vue';
import LocationNotAllowed from './../components/absensi/LocationNotAllowed.vue'
import MapContentSection from '@/components/absensi/MapContentSection.vue';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { computed, onMounted, ref, shallowRef } from 'vue';
import { alertController } from '@ionic/vue';

import { printCurrentPosition, checkLocationAccess } from '@/services/locationHandlers';
import { statusGPS, API_URL, latitude, longitude } from '@/services/globalVariables';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { refreshAccessTokenHandler } from '@/services/auth.js';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const user = ref(JSON.parse(localStorage.getItem("user")));
const renderModCheckInBtn = ref(false);
const renderModeCheckOutBtn = ref(false);
const disabledCheckIn = ref(true);
const disabledCheckOut = ref(true);
const disabledPurchaseOrderBtn = ref(true);
const detailStoreInfoDistri = ref(null);
const imageUrl = shallowRef("");
const imageLocation = ref(null);

const storeInfoDistri = ref([]);

const lastIndex = ref(5);
const visibleStores = computed(() => {
  return storeInfoDistri.value && storeInfoDistri.value.length > 0 
    ? storeInfoDistri.value.slice(0, lastIndex.value) 
    : [];
});
const reachedEnd = computed(() => {
  return Array.isArray(storeInfoDistri.value) && lastIndex.value >= storeInfoDistri.value.length; 
});

const ionInfinite = (event) => {
  if (!reachedEnd.value) {
    setTimeout(() => {
      lastIndex.value += 5;

      event.target.complete();
    }, 1000);
  } else {
    event.target.disabled = true;
  }
}

function searchStoreHandler(event) {
    const query = event.target.value.toLowerCase();
    fetchStoresData(query);
}

function showDetailStoreCard() {
  if (detailStoreInfoDistri.value.waktu_masuk !== null) {
    disabledCheckIn.value = true;
    disabledCheckOut.value = false;
  } else {
    disabledCheckIn.value = false;
    disabledCheckOut.value = true;

    const storeDetailCard = document.getElementById("store-detail-card");
    storeDetailCard.classList.add("show");
    storeDetailCard.style.display = 'block';
  }
}

function closeDetailCardBtnHandler() {
  disabledCheckIn.value = true;
  disabledCheckOut.value = true;

  const storeDetailCard = document.getElementById("store-detail-card");

  document.getElementById("close-btn").addEventListener("click", function () {
    storeDetailCard.classList.remove("show");

    setTimeout(() => {
      storeDetailCard.style.display = 'none';
    }, 100);
  })
}

function clearImage() {
  imageUrl.value = null;

  renderModCheckInBtn.value = false;
  renderModeCheckOutBtn.value = false;

  if (!disabledCheckIn.value) {
    disabledCheckIn.value = true;
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
      //subHeader: "",
      //cssClass: "alertDanger",
      message: "Apakah kamu yakin?",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
          handler: () => {
            console.log("send otp no");
          },
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            console.log("send otp yes");
            saveCheckInImage();
          },
        },
      ],
    })
    .then((a) => a.present());
  //alert(message);
}

async function passCheckOutAlert() {
  return alertController
    .create({
      header: "Konfirmasi Absen Check Out",
      //subHeader: "",
      //cssClass: "alertDanger",
      message: "Apakah kamu yakin?",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
          handler: () => {
            console.log("send otp no");
          },
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            console.log("send otp yes");
            saveCheckOutImage();
          },
        },
      ],
    })
    .then((a) => a.present());
  //alert(message);
}

// rest api (backend server)
async function fetchStoresData(query = '') {
  refreshAccessTokenHandler();

  const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.access_token}`
  };

  try {
    const response = await axios.get(`${API_URL.value}/api/v2/stores`, {
      headers: headers,
      params: {
        q: query,
      },
    });

    storeInfoDistri.value = response.data.resource.data;

    let canAbsenVisit = true;

    Object.keys(storeInfoDistri.value).forEach(key => {
      const value = storeInfoDistri.value[key];
      if (canAbsenVisit && (value.waktu_keluar == null || value.waktu_masuk == null)) {
        value.enableAbsenBtn = false;
        canAbsenVisit = false
      } else {
        value.enableAbsenBtn = true;
      }

      if (value.waktu_masuk != null) {
        value.enablePurchaseOrderBtn = false;
      } else {
        value.enablePurchaseOrderBtn = true;
      }


      if (!statusGPS.value) {
        value.enablePurchaseOrderBtn = true;
        value.enableAbsenBtn = true;
      }
    });
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error('Failed to fetch store data: ', error);
  }
}

async function fetchOneStoreData(id) {
  refreshAccessTokenHandler();

  const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.access_token}`
  };

  try {
    const response = await axios.get(`${API_URL.value}/api/v2/stores/${id}`, {
      headers: headers
    });

    detailStoreInfoDistri.value = response.data.resource;

    showDetailStoreCard();

    setTimeout(() => {
      document.getElementById("check-in-button").scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 300);
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error(`Failed to fetch store ${id}: `, error);
  }
}

async function saveCheckInImage() {
  const response = await fetch(imageUrl.value);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);

  console.log("url", base64Data);

  imageUrl.value = base64Data;

  await uploadCheckInImage(user.value.number);

  disabledPurchaseOrderBtn.value = false;

  disabledCheckIn.value = true;

  if (renderModCheckInBtn.value) {
    renderModCheckInBtn.value = false;
  }

  if (disabledCheckOut.value) {
    disabledCheckOut.value = false;
  }
}


async function saveCheckOutImage() {
  const response = await fetch(imageUrl.value);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);

  console.log("url", base64Data);

  imageUrl.value = base64Data;

  uploadCheckOutImage(user.value.number);

  disabledCheckOut.value = true;

  if (renderModeCheckOutBtn.value) {
    renderModeCheckOutBtn.value = false;
  }

  const previewPhoto = document.getElementById("preview-photo");
  previewPhoto.style.display = "none";
}

async function uploadCheckInImage(userNumber) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    let formData = new FormData();
    formData.append("image", imageLocation.value);
    formData.append("store_id", detailStoreInfoDistri.value.store_id);
    formData.append("lat_in", latitude.value);
    formData.append("long_in", longitude.value);

    const headers = {
      'Authorization': `Bearer ${tokens.access_token}`,
      'Content-Type': 'multipart/form-data',
    }

    presentLoading();

    const response = await axios.post(`${API_URL.value}/api/v2/salesmen/${userNumber}/visits`, 
      formData, {
      headers: headers 
    });

    fetchStoresData();

    stopLoading();

    imageUrl.value = null;
    storeInfoDistri.value = null;
    detailStoreInfoDistri.value = null;
    disabledCheckOut.value = true;

    catchToast("Sukses upload gambar untuk absensi check-in", 3000);

    // console.log("Sukses upload gambar untuk absensi check-in", response);
  } catch (error) {
    catchToastError(error.message);

    console.error('Gagal upload gambar untuk absensi check-in', error);
  }
}

async function uploadCheckOutImage(userNumber) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    let formData = new FormData();
    formData.append("image", imageLocation.value);
    formData.append("lat_out", latitude.value);
    formData.append("long_out", longitude.value);

    const headers = {
      'Authorization': `Bearer ${tokens.access_token}`,
      'Content-Type': 'multipart/form-data',
    }

    presentLoading();

    const response = await axios.post(`${API_URL.value}/api/v2/salesmen/${userNumber}/visits/${detailStoreInfoDistri.value.visit_id}`, 
      formData, {
      headers: headers 
    });

    fetchStoresData();
    
    stopLoading();

    imageUrl.value = null;
    storeInfoDistri.value = null;
    detailStoreInfoDistri.value = null;

    catchToast("Sukses upload gambar untuk absensi check-out", 3000);
    
    // console.log("Sukses upload gambar untuk absensi check-out", response);
  } catch (error) {
    catchToastError(error.message);

    console.error('Gagal upload gambar untuk absensi check-in', error);
  }
}

async function takeCheckInPicture() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    if (image && image.webPath) {
      renderModCheckInBtn.value = true;
      imageUrl.value = image.webPath.toString();

      // console.log(`Captured photo path: ${imageUrl.value}`);

      imageLocation.value = await fetch(image.webPath).then((r) => r.blob());
      // console.log(imageLocation.value);
    } else {
      catchToastError('Failed to capture photo or image path is missing', 3000);

      console.error('Failed to capture photo or image path is missing');
    }
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error('Error when capturing photo: ', error);
  }
}

async function takeCheckOutPicture() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    if (image && image.webPath) {
      renderModeCheckOutBtn.value = true;
      imageUrl.value = image.webPath.toString();

      // console.log(`Captured photo path: ${imageUrl.value}`);

      imageLocation.value = await fetch(image.webPath).then((r) => r.blob());
      // console.log(imageLocation.value);
    } else {
      catchToastError('Failed to capture photo or image path is missing', 3000);

      console.error('Failed to capture photo or image path is missing');
    }
  } catch (error) {
    catchToastError(error.message);

    console.error('Error when capturing photo: ', error);
  }
}

onMounted(() => {
  presentLoading();
  
  refreshAccessTokenHandler();

  fetchStoresData();
  printCurrentPosition();
  checkLocationAccess();
  
  stopLoading();
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
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
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
  --background: #40A2D8;
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
</style>
