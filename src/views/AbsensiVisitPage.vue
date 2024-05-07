<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <!-- Modal -->
      <!-- <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Link URL Gambar</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p style="user-select: all;">{{ imageUrl }}</p>
        </ion-content>
      </ion-modal> -->
      <!-- End of Modal -->

      <!-- Header -->
      <header class="bg-blue-500 py-6 px-6 rounded-b-3xl">
        <div class="flex justify-between">
          <div>
            <a href="/home" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/public/1630597076257.jpeg" class="h-12 rounded-full" alt="Sinergi Global Service" />
              <span class="self-center text-md font-semibold whitespace-nowrap dark:text-white">PT. Sinergi Global
                Service</span>
            </a>
          </div>
          <div>
            <button type="button"
              class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <icon-button>
                <ion-icon class="text-2xl" :icon="notificationsOutline"></ion-icon>
              </icon-button>
              <span class="sr-only">Notifications</span>
              <div
                class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-0 border-white rounded-full -top-2 -end-2">
                20</div>
            </button>
          </div>
        </div>
      </header>
      <!-- End of header -->

      <!-- Card -->
      <div class="flex min-h-full flex-col p-6">
        <!-- Card Header -->
        <ion-card-header>
          <div v-if="checkLocationAccess && statusGPS" class="flex flex-col items-center justify-center pb-3"
            id="geo-address">
            <ion-card-subtitle class="text-md text-gray-900 font-bold pb-2 text-center">Lokasi Anda
              Terkini</ion-card-subtitle>
            <li class="list-none">
              <ion-card-subtitle class="text-blue-500 font-bold text-center">
                <span class="text-gray-900 font-semibold text-xs">{{ currentAddress }}</span>
              </ion-card-subtitle>
            </li>
          </div>
        </ion-card-header>
        <!-- End of Card Header -->

        <!-- Card Content -->
        <ion-card-content>
          <!-- Map -->
          <div v-if="checkLocationAccess" class="flex flex-col items-center justify-center pb-3" id="geo-map">
            <ion-card-subtitle v-if="statusGPS" class="text-md text-gray-900 font-bold pb-2 text-center">Lokasi
              Berdasarkan
              Peta</ion-card-subtitle>
            <li class="list-none map-wrap flex">
              <div class="map" ref="mapContainer"></div>
            </li>
          </div>
          <!-- End of Map -->
        </ion-card-content>
        <!-- End of Card Content -->

        <!-- Detail Store Card -->
        <div class="flex flex-col space-y-2" id="store-detail-card">
          <ion-card v-if="detailStoreInfoDistri" class="shadow-lg shadow-gray-300">
            <ion-card-header>
              <div class="flex justify-between">
                <ion-card-title>
                  <span class="font-bold text-gray-900 text-2xl">Data Detail Toko</span>
                </ion-card-title>
                <button id="close-btn" @click="closeButtonHandler"
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
              <ion-card-subtitle>
                <!-- <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <router-link :to="{ name: 'storeDetail', params: { id: store.store_id } }">
                            <span class="underline underline-offset-2 font-normal transition-all hover:text-blue-500 hover:font-normal">{{ store.store_name }}</span>
                          </router-link>
                        </td> -->
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
        <ion-grid :fixed="true">
          <ion-row v-if="renderModCheckInBtn">
            <ion-col style="margin: 20px">
              <ion-button @click="presentAlert_checkIn">Save</ion-button></ion-col>
            <ion-col></ion-col>
            <ion-col style="margin: 20px">
              <ion-button @click="clearImage">Clear</ion-button>
            </ion-col>
          </ion-row>
          <ion-row v-if="renderModeCheckOutBtn">
            <ion-col style="margin: 20px">
              <ion-button @click="presentAlert_checkOut">Save</ion-button>
              <!-- <a
                class="btn btn-success w-100"
                @click="saveCheckOutImage"
                href="javascript:void(0);"
                >Save</a> -->
            </ion-col>
            <ion-col></ion-col>
            <ion-col style="margin: 20px">
              <ion-button @click="clearImage">Clear</ion-button>
              <!-- <a class="btn btn-danger w-100" @click="clearImage" href="javascript:void(0);">Clear</a> -->
            </ion-col>
          </ion-row>
        </ion-grid>
        <!-- <div v-if="renderModCheckInBtn" class="flex flex-row items-center justify-center pb-2">
          <ion-button @click="saveCheckInImage">Save</ion-button>
          <ion-button @click="clearImage">Clear</ion-button>
        </div>
        <div v-if="renderModeCheckOutBtn" class="flex flex-row items-center justify-center pb-2">
          <ion-button @click="saveCheckOutImage">Save</ion-button>
          <ion-button @click="clearImage">Clear</ion-button>
        </div> -->
        <div class="flex flex-col space-y-2">
          <div class="flex items-center justify-center space-x-2 px-5">
            <ion-icon class="text-xl" :icon="listOutline"></ion-icon>
            <p class="text-gray-900 font-bold text-md">Daftar Absensi Visit</p>
          </div>
          <div class="relative overflow-x-auto shadow-lg shadow-gray-300 rounded-lg">
            <table class="w-full text-sm text-center rtl:text-right text-gray-500">
              <thead class="text-xs text-gray-50 font-bold uppercase bg-blue-400">
                <tr>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Aksi
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Nama Toko
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Tanggal Visit
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Waktu Check-In
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Waktu Check-Out
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Status Approval
                  </th>
                </tr>
              </thead>
              <tbody v-if="storeInfoDistri.length > 0 && statusGPS">
                <tr v-for="(store, index) in storeInfoDistri" :key="index + 1"
                  class="odd:bg-sky-50 even:bg-blue-100 border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <th scope="row" class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {{ index + 1 }}
                  </th>
                  <td class="px-6 py-4">

                    <ion-button :disabled="store.disabledAbsenBtn" @click="fetchOneStoreData(store.store_id)"
                      id="check-in-button" size="small">
                      <ion-icon slot="start" :icon="camera"></ion-icon>
                      Absen
                      <!-- <img src="/public/icons8-purchase-50.png" alt="Sinergi Global Service" /> -->
                    </ion-button>

                    <router-link :to="{ name: 'storeDetail', params: { id: store.store_id } }">
                      <ion-button :disabled="store.disabledPurchaseOrderBtn" size="small">
                        <ion-icon slot="start" :icon="documentAttach"></ion-icon>
                        Purchase Order
                        <!-- <img src="/public/icons8-purchase-50.png" alt="Sinergi Global Service" /> -->
                      </ion-button>
                    </router-link>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="text-gray-900 font-medium whitespace-nowrap transition-all hover:text-blue-500 hover:font-normal">{{
                        store.nama_toko }}</span>
                  </td>
                  <td v-if="store.tanggal_visit" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ new Date(store.tanggal_visit).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: "long",
                      day: "2-digit",
                      weekday: "long"
                    }) }}
                  </td>
                  <td v-else class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <ion-badge color="danger">Belum Visit</ion-badge>
                  </td>
                  <td v-if="store.waktu_masuk" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ store.waktu_masuk }} WIB
                  </td>
                  <td v-else class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <ion-badge color="danger">Belum Check-In Visit</ion-badge>
                  </td>
                  <td v-if="store.waktu_keluar" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ store.waktu_keluar }} WIB
                  </td>
                  <td v-else class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <ion-badge color="danger">Belum Check-Out Visit</ion-badge>
                    <!-- <span class="font-bold text-rose-600"></span> -->
                  </td>
                  <td class="px-6 py-4">
                    <div v-if="store.approval === 1" class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      <ion-badge color="success">Disetujui</ion-badge>
                    </div>
                    <div v-else class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-rose-600 me-2"></div>
                      <ion-badge color="danger">Belum Disetujui</ion-badge>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
// import ExploreContainer from '@/components/ExploreContainer.vue';
// import { Filesystem, Directory } from '@capacitor/filesystem';
import {
  notificationsOutline,
  listOutline,
  documentAttach,
  camera
} from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { onMounted, ref, shallowRef } from 'vue';
import { printCurrentPosition } from '@/services/getCurrentLocation';
import { Map, Marker, GeolocateControl, NavigationControl } from "maplibre-gl";
import { config } from '@maptiler/sdk';
import { refreshAccessTokenHandler } from '@/services/auth.js';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import axios from 'axios';
import { toastController, loadingController, alertController } from '@ionic/vue';
import { catchToast, catchToastError } from '@/services/toastHandler';
// import router from '@/router';

// const isOpen = ref(false);
// const setOpen = (open) => {
//   isOpen.value = open;
// };
const isLocationPermissionAllowed = ref(false);
const mapContainer = shallowRef(null);
const user = JSON.parse(localStorage.getItem("user"));
const renderModCheckInBtn = ref(false);
const renderModeCheckOutBtn = ref(false);
const disabledCheckIn = ref(true);
const disabledCheckOut = ref(true);
const disabledPurchaseOrderBtn = ref(true);
const currentAddress = ref('');
const storeInfoDistri = ref([]);
const detailStoreInfoDistri = ref(null);
const latitude = ref(0);
const longitude = ref(0);
const map = ref(null);
const imageUrl = shallowRef("");
const lokasi_gambar2 = ref(null);
const loading = ref(null);
const statusGPS = ref(false);
const enabledFirstAbsenBtn = ref(false);

const API_URL = `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`;

function showStoreDetailCardHandler() {
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

function closeButtonHandler() {
  disabledCheckIn.value = true;
  disabledCheckOut.value = true;

  const storeDetailCard = document.getElementById("store-detail-card");

  document.getElementById("close-btn").addEventListener("click", function () {
    storeDetailCard.classList.remove("show");

    setTimeout(() => {
      storeDetailCard.style.display = 'none';
    }, 300);
  })
}

async function checkLocationAccess() {
  try {
    if (Capacitor.isNativePlatform) {
      const hasPermission = await Geolocation.checkPermissions();

      if (hasPermission.location === 'granted') {
        catchToast("Akses Lokasi Diterima!", 3000);
        
        isLocationPermissionAllowed.value = true;
        statusGPS.value = true;
      } else {
        catchToastError("Akses Lokasi Ditolak, mohon nyalakan GPS secara manual!", 3000);
        
        isLocationPermissionAllowed.value = false;
        statusGPS.value = false;
      }

      // Check if the elements exist before accessing their styles
      const geoAddress = document.getElementById("geo-address");
      const geoMap = document.getElementById("geo-map");

      if (geoAddress && geoMap) {
        geoAddress.style.display = hasPermission.location === 'granted' ? 'block' : 'none';
        geoMap.style.display = hasPermission.location === 'granted' ? 'block' : 'none';
      } else {
        console.error("Error: Elements 'geo-address' or 'geo-map' not found in the DOM.");
      }
    } else {
      console.warn('Geolocation not supported on web platform.');
    }
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error(`Error checking location access: ${error.message}`);
  }
}

// function redirectToLoginPage() {
//   setTimeout(() => {
//     router.push({
//       path: '/login'
//     })
//   }, 1000);
// }

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

function presentAlert_checkIn() {
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

function presentAlert_checkOut() {
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
async function fetchStoresData() {
  refreshAccessTokenHandler();

  const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.access_token}`
  };

  try {
    presentLoading();

    const response = await axios.get(`${API_URL}/api/v2/stores`, {
      headers: headers
    });

    storeInfoDistri.value = response.data.resource.data;

    Object.keys(storeInfoDistri.value).forEach(key => {
      const value = storeInfoDistri.value[key];

      if (!enabledFirstAbsenBtn.value) {
        // Enable first Absen button for the first row
        value.disabledAbsenBtn = false;

        enabledFirstAbsenBtn.value = true;
      } else {
        // Disable Absen button for subsequent rows
        value.disabledAbsenBtn = true;
      }

      // Disable Purchase Order button if waktu_masuk is null
      value.disabledPurchaseOrderBtn = value.waktu_masuk === null;

      // Disable buttons if GPS status is true
      // if (statusGPS.value) {
      //   value.disabledAbsenBtn = true;
      //   value.disabledPurchaseOrderBtn = true;
      // }
    });
    // Object.keys(storeInfoDistri.value).forEach(key => {
    //   const value = storeInfoDistri.value[key];

    //   if (enableFirstAbsenBtn.value) {
    //     if (!value.waktu_keluar && !value.waktu_masuk) {
    //       value.statusx = false;
    //       enableFirstAbsenBtn.value = true;
    //     } else {
    //       value.statusx = true;
    //     }
    //   } else {
    //     value.statusx = true;
    //   }

    //   if (!value.waktu_masuk) {
    //     value.statusy = true;
    //     enableFirstAbsenBtn.value = true;
    //   } else {
    //     value.statusy = false;
    //   }

    //   if (statusGPS.value) {
    //     value.statusy = true;
    //     value.statusx = true;
    //   }
    // });

    stopLoading();

    console.log(storeInfoDistri.value);
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error('Failed to fetch store data: ', error);
  } finally {
    stopLoading();
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
    presentLoading();

    const response = await axios.get(`${API_URL}/api/v2/stores/${id}`, {
      headers: headers
    });

    detailStoreInfoDistri.value = response.data.resource;

    stopLoading();

    showStoreDetailCardHandler();

    document.getElementById("check-in-button").focus();
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error(`Failed to fetch store ${id}: `, error);
  } finally {
    stopLoading();
  }
}

async function saveCheckInImage() {
  const response = await fetch(imageUrl.value);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);
  console.log("url", base64Data);
  imageUrl.value = base64Data;

  // await Filesystem.writeFile({
  //   path: new Date().getTime() + ".jpeg",
  //   data: base64Data,
  //   directory: Directory.Documents,
  // });

  console.log(user);

  uploadFile(user.number);
  // await saveCheckInPicture(user.number, imageUrl.value);

  // const toast = await toastController.create({
  //   message: "Absen Check-In Berhasil! Yuk Lakukan PO...",
  //   duration: 3000,
  //   position: "top",
  //   color: 'success',
  // });

  // await toast.present();

  disabledPurchaseOrderBtn.value = false;

  disabledCheckIn.value = true;

  if (renderModCheckInBtn.value) {
    renderModCheckInBtn.value = false;
  }


  if (disabledCheckOut.value) {
    disabledCheckOut.value = false;
  }
}

function presentLoading() {
  loading.value = loadingController
    .create({
      message: "Loading...",
    })
    .then((a) => a.present());
  return loading.value;
}

function stopLoading() {
  setTimeout(() => {
    loadingController.dismiss();
  }, 100);
}

async function uploadFile(userNumber) {
  try {
    // const response = await axios.post("/bezkoder.com/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // console.log(response);

    presentLoading();

    refreshAccessTokenHandler();

    const URL = `${API_URL}/api/v2/salesmen/${userNumber}/visits`;

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    let formData = new FormData();
    formData.append("image", lokasi_gambar2.value);
    formData.append("store_id", detailStoreInfoDistri.value.store_id);
    formData.append("lat_in", latitude.value);
    formData.append("long_in", longitude.value);

    const config = {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    await axios.post(URL, formData, config).then(async (res) => {
      imageUrl.value = null;

      fetchStoresData();

      stopLoading();

      storeInfoDistri.value = null;

      detailStoreInfoDistri.value = null;

      disabledCheckOut.value = true;

      const toast = await toastController.create({
        message: "Sukses upload",
        duration: 5000,
        position: "top",
        color: "success",
      });
      toast.present();
    })
      .catch(function (error) {
        alert("(" + error + ")");
        stopLoading();
        console.error(error);
      });
  } catch (e) {
    alert("[" + e + "]");
  }
}

async function uploadFileCheckOut(userNumber) {
  try {
    // const response = await axios.post("/bezkoder.com/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // console.log(response);

    presentLoading();

    refreshAccessTokenHandler();

    const URL = `${API_URL}/api/v2/salesmen/${userNumber}/visits/${detailStoreInfoDistri.value.visit_id}`;

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    let formData = new FormData();
    formData.append("image", lokasi_gambar2.value);
    formData.append("lat_out", latitude.value);
    formData.append("long_out", longitude.value);

    const config = {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(URL, formData, config)
      .then(async (res) => {
        imageUrl.value = null;

        fetchStoresData();

        stopLoading();

        storeInfoDistri.value = null;

        detailStoreInfoDistri.value = null;

        const toast = await toastController.create({
          message: "Sukses upload",
          duration: 5000,
          position: "top",
          color: "success",
        });
        toast.present();
      })
      .catch(function (error) {
        alert("(" + error + ")");
        stopLoading();
        console.error(error);
      });
  } catch (e) {
    alert("[" + e + "]");
  }
}

async function saveCheckOutImage() {
  const response = await fetch(imageUrl.value);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);
  console.log("url", base64Data);
  imageUrl.value = base64Data;

  // await Filesystem.writeFile({
  //   path: new Date().getTime() + ".jpeg",
  //   data: base64Data,
  //   directory: Directory.Documents,
  // });

  uploadFileCheckOut(user.number);

  // const toast = await toastController.create({
  //   message: "Absen Check-Out Berhasil! Lanjut Visit ke Toko lainnya",
  //   duration: 3000,
  //   position: "top",
  //   color: 'success',
  // });

  // await toast.present();

  disabledCheckOut.value = true;

  if (renderModeCheckOutBtn.value) {
    renderModeCheckOutBtn.value = false;
  }

  const previewPhoto = document.getElementById("preview-photo");
  previewPhoto.style.display = "none";
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
      console.log(`Captured photo path: ${imageUrl.value}`);

      // const previewPhoto = document.getElementById("preview-photo");
      // previewPhoto.style.display = "block";

      lokasi_gambar2.value = await fetch(image.webPath).then((r) => r.blob());
      console.log(lokasi_gambar2.value);

    } else {
      console.error('Failed to capture photo or image path is missing');
    }
  } catch (error) {
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
      console.log(`Captured photo path: ${imageUrl.value}`);

      // const previewPhoto = document.getElementById("preview-photo");
      // previewPhoto.style.display = "block";

      lokasi_gambar2.value = await fetch(image.webPath).then((r) => r.blob());
      console.log(lokasi_gambar2.value);

    } else {
      console.error('Failed to capture photo or image path is missing');
    }
  } catch (error) {
    console.error('Error when capturing photo: ', error);
  }
}

async function renderMap() {
  const currentPositions = await printCurrentPosition();
  const [currentLatitude, currentLongitude] = currentPositions;
  const myApiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  config.apiKey = myApiKey;
  latitude.value = currentLatitude;
  longitude.value = currentLongitude;

  try {
    map.value = new Map({
      container: mapContainer.value,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${myApiKey}`,
      center: [longitude.value, latitude.value],
      zoom: 16,
      hash: false
    })
      .addControl(
        new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true
        })
      ).addControl(
        new NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: true,
        })
      )

    new Marker({
      color: "#FF0000"
    })
      .setLngLat([
        longitude.value,
        latitude.value
      ])
      .addTo(map.value);
  } catch (error) {
    console.error('Failed to render map: ', error);
  }
}

async function renderPositionToAddress() {
  const currentPositions = await printCurrentPosition();
  const [currentLatitude, currentLongitude] = currentPositions;

  latitude.value = currentLatitude;
  longitude.value = currentLongitude;

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude.value}&lon=${longitude.value}`);
    const data = await response.json();

    currentAddress.value = data.display_name;

    console.log("Successfully fetch current address: ", currentAddress.value);
  } catch (error) {

    console.error('Error when getting address: ', error);
  }
}

async function saveCheckOutPicture(userNumber, fileUrl) {
  refreshAccessTokenHandler();

  const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.access_token}`
  };

  try {
    const response = await axios.put(`${API_URL}/api/v2/salesmen/${userNumber}/visits/${detailStoreInfoDistri.value.visit_id}`, {
      photo_visit_out: fileUrl,
      lat_out: latitude.value,
      long_out: longitude.value,
    }, {
      headers: headers
    });

    console.log("Successfully store check out visit pictures: ", response);
  } catch (error) {
    console.error("Failed to store check out visit pictures: ", error);
  }
}

async function saveCheckInPicture(userNumber, fileUrl) {
  refreshAccessTokenHandler();

  const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.access_token}`
  };

  try {
    const response = await axios.post(`${API_URL}/api/v2/salesmen/${userNumber}/visits`, {
      store_id: detailStoreInfoDistri.value.id_toko,
      photo_visit: fileUrl,
      lat_in: latitude.value,
      long_in: longitude.value,
    }, {
      headers: headers
    });

    console.log(`Successfully store check in visit pictures: ${response}`);
  } catch (error) {
    console.error("Failed to store check in visit pictures: ", error);
  }
}

onMounted(() => {
  refreshAccessTokenHandler();
  fetchStoresData();
  renderMap();
  renderPositionToAddress();
  printCurrentPosition();
  checkLocationAccess();
});
</script>

<style scoped>
ion-content {
  --background: white;
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


/* .map-wrap {
  position: relative;
  width: 100%;
  height: calc(
    110vh - 420px
  );
}

.map {
  position: absolute;
  width: 100%;
  height: 50%;
} */

.map-wrap {
  position: relative;
  width: 100%;
  height: 300px;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
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
