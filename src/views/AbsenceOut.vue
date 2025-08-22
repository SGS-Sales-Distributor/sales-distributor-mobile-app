<template>
  <ion-page>
    <HeaderSection />
    <ion-content class="ion-padding" :fullscreen="true">
      <!-- Header -->
      <!-- End of header -->

      <LocationNotAllowed v-if="!statusGPS" />

      <!-- Card -->
      <div v-if="statusGPS" class="absen-cont">
        <div
          v-if="statusGPS && RenderbtnAbsen && !imageUrl"
          class="flex w-full px-6 pb-2 space-x-5"
        >
          <ion-button
            @click="takeCheckOutPicture"
            id="check-out-button"
            class="w-full py-2 rounded-lg font-bold text-nowrap"
          >
            <ion-icon slot="start" :icon="camera"></ion-icon>
            Absen Pulang
          </ion-button>
        </div>
        <br />
        <div v-if="renderModCheckInBtn" class="flex w-full px-6 pb-2 space-x-5">
          <!-- Tombol Pulang -->
          <ion-button
            expand="block"
            color="success"
            class="flex-1"
            @click="passCheckOutAlert"
            id="save-btn"
          >
            <ion-icon slot="start" :icon="checkmark"></ion-icon>
            Pulang
          </ion-button>

          <!-- Tombol Batal -->
          <ion-button
            expand="block"
            color="danger"
            class="flex-1"
            @click="clearImage"
            id="clear-btn"
          >
            <ion-icon slot="start" :icon="close"></ion-icon>
            Batal
          </ion-button>
        </div>
        <div
          class="flex w-full items-center justify-center mt-4 space-x-4 px-6"
        >
          <img
            class="image"
            v-if="imageUrl"
            :src="imageUrl"
            id="preview-photo"
            alt="Captured Photo"
            style="max-width: 90%; height: 300px"
          />
        </div>

        <div class="map-address">
          <AddressInfoSection />

          <!-- Card Content -->
          <MapContentSection />
        </div>
        <!-- End of Card Content -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import axios from "axios";

import { camera, close, checkmark } from "ionicons/icons";

import HeaderSection from "@/components/HeaderSection.vue";
import AddressInfoSection from "@/components/absensi/AddressInfoSection.vue";
import LocationNotAllowed from "./../components/absensi/LocationNotAllowed.vue";
import MapContentSection from "@/components/absensi/MapContentSection.vue";
import router from "@/router";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { computed, onMounted, ref, shallowRef } from "vue";
import { alertController } from "@ionic/vue";

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
import { redirectToHomePage } from "@/services/redirectHandlers";

const user = ref(JSON.parse(localStorage.getItem("user")));
const renderModCheckInBtn = ref(false);
const RenderbtnAbsen = ref(true);
const renderModeCheckOutBtn = ref(false);
const disabledCheckIn = ref(true);
const disabledCheckOut = ref(true);
const disabledPurchaseOrderBtn = ref(true);
const detailStoreInfoDistri = ref(null);
const imageUrl = shallowRef("");
const imageLocation = ref(null);

const tokenset = localStorage.getItem("tokens")
  ? JSON.parse(localStorage.getItem("tokens"))
  : null;
const userId = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";
const storeInfoDistri = ref([]);
const detAbsen = ref();
const printRes = ref(null);
const printRes2 = ref(null);

const lastIndex = ref(5);
const reachedEnd = computed(() => {
  return (
    Array.isArray(storeInfoDistri.value) &&
    lastIndex.value >= storeInfoDistri.value.length
  );
});

function clearImage() {
  imageUrl.value = null;

  renderModCheckInBtn.value = false;
  RenderbtnAbsen.value = true;

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

async function passCheckOutAlert() {
  return alertController
    .create({
      header: "Konfirmasi Absen Pulang",
      message: "Apakah kamu yakin?",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
          handler: () => {
            console.log("Batal Absen Pulang");
          },
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            saveCheckOutImage();

            console.log("Berhasil Absen Pulang");
          },
        },
      ],
    })
    .then((a) => a.present());
}

async function getAbsenDay() {
  try {
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

    detAbsen.value = response.data.resource;
  } catch (error) {
    console.log(error.message, 3000);
  }
}

async function uploadCheckOutImage(userNumber) {
  try {
    refreshAccessTokenHandler();

    let formData = new FormData();
    formData.append("image", imageLocation.value);
    formData.append("lat_out", latitude.value);
    formData.append("long_out", longitude.value);

    const headers = {
      Authorization: `Bearer ${tokenset.access_token}`,
      "Content-Type": "multipart/form-data",
    };

    presentLoading();

    const response = await axios.post(
      `${API_URL.value}/api/v2/addOut/${userNumber}/${detAbsen.value.id}`,
      formData,
      {
        headers: headers,
      }
    );

    stopLoading();

    imageUrl.value = null;
    storeInfoDistri.value = null;
    detailStoreInfoDistri.value = null;

    catchToast(response.data.message, 3000);
    redirectToHomePage();
  } catch (error) {
    // if (error.status === 400) {
      catchToastError(error.response.data.message, 3000);
      redirectToHomePage();
    // }
    // catchToastError(error.message, 3000);
  } finally {
    stopLoading();
  }
}

async function saveCheckOutImage() {
  const response = await fetch(imageUrl.value);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);

  console.log("url", base64Data);

  imageUrl.value = base64Data;

  await uploadCheckOutImage(user.value.user_id);

  disabledPurchaseOrderBtn.value = false;

  disabledCheckIn.value = true;

  if (renderModCheckInBtn.value) {
    renderModCheckInBtn.value = false;
  }

  // if (disabledCheckOut.value) {
  //   disabledCheckOut.value = false;
  // }
}

async function takeCheckOutPicture() {
  try {
    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    if (image && image.webPath) {
      renderModCheckInBtn.value = true;
      imageUrl.value = image.webPath.toString();

      imageLocation.value = await fetch(image.webPath).then((r) => r.blob());
    } else {
      catchToastError("Failed to capture photo or image path is missing", 3000);

      console.error("Failed to capture photo or image path is missing");
    }
  } catch (error) {
    catchToastError("Error when capturing photo", 3000);

    console.error("Error when capturing photo: ", error);
  }
}

onMounted(() => {
  currentRoute.value = null;
  presentLoading();

  refreshAccessTokenHandler();
  printCurrentPosition();
  checkLocationAccess();
  getAbsenDay();

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
  --background: rgb(230, 32, 18);
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

.image {
  margin-top: 80%;
  position: absolute;
  width: 90%;
  height: 90%;
  border-radius: 10px;
  border: #fff 0px solid;
}

.map-address {
  margin-top: 80%;
}

.absen-cont {
  margin-top: 23%;
  position: flex;
  flex-direction: column;
}
</style>