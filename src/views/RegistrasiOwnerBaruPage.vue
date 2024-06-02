<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header -->
      <header class="bg-transparent p-4 rounded-b-3xl">
        <div class="flex justify-between">
          <div>
            <button type="button"
              class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
              @click="redirectToRegisterStorePage">
              <ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
            </button>
          </div>
          <div class="flex items-center justify-center">
            <h2 v-if="store.store_name !== null" class="text-center">
              Form Daftar Owner Toko {{ store.store_name }}
            </h2>
            <h2 v-else class="text-center">
              Form Daftar Owner Toko -
            </h2>
          </div>
          <div class="text-md">
            <button type="button"
              class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
              <icon-button>
                <ion-icon class="text-2xl" :icon="ellipsisVerticalOutline" color="dark"></ion-icon>
              </icon-button>
            </button>
          </div>
        </div>
      </header>
      <div class="container mx-auto">
        <div class="flex items-center justify-center min-h-screen">
          <div class="p-8 rounded-lg max-w-sm w-full">
            <h2 v-if="store.store_name" class="text-2xl font-semibold text-center mb-4">Form Pendaftaran Owner Dari
              Outlet {{ store.store_name
              }}</h2>
            <h2 v-else class="text-2xl font-semibold text-center mb-4">Form Pendaftaran Owner Dari Outlet - </h2>
            <p class="text-gray-600 text-center mb-6">Masukkan data yang diperlukan.</p>
            <Form method="post" novalidate :validation-schema="validation" enctype=”multipart/form-data”>
              <div class="mb-4">
                <label for="owner" class="block text-gray-700 text-sm font-semibold mb-2">Nama Owner
                  *</label>
                <Field v-model="formData.owner" :type="fieldTypes.text" id="owner" name="owner"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan nama owner" aria-label="owner" aria-describedby="owner" />
                <ErrorMessage as="div" name="owner" class="mt-1.5 text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="nik_owner" class="block text-gray-700 text-sm font-semibold mb-2">NIK Owner *</label>
                <Field v-model="formData.nik_owner" :type="fieldTypes.text" id="nik_owner" name="nik_owner"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan NIK owner" aria-label="nik_owner" aria-describedby="nik_owner" />
                <ErrorMessage as="div" name="nik_owner" class="mt-1.5 text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="email_owner" class="block text-gray-700 text-sm font-semibold mb-2">Email Owner
                  *</label>
                <Field v-model="formData.email_owner" name="email_owner" :type="fieldTypes.email" id="email_owner"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan email owner" aria-label="email_owner" aria-describedby="email_owner">
                </Field>
                <ErrorMessage as="div" name="email_owner" class="mt-1.5 text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="ktp_image" class="block text-gray-700 text-sm font-semibold mb-2">Gambar KTP Owner
                  *</label>
                <div class="flex justify-around">
                  <button @click="takeKtpPicture" type="button"
                    class="text-white bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                      class="bi bi-camera-fill me-2" viewBox="0 0 16 16">
                      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path
                        d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                    </svg>
                    Ambil Foto
                  </button>
                  <button @click="clearImage" v-if="showSaveAndCancelBtn" type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-rose-500 to-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-x-octagon-fill me-2" viewBox="0 0 16 16">
                      <path
                        d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                    Hapus Foto
                  </button>
                </div>

                <div v-if="ktpImageUrl" class="flex w-full items-center justify-center py-3">
                  <img :src="ktpImageUrl" id="preview-photo" alt="Captured Photo" style="width: 100%; height: 200px;" />
                </div>

              </div>
              <div class="mb-4">
                <label for="photo_other" class="block text-gray-700 text-sm font-semibold mb-2">Gambar Lainnya</label>
                <Field v-model="formData.photo_other" name="photo_other"
                  class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="default_size" aria-label="photo_other" aria-describedby="photo_other" :type="fieldTypes.file"
                  multiple />
              </div>
              <button type="button" @click="storeDataAlert"
                class="w-full bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Daftarkan
              </button>
              <p class="text-gray-600 text-xs text-center mt-4">
                Dengan menekan tombol Daftarkan, maka toko bisa melakukan purchase order.
              </p>
            </Form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import * as Yup from 'yup';
import { chevronBackOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import { redirectToOwnerFormPage, redirectToPurchaseOrderPage, redirectToRegisterStorePage } from '@/services/redirectHandlers';
import { onMounted, ref, shallowRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { refreshAccessTokenHandler } from '@/services/auth';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { fieldTypes } from '@/services/globalVariables';
import { alertController } from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const store = ref(localStorage.getItem("store") ? JSON.parse(localStorage.getItem("store")) : null);

const ktpImageUrl = shallowRef("");
const ktpImageLocation = ref(null);

const photoOther = ref("");
const showSaveAndCancelBtn = ref(false);

const formData = ref({
  owner: null,
  nik_owner: null,
  email_owner: null,
});

const validation = Yup.object().shape({
  owner: Yup.string()
    .required('Nama pemilik tidak boleh kosong!')
    .max(255, 'Nama pemilik tidak boleh lebih dari 255 karakter.'),
  nik_owner: Yup.string()
    .required('NIK pemilik tidak boleh kosong!')
    .max(20, 'NIK tidak boleh lebih dari 20 karaketer'),
  email_owner: Yup.string()
    .required('Email tidak boleh kosong!')
    .max(100, 'Email tidak boleh lebih dari 100 karakter')
    .email(),
});

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

function clearImage() {
  ktpImageUrl.value = null;

  showSaveAndCancelBtn.value = false;
}

async function takeKtpPicture() {
  try {
    const ktpImage = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    if (ktpImage && ktpImage.webPath) {
      showSaveAndCancelBtn.value = true;
      ktpImageUrl.value = ktpImage.webPath.toString();

      ktpImageLocation.value = await fetch(ktpImage.webPath).then((r) => r.blob());
    } else {
      catchToastError('Gagal mengambil foto ktp', 3000);

      console.error('Failed to capture photo or image path is missing');
    }
  } catch (error) {
    console.error('Error when capturing photo: ', error);
  }
}

async function uploadKtpPicture(storeId) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    let data = new FormData();
    data.append("owner", formData.value.owner);
    data.append("nik_owner", formData.value.nik_owner);
    data.append("email_owner", formData.value.email_owner);
    data.append("ktp_owner", ktpImageLocation.value);
    data.append("photo_other", photoOther.value);

    const headers = {
      'Authorization': `Bearer ${tokens.access_token}`,
      'Content-Type': 'multipart/form-data',
    }

    presentLoading();

    await axios.post(`${API_URL.value}/api/v2/stores/${storeId}/owners`, data, {
      headers: headers
    });

    stopLoading();

    ktpImageUrl.value = null;

    catchToast("Sukses upload gambar KTP", 3000);
  } catch (error) {
    catchToastError('Gagal upload gambar KTP', 3000);

    console.error('Gagal upload gambar KTP', error);
  } finally {
    stopLoading();
  }
}

async function saveKtpPicture() {
  const response = await fetch(ktpImageUrl.value);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);

  console.log("url", base64Data);

  ktpImageUrl.value = base64Data;

  await uploadKtpPicture(store.value.store_id);

  if (showSaveAndCancelBtn.value) {
    showSaveAndCancelBtn.value = false;
  }

  // if (disabledCheckOut.value) {
  //   disabledCheckOut.value = false;
  // }
}

async function storeDataAlert() {
  const alert = await alertController.create({
    header: "Konfirmasi pembuatan data owner baru",
    message: "Apakah kamu yakin?",
    buttons: [
      {
        text: "Tidak",
        cssClass: "alert-button-cancel",
        handler: () => {
          console.log("Pembuatan data owner dibatalkan.");
        },
      },
      {
        text: "Lanjutkan",
        cssClass: "alert-button-confirm",
        handler: async () => {
          try {
            console.log("Pembuatan data owner berhasil");

            await saveKtpPicture(store.value.store_id);

            redirectToPurchaseOrderPage();
          } catch (error) {
            console.log("Gagal membuat data pemilik toko", error);

            redirectToOwnerFormPage();
          }
        },
      },
    ],
  });

  return alert.present();
}

onMounted(() => {
  presentLoading();
  refreshAccessTokenHandler();
  stopLoading();
})
</script>