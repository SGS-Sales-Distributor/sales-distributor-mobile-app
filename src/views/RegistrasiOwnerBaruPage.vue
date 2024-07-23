<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <header class="bg-transparent p-4 rounded-b-3xl">
				<div class="flex justify-between">
          <div>
            <button type="button"
            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="NotBack">
            <ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
          </button>
        </div>
        <div class="flex items-center justify-center">
          <h2 class="text-center" v-if="storeData">
            Toko <span class="font-semibold">{{ storeData.nama_toko }}</span>
          </h2>
        </div>
				
      </div>
    </header>
    <div class="container mx-auto">
        <div class="flex justify-center min-h-screen">
          <div class="p-8 rounded-lg max-w-sm w-full">
            <h2 class="text-2xl font-semibold text-center mb-4">Form Pendaftaran Owner Dari Outlet {{ store.store_name
              }}</h2>
            <p class="text-gray-600 text-center mb-6">Masukkan data yang diperlukan.</p>
            <Form @submit="storeDataAlert" method="post" novalidate :validation-schema="validation">
              <div class="mb-4">
                <label for="owner" class="block text-gray-700 text-sm font-semibold mb-2">Nama Owner
                  *</label>
                <Field v-model="formData.owner" :type="fieldTypes.text" id="owner" name="owner"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan nama owner" aria-label="owner" aria-describedby="owner" />
                <ErrorMessage name="owner" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="nik_owner" class="block text-gray-700 text-sm font-semibold mb-2">NIK Owner *</label>
                <Field v-model="formData.nik_owner" :type="fieldTypes.text" id="nik_owner" name="nik_owner"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan NIK owner" aria-label="nik_owner" aria-describedby="nik_owner" />
                <ErrorMessage name="nik_owner" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email Owner
                  *</label>
                <Field v-model="formData.email_owner" name="email" :type="fieldTypes.email" id="email"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan email owner" aria-label="email" aria-describedby="email">
                </Field>
                <ErrorMessage name="email" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="ktp_image" class="block text-gray-700 text-sm font-semibold mb-2">Upload KTP Owner
                  *</label>
                <!-- <Field v-model="formData.ktp_owner" name="ktp_image" :type="fieldTypes.file" id="ktp_image"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan gambar KTP owner" aria-label="ktp_image" aria-describedby="ktp_image">
                </Field> -->
                <p style="color: red;">Diupload Oleh Admin Dari Web</p>
              </div>
              <div class="mb-4">
                <label for="photo_other" class="block text-gray-700 text-sm font-semibold mb-2">Upload Foto Pendukung
                  Lainnya</label>
                <!-- <Field v-model="formData.photo_other" name="photo_other" :type="fieldTypes.file" id="photo_other"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                placeholder="Masukkan gambar lainnya" aria-label="photo_other" aria-describedby="photo_other">
              </Field> -->
                <p style="color: red;">Diupload Oleh Admin Dari Web</p>
              </div>
              <br>
              <button type="submit"
                class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Selesai Registrasi
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
import HeaderSection from './../components/HeaderSection.vue'
import { analytics, chevronBackOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import { redirectToPurchaseOrderPage, redirectToOwnerFormPage, replaceToOwnerFormPage } from '@/services/redirectHandlers';
import { onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { refreshAccessTokenHandler } from '@/services/auth';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { fieldTypes } from '@/services/globalVariables';
import { alertController } from '@ionic/vue';
const showDataStoreInfoDistVal = ref(null);

// const storeId = ref(JSON.parse(resource.store_id));

// const store = JSON.parse(localStorage.getItem("store_id"));
// const getstoreId = JSON.parse(localStorage.getItem("store_id"));
const store =localStorage.getItem("store_id") ? JSON.parse(localStorage.getItem("store_id")) : null;

const formData = ref({
  owner: null,
  nik_owner: null,
  email_owner: null,
  ktp_owner: null,
  photo_other: null,
});

const validation = Yup.object().shape({
  owner: Yup.string()
    .required('Nama pemilik tidak boleh kosong!')
    .max(255, 'Nama pemilik tidak boleh lebih dari 255 karakter.'),
  nik_owner: Yup.string()
    .required('NIK pemilik tidak boleh kosong!')
    .max(16, 'NIK tidak boleh lebih dari 16 Digit!')
    .min(16, 'NIK harus berisi 16 Digit!'),
  email: Yup.string()
    .required('Email tidak boleh kosong!')
    .max(100, 'Email tidak boleh lebih dari 100 karakter')
    .email('Email tidak valid, gunakan format email yang resmi!'),
  ktp_owner: Yup.string()
    .nullable()
    .max(255, 'Nama gambar KTP tidak boleh lebih dari 255 karakter'),
  photo_other: Yup.string()
    .nullable()
    .max('Nama gambar Foto tambahan tidak boleh lebih dari 255 karaketer'),
});

async function storeDataAlert() {
  const alert = await alertController.create({
    header: "Konfirmasi Registrasi Toko Baru",
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
          await saveOwnerData(store);
        },
      },
    ],
  });

  return alert.present();
}

async function saveOwnerData(storeId) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const headers = {
      'Authorization': `Bearer ${tokens.access_token}`,
    }

    presentLoading();

    const response = await axios.post(`${API_URL.value}/api/v2/stores/${storeId}/owners`, formData.value, {
      headers: headers,
    });

    console.log(response);

    stopLoading();

    catchToast(response.data.message, 3000);
    redirectToPurchaseOrderPage();
  } catch (error) {
    if (error.response && error.response.data.status == 401) {
      catchToastError(error.response.data.message, 3000);
      redirectToOwnerFormPage();
      // catchToastError("Gagal membuat data pemilik toko", 3000);
    } else if (error.response.data.status == 500) {
      catchToastError(error.response.data.message, 3000);
      redirectToOwnerFormPage();
    } else {
      // catchToastError('Terjadi Kesalahan Server! Silahkan Coba Beberapa Saat Lagi', 3000);
      // console.error("Failed to save owner data", error);
      catchToastError("Gagal Menyimpan Data Owner toko", 3000);
      redirectToOwnerFormPage();
    }
  } finally {
    stopLoading();
  }
}

function NotBack() {
  catchToastError('Mohon Selesaikan Register Toko Ini !', 3000)
  redirectToOwnerFormPage();
}

onMounted(() => {
  refreshAccessTokenHandler();
  stopLoading();
})
</script>