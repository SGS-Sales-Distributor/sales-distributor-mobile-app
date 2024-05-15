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
            <h2 class="text-center">
              Form Daftar Owner Toko {{ store.store_name }}
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
            <h2 class="text-2xl font-semibold text-center mb-4">Form Pendaftaran Owner Dari Outlet {{ store.store_name
              }}</h2>
            <p class="text-gray-600 text-center mb-6">Masukkan data yang diperlukan.</p>
            <Form method="post" novalidate :validation-schema="validation">
              <div class="mb-4">
                <label for="store_name" class="block text-gray-700 text-sm font-semibold mb-2">Nama Toko
                  *</label>
                <Field v-model="formData.store_name" :type="fieldTypes.text" id="store_name" name="store_name"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan nama toko" aria-label="store_name" aria-describedby="store_name" />
                <ErrorMessage name="store_name" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="store_alias" class="block text-gray-700 text-sm font-semibold mb-2">Nama
                  Alias Toko *</label>
                <Field v-model="formData.store_alias" :type="fieldTypes.text" id="store_alias" name="store_alias"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan nama alias toko" aria-label="store_alias" aria-describedby="store_alias" />
                <ErrorMessage name="store_alias" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="store_address" class="block text-gray-700 text-sm font-semibold mb-2">Alamat
                  Toko
                  *</label>
                <Field v-model="formData.store_address" name="store_address" as="textarea" id="store_address"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="Masukkan alamat toko" cols="20" rows="10" aria-label="store_address"
                  aria-describedby="store_address">
                </Field>
                <ErrorMessage name="store_address" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="store_phone" class="block text-gray-700 text-sm font-semibold mb-2">Nomor
                  Telepon Toko *</label>
                <Field v-model="formData.store_phone" :type="fieldTypes.phone" id="store_phone" name="store_phone"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="1234-5678-9012" aria-label="store_phone" aria-describedby="store_phone" />
                <ErrorMessage name="store_phone" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="store_fax" class="block text-gray-700 text-sm font-semibold mb-2">Nomor Fax
                  Toko *</label>
                <Field v-model="formData.store_fax" :type="fieldTypes.phone" id="store_fax" name="store_fax"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="1234-5678-9012" aria-label="store_fax" aria-describedby="store_fax" />
                <ErrorMessage name="store_fax" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="store_type" class="block text-gray-700 text-sm font-semibold mb-2">Tipe Toko
                  *</label>
                <Field v-model="formData.store_type_id" as="select" id="store_type" name="store_type"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="1234-5678-9012">
                  <option disabled selected value="">Pilih Tipe Toko</option>
                  <option v-for="type in storeTypes" :key="type.store_type_id" :value="type.store_type_id">
                    {{ type.store_type_name }}
                  </option>
                </Field>
                <ErrorMessage name="store_type" class="text-rose-500" />
              </div>
              <div class="mb-4">
                <label for="subcabang_id" class="block text-gray-700 text-sm font-semibold mb-2">Cabang
                  Toko*</label>
                <Field v-model="formData.subcabang_id" as="select" id="subcabang_id" name="subcabang_id"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  placeholder="1234-5678-9012">
                  <option disabled selected value="">Pilih Cabang Toko</option>
                  <option v-for="cabang in storeCabangs" :key="cabang.id" :value="cabang.id">
                    {{ cabang.nama_cabang }}
                  </option>
                </Field>
                <ErrorMessage name="subcabang_id" class="text-rose-500" />
              </div>
              <button type="button" @click="storeDataAlert"
                class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Daftarkan
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
import { redirectToRegisterStorePage } from '@/services/redirectHandlers';
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

const store = ref(JSON.parse(localStorage.getItem("store")));

const validation = Yup.object().shape({
  owner: Yup.string()
    .required('Nama pemilik tidak boleh kosong!')
    .max(255, 'Nama pemilik tidak boleh lebih dari 255 karakter.'),
  nik_owner: Yup.string()
    .required('NIK pemilik tidak boleh kosong!')
    .max(20, 'NIK tidak boleh lebih dari 20 karaketer'),
  email_owner: Yup.string()
    .required('Email tidak boleh kosong!')
    .max(100, 'Email tidak boleh lebih dari 100 karakter'),
  ktp_owner: Yup.string()
    .nullable()
    .max(255, 'Nama gambar KTP tidak boleh lebih dari 255 karakter'),
  photo_other: Yup.string()
    .nullable()
    .max('Nama gambar Foto tambahan tidak boleh lebih dari 255 karaketer'),
});
</script>

<style scoped></style>