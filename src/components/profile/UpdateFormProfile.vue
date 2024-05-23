<template>
  <form novalidate method="post" @submit="updateProfile(user.number)" :validation-schema="validation">
    <div class="mb-6">
      <label for="number" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Sales:</label>
      <input v-model="formProfileData.number" :disabled="disabledNumberInput" :type="fieldTypes.text" id="number"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukkan nomor sales" />
    </div>
    <div class="mb-6">
      <label for="fullname" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nama Lengkap:</label>
      <input v-model="formProfileData.fullname" :type="fieldTypes.text" id="fullname"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukkan nama lengkap" />
    </div>
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-bold text-gray-900 text-left">Alamat Email:</label>
      <input v-model="formProfileData.email" :type="fieldTypes.email" id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukkan alamat email" />
    </div>
    <div class="mb-6">
      <label for="username" class="block mb-2 text-sm font-bold text-gray-900 text-left">Username:</label>
      <input v-model="formProfileData.username" :type="fieldTypes.text" id="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukkan username" />
    </div>
    <div class="mb-6">
      <label for="nik" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Induk Kependudukan:</label>
      <input v-model="formProfileData.nik" :type="fieldTypes.text" id="nik"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukkan nomor induk kependudukan" />
    </div>
    <div class="mb-6">
      <label for="nomor-handphone" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Handphone:</label>
      <input v-model="formProfileData.phone_number" :type="fieldTypes.phone" id="nomor-handphone"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukkan nomor handphone" />
    </div>
    <button type="submit"
      class="w-full bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Simpan</button>
  </form>
</template>

<script setup>
import * as Yup from 'yup';
import { refreshAccessTokenHandler } from '@/services/auth';
import { API_URL, fieldTypes } from '@/services/globalVariables';
import { ref } from 'vue';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import axios from 'axios';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const user = ref(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

const disabledNumberInput = ref(true);

const formProfileData = ref({
  number: user.value?.number,
  nik: user.value?.nik,
  fullname: user.value?.fullname,
  phone: user.value?.phone,
  email: user.value?.email,
  name: user.value?.name,
});

const validation = Yup.object().shape({
  number: Yup.string()
    .nullable()
    .max(10, "Nomor salesman tidak boleh lebih dari 10 karakter."),
  nik: Yup.string()
    .nullable()
    .max(20, "NIK tidak boleh lebih dari 20 karakter"),
  fullname: Yup.string()
    .nullable()
    .max(200, "Nama lengkap tidak boleh lebih dari 200 karakter."),
  phone: Yup.string()
    .nullable()
    .max(20, "Nomor telepon tidak boleh lebih dari 20 karakter.")
    .matches(/^(?:\+62|62|0)8[1-9][0-9]{6,9}$/),
  email: Yup.string()
    .required('Email diperlukan, tidak dapat kosong!')
    .max(255, 'Email tidak boleh lebih dari 255 karakter')
    .email('Email tidak valid, gunakan format email yang resmi!'),
  name: Yup.string()
    .nullable()
    .max(50, "Username tidak boleh lebih dari 50 karakter."),
});

async function updateProfile(userNumber) {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    if (!tokens) {
      console.error('Access Token and Refresh Token not found.');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
    };

    presentLoading();

    const response = await axios.patch(`${API_URL.value}/api/v2/salesmen/${userNumber}/profiles`, formProfileData.value, {
      headers: headers,
    });

    stopLoading();

    catchToast(response.data.message);
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error("Failed to update profile: ", error);
  } finally {
    stopLoading();
  }
}
</script>

<style scoped>
#number[disabled] {
  background-color: rgb(228, 228, 228);
  color: rgb(126, 126, 126);
}
</style>