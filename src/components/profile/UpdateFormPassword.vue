<template>
  <form novalidate method="post" @submit="changePassword(user.number)" :validation-schema="validation">
    <div class="mb-6">
      <label for="current-password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Kata Sandi Saat
        Ini:</label>
      <input v-model="formChangePasswordData.current_password" :type="fieldTypes.password" id="current-password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="•••••••••" />
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Kata Sandi:</label>
      <input v-model="formChangePasswordData.password" :type="fieldTypes.password" id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="•••••••••" />
    </div>
    <div class="mb-6">
      <label for="confirm-password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Konfirmasi Kata
        Sandi:</label>
      <input v-model="formChangePasswordData.password_confirmation" :type="fieldTypes.password" id="confirm-password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="•••••••••" />
    </div>
    <button type="submit"
      class="w-full bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Simpan</button>
  </form>
</template>

<script setup>
import * as Yup from 'yup';
import { ref } from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import { API_URL, fieldTypes } from '@/services/globalVariables';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import axios from 'axios';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const formChangePasswordData = ref({
  current_password: null,
  password: null,
  password_confirmation: null,
});

const validation = Yup.object().shape({
  current_password: Yup.string()
    .required('Password diperlukan, tidak dapat kosong!')
    .max(100, 'Password tidak boleh lebih dari 100 karakter')
    .min(8, 'Password harus minimal memiliki 8 karakter'),
  password: Yup.string()
    .required('Password diperlukan, tidak dapat kosong!')
    .max(100, 'Password tidak boleh lebih dari 100 karakter')
    .min(8, 'Password harus minimal memiliki 8 karakter')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  confirm_password: Yup.string()
    .required("Konfirmasi password diperlukan, tidak boleh kosong.")
    .oneOf([Yup.ref('password'), null], "Password tidak match."),
});

async function changePassword(userNumber) {
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

    const response = await axios.patch(`${API_URL.value}/api/v2/salesmen/${userNumber}/change-password`,
      formChangePasswordValidate, {
      headers: headers,
    });

    stopLoading();

    catchToast(response.data.message);
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error("Failed to update salesman password: ", error);
  } finally {
    stopLoading();
  }
}
</script>

<style scoped></style>