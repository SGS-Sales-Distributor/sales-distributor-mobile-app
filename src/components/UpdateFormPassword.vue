<template>
    <form
    novalidate
    @submit.prevent="changePassword(authUser.number)"
    :validation-schema="formChangePasswordValidate">
        <div class="mb-6">
            <label for="current-password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Kata Sandi Saat Ini:</label>
            <input
            v-model="formChangePasswordData.current_password" 
            type="password" 
            id="current-password" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="•••••••••"/>
        </div> 
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Kata Sandi:</label>
            <input 
            v-model="formChangePasswordData.password"
            type="password" 
            id="password" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="•••••••••"/>
        </div> 
        <div class="mb-6">
            <label for="confirm-password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Konfirmasi Kata Sandi:</label>
            <input 
            v-model="formChangePasswordData.password_confirmation"
            type="password" 
            id="confirm-password" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="•••••••••"/>
        </div> 
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Simpan</button>
    </form>
</template>

<script setup>
import * as Yup from 'yup';
import { ref } from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import { API_URL } from '@/services/globalVariables';
import { catchToast, catchToastError } from '@/services/toastHandler';
import axios from 'axios';
import { loadingController } from '@ionic/vue';

const renderLoading = ref(null);

const authUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const formChangePasswordData = ref({
  current_password: null,
  password: null,
  password_confirmation: null,
});

const formChangePasswordValidate = Yup.object().shape({
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

function presentLoading() {
  renderLoading.value = loadingController.create({
      message: "Loading...",
    })
    .then((a) => a.present());
  
    return renderLoading.value;
}

function stopLoading() {
  setTimeout(() => {
    loadingController.dismiss();
  }, 100);
}

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

<style scoped>

</style>