<template>
    <form
    novalidate
    @submit.prevent="updateProfile(authUser.number)"
    :validation-schema="formProfileValidate">
        <div class="mb-6">
            <label for="number" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Sales:</label>
            <input
            v-model="authUser.number"
            :disabled="disabledNumberInput"                    
            type="text" 
            id="number" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Masukkan nomor sales" />
        </div> 
        <div class="mb-6">
            <label for="fullname" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nama Lengkap:</label>
            <input
            v-model="authUser.fullname"                    
            type="text" 
            id="fullname" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Masukkan nama lengkap" />
        </div> 
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-bold text-gray-900 text-left">Alamat Email:</label>
            <input
            v-model="authUser.email"                    
            type="email" 
            id="email" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Masukkan alamat email" />
        </div> 
        <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-bold text-gray-900 text-left">Username:</label>
            <input 
            v-model="authUser.username"                    
            type="text" 
            id="username" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Masukkan username" />
        </div> 
        <div class="mb-6">
            <label for="nik" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Induk Kependudukan:</label>
            <input
            v-model="authUser.nik"                     
            type="text" 
            id="nik" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Masukkan nomor induk kependudukan" />
        </div>
        <div class="mb-6">
            <label for="nomor-handphone" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Handphone:</label>
            <input
            v-model="authUser.phone_number"                     
            type="text" 
            id="nomor-handphone" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Masukkan nomor handphone" />
        </div> 
        <!-- <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
        </div> -->
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Simpan</button>
    </form>
</template>

<script setup>
import * as Yup from 'yup';
import { refreshAccessTokenHandler } from '@/services/auth';
import { API_URL } from '@/services/globalVariables';
import { onMounted, ref } from 'vue';
import { catchToast, catchToastError } from '@/services/toastHandlers'; 
import axios from 'axios';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const authUser = ref(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

const disabledNumberInput = ref(true);

const formProfileData = ref({
  number: authUser.value.number,
  nik: authUser.value.nik,
  fullname: authUser.value.fullname,
  phone: authUser.value.phone,
  email: authUser.value.email,
  name: authUser.value.name,
});

const formProfileValidate = Yup.object().shape({
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
    .max(20, "Nomor telepon tidak boleh lebih dari 20 karakter."),
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

onMounted(() => {
  refreshAccessTokenHandler();
})
</script>

<style scoped>
#number[disabled] {
  background-color: rgb(228, 228, 228);
  color: rgb(126, 126, 126);
}
</style>