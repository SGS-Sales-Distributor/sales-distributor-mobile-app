<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header -->
      <header class="bg-transparent p-4 rounded-b-3xl">
        <div class="flex justify-between">
          <div>
            <button type="button" class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
              <icon-button>
                <ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
              </icon-button>
            </button>
          </div>
          <div class="flex items-center justify-center">
            <h2 class="font-bold">Profile</h2>
          </div>
          <div class="text-md">
            <button type="button" class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
              <icon-button>
                <ion-icon class="text-2xl" :icon="ellipsisVerticalOutline" color="dark"></ion-icon>
              </icon-button>
            </button>
          </div>          
        </div>
      </header>
      <!-- End of header -->

      <!-- Content -->
      <section>
        <div class="flex justify-center align-middle">
          <div class="text-center text-gray-500 max-w-full">
            <img class="w-32 h-32 rounded-full mx-auto" alt="user-photo" src="/public/uknown-profile.jpg">

            <!-- Card here -->
            <div class="rounded-xl overflow-hidden shadow-lg shadow-gray-300 w-96 mb-5">
              <div class="p-6 mx-6">
                <vee-form
                novalidate
                @submit.prevent="updateProfile(authUser.number)"
                :validation-schema="formProfileValidate"
                >
                  <div class="mb-6">
                    <label for="fullname" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nama Lengkap:</label>
                    <input
                    :value="authUser.fullname"                    
                    type="text" 
                    id="fullname" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Masukkan nama lengkap" 
                    />
                  </div> 
                  <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-bold text-gray-900 text-left">Alamat Email:</label>
                    <input
                    :value="authUser.email"                    
                    type="email" 
                    id="email" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Masukkan alamat email"
                    />
                  </div> 
                  <div class="mb-6">
                    <label for="username" class="block mb-2 text-sm font-bold text-gray-900 text-left">Username:</label>
                    <input 
                    :value="authUser.username"                    
                    type="text" 
                    id="username" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="Masukkan username"
                    />
                  </div> 
                  <div class="mb-6">
                    <label for="nik" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Induk Kependudukan:</label>
                    <input
                    :value="authUser.nik"                     
                    type="text" 
                    id="nik" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="Masukkan nomor induk kependudukan"
                    />
                  </div>
                  <div class="mb-6">
                    <label for="nomor-handphone" class="block mb-2 text-sm font-bold text-gray-900 text-left">Nomor Handphone:</label>
                    <input
                    :value="authUser.phone_number"                     
                    type="text" 
                    id="nomor-handphone" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="Masukkan nomor handphone"
                    />
                  </div> 
                  <!-- <div class="flex items-start mb-6">
                      <div class="flex items-center h-5">
                      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
                      </div>
                      <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                  </div> -->
                  <button 
                  type="submit" 
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Simpan
                  </button>
                </vee-form>
              </div>
            </div>
            <!-- End Card Here -->

            <div class="rounded overflow-hidden shadow-lg shadow-gray-300 w-96 mb-5">
              <div class="p-6">
                <vee-form
                novalidate
                @submit.prevent="changePassword(authUser.number)"
                :validation-schema="formChangePasswordValidate"
                >
                  <div class="mb-6">
                    <label for="current-password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Kata Sandi Saat Ini:</label>
                    <input
                    v-model="formChangePasswordData.current_password" 
                    type="password" 
                    id="current-password" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="•••••••••"
                    />
                  </div> 
                  <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Kata Sandi:</label>
                    <input 
                    v-model="formChangePasswordData.password"
                    type="password" 
                    id="password" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="•••••••••"
                    />
                  </div> 
                  <div class="mb-6">
                    <label for="confirm-password" class="block mb-2 text-sm font-bold text-gray-900 text-left">Konfirmasi Kata Sandi:</label>
                    <input 
                    v-model="formChangePasswordData.password_confirmation"
                    type="password" 
                    id="confirm-password" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="•••••••••"
                    />
                  </div> 
                  <button 
                  type="submit" 
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Simpan
                  </button>
                </vee-form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End of Content -->
    </ion-content>
  </ion-page>
</template>

<script setup>
// import ExploreContainer from '@/components/ExploreContainer.vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import axios from 'axios';
import { 
  chevronBackOutline, 
  ellipsisVerticalOutline 
} from 'ionicons/icons';
import * as Yup from 'yup';
import { onMounted, ref } from 'vue';
import { toastController } from '@ionic/vue';

const API_URL = `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`;

const authUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const formProfileData = ref({
  number: null,
  nik: null,
  fullname: null,
  phone: null,
  email: null,
  name: null,
});

const formChangePasswordData = ref({
  current_password: null,
  password: null,
  password_confirmation: null,
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

async function refreshToken() {
  refreshAccessTokenHandler();
}

async function updateProfile(userNumber) {
  try {
    refreshToken();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    if (!tokens) {
      console.error('Access Token and Refresh Token not found.');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
    };

    const response = await axios.patch(`${API_URL}/api/v2/salesmen/${userNumber}/profiles`, formProfileData.value, {
      headers: headers,
    });

    const toast = await toastController.create({
      message: `${response.data.message}`,
      duration: 3000,
      position: "top",
      color: 'success',
    });

    await toast.present();

    console.log("Successfully update profile: ", response);
  } catch (error) {
    console.error("Failed to update profile: ", error);
  }
}

async function changePassword(userNumber) {
  try {
    refreshToken();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    if (!tokens) {
      console.error('Access Token and Refresh Token not found.');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
    };

    const response = await axios.patch(`${API_URL}/api/v2/salesmen/${userNumber}/change-password`, formChangePasswordValidate, {
      headers: headers,
    });

    const toast = await toastController.create({
      message: `${response.data.message}`,
      duration: 3000,
      position: "top",
      color: 'success',
    });

    await toast.present();

    console.log("Successfully update salesman password: ", response);
  } catch (error) {
    console.error("Failed to update salesman password: ", error);
  }
}

onMounted(() => {
  refreshToken();
})
</script>
