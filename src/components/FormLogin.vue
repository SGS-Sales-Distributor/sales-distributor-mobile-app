<template>
    <form
    novalidate 
    class="space-y-6" 
    method="post"
    @submit.prevent="login"
    :validation-schema="formLoginValidate">
        <!-- Email Input -->
        <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <vee-field
                v-model="formData.email" 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                placeholder="Email address" 
                aria-label="email" 
                aria-describedby="email"
                class="
                block 
                w-full 
                bg-transparent
                rounded-md 
                ring-1
                ring-inset
                ring-gray-300
                py-2.5
                px-2.5 
                text-gray-900
                shadow-sm
                focus:ring-2
                focus:ring-inset
                focus:ring-blue-500
                focus:outline-0
                disabled:border-0
                placeholder:text-gray-400
                transition-all  
                sm:text-md 
                sm:leading-6"
                />
                <vee-error-message name="email" class="mt-4 text-rose-500" />
            </div>
        </div>

        <!-- Password Input -->
        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
                <vee-field 
                v-model="formData.password"
                id="password" 
                name="password" 
                type="password" 
                placeholder="******"
                autocomplete="current-password" 
                aria-label="password" 
                aria-describedby="password"
                class="
                block 
                w-full 
                bg-transparent
                rounded-md 
                ring-1
                ring-inset
                ring-gray-300
                py-2.5
                px-2.5 
                text-gray-900 
                shadow-sm
                focus:ring-2
                focus:ring-inset
                focus:ring-blue-500
                focus:outline-0
                disabled:border-0
                placeholder:text-gray-400
                transition-all  
                sm:text-md 
                sm:leading-6"
                />
                <vee-error-message name="password" class="mt-4 text-rose-500" />
            </div>
        </div>

        <!-- Submit button -->
        <div class="flex flex-col space-y-6">
            <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                <span>Login</span>
            </button>
        </div>
        <!-- End of Submit Button -->
    </form>
</template>

<script setup>
import * as Yup from 'yup';
import router from '@/router';
import { catchToast, catchToastError } from '@/services/toastHandler'; 
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from '@/services/globalVariables';
import { loadingController } from '@ionic/vue';

const renderLoading = ref(null);

const formData = ref({
  email: null,
  password: null,
});

const formLoginValidate = Yup.object().shape({
  email: Yup.string()
    .required('Email diperlukan, tidak dapat kosong!')
    .max(255, 'Email tidak boleh lebih dari 255 karakter')
    .email('Email tidak valid, gunakan format email yang resmi!'),
  password: Yup.string()
    .required('Password diperlukan, tidak dapat kosong!')
    .max(100, 'Password tidak boleh lebih dari 100 karakter')
    .min(8, 'Password harus minimal memiliki 8 karakter')
});

function redirectToHomePage() {
  setTimeout(() => {
    router.push({
      path: '/home'
    })
  }, 1000);
}

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

async function login() {
  try {
    presentLoading();

    const response = await axios.post(`${API_URL.value}/api/v2/auth/login`, formData.value);
    
    const tokens = response.data.resource.tokens;
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    localStorage.setItem("tokens", JSON.stringify(tokens));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    stopLoading();
    
    catchToast(response.data.message, 3000);

    redirectToHomePage();
  } catch (error) {
    catchToastError(error.message, 3000);
    
    console.error('Failed to logged in: ', error);
  } finally {
    stopLoading();
  }
}
</script>