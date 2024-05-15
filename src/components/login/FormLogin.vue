<template>
    <Form
    novalidate 
    class="space-y-6" 
    method="post"
    @submit="login"
    :validation-schema="formLoginValidate">
        <!-- Email Input -->
        <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <Field
                v-model="formData.email" 
                :type="emailFieldType"
                id="email" 
                name="email" 
                autocomplete="email" 
                placeholder="Masukkan alamat email anda" 
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
                <ErrorMessage name="email" class="mt-4 text-rose-500" />
            </div>
        </div>

        <!-- Password Input -->
        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2 relative">
                <Field 
                v-model="formData.password"
                :type="passwordFieldType"
                id="password" 
                name="password"
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
                <button 
                type="button" 
                @click="togglePasswordVisibility" 
                class="absolute inset-y-0 right-0 px-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                  </svg>
                </button>
              </div>
              <ErrorMessage name="password" class="mt-4 text-rose-500" />
        </div>

        <!-- Submit button -->
        <div class="flex flex-col space-y-6">
            <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                <span>Login</span>
            </button>
        </div>
        <!-- End of Submit Button -->
      </Form>
</template>

<script setup>
import * as Yup from 'yup';
import { catchToast, catchToastError } from '@/services/toastHandlers'; 
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from '@/services/globalVariables';
import { redirectToHomePage } from '@/services/redirectHandlers';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { Form, Field, ErrorMessage } from 'vee-validate';

const passwordFieldType = ref('password');
const emailFieldType = ref('email');

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

function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}

async function login() {
  try {
    presentLoading();

    const response = await axios.post(`${API_URL.value}/api/v2/auth/login`, formData.value);
    
    const tokens = response.data.resource.tokens;

    localStorage.setItem("tokens", JSON.stringify(tokens));

    stopLoading();
    
    catchToast(response.data.message, 3000);

    redirectToHomePage();
  } catch (error) {
    catchToastError(error.message, 3000);
    
    console.error('Failed to logged in: ', error);
  }
}
</script>