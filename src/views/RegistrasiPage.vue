<template>
    <ion-page>
        <ion-content>
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-lg sm:max-w-sm">
                    <h2 class="text-2xl font-semibold text-center mb-4">REGISTRASI AKUN</h2>
                </div>
                <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <vee-form novalidate class="space-y-4" method="post" @submit="register"
                        :validation-schema="formValidate">
                        <!-- NIK Input -->
                        <div>
                            <label for="nik" class="block text-sm font-medium leading-6 text-gray-900">Nomor Induk
                                Kependudukan</label>
                            <div class="mt-2">
                                <vee-field v-model="formData.nik" id="nik" name="nik" type="string" placeholder="NIK"
                                    aria-label="nik" aria-describedby="nik" class="
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
                                sm:leading-6" />
                                <vee-error-message name="email" class="mt-4 text-rose-500" />
                            </div>
                        </div>

                        <!-- Fullname Input -->
                        <div>
                            <label for="fullname" class="block text-sm font-medium leading-6 text-gray-900">Nama
                                Lengkap</label>
                            <div class="mt-2">
                                <vee-field v-model="formData.fullname" id="fullname" name="fullname" type="string"
                                    placeholder="Nama Lengkap" aria-label="fullname" aria-describedby="fullname" class="
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
                                sm:leading-6" />
                                <vee-error-message name="fullname" class="mt-4 text-rose-500" />
                            </div>
                        </div>

                        <!-- Phone Input -->
                        <div>
                            <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Nomor
                                Handphone</label>
                            <div class="mt-2">
                                <vee-field v-model="formData.phone" id="phone" name="phone" type="string"
                                    placeholder="Nomor Handphone" aria-label="phone" aria-describedby="phone" class="
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
                                sm:leading-6" />
                                <vee-error-message name="phone" class="mt-4 text-rose-500" />
                            </div>
                        </div>

                        <!-- Email Input -->
                        <div>
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                address</label>
                            <div class="mt-2">
                                <vee-field v-model="formData.email" id="email" name="email" type="email"
                                    autocomplete="email" placeholder="Alamat email" aria-label="email"
                                    aria-describedby="email" class="
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
                                sm:leading-6" />
                                <vee-error-message name="email" class="mt-4 text-rose-500" />
                            </div>
                        </div>

                        <!-- Username Input -->
                        <div>
                            <label for="username"
                                class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div class="mt-2">
                                <vee-field v-model="formData.email" id="username" name="username" type="username"
                                    autocomplete="username" placeholder="Username" aria-label="username"
                                    aria-describedby="username" class="
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
                                sm:leading-6" />
                                <vee-error-message name="username" class="mt-4 text-rose-500" />
                            </div>
                        </div>

                        <!-- Password Input -->
                        <div>
                            <label for="password"
                                class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div class="mt-2">
                                <vee-field v-model="formData.password" id="password" name="password" type="password"
                                    placeholder="******" autocomplete="current-password" aria-label="password"
                                    aria-describedby="password" class="
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
                                sm:leading-6" />
                                <vee-error-message name="password" class="mt-4 text-rose-500" />
                            </div>
                        </div>

                        <!-- Password Confirmation Input -->
                        <div>
                            <label for="password_confirmation"
                                class="block text-sm font-medium leading-6 text-gray-900">Konfirmasi Password</label>
                            <div class="mt-2">
                                <vee-field v-model="formData.password_confirmation" id="password_confirmation"
                                    name="password_confirmation" type="password" placeholder="******"
                                    aria-label="password" aria-describedby="password" class="
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
                                sm:leading-6" />
                                <vee-error-message name="password" class="mt-4 text-rose-500" />
                            </div>
                        </div>

                        <!-- Submit button -->
                        <div class="flex flex-col space-y-6">
                            <button type="submit"
                                class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                                <span>Registrasi Akun</span>
                            </button>
                            <p class="text-center font-bold">Atau</p>
                            <button
                                class="flex w-full justify-center bg-gray-800 border-2 rounded-md shadow-md px-6 py-2 text-sm font-bold text-gray-50 hover:bg-gray-900 hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                                <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px"
                                    viewBox="-0.5 0 48 48" version="1.1">
                                    <title>Google-color</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs> </defs>
                                    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                            <g id="Google" transform="translate(401.000000, 860.000000)">
                                                <path
                                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                    id="Fill-1" fill="#FBBC05"> </path>
                                                <path
                                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                    id="Fill-2" fill="#EB4335"> </path>
                                                <path
                                                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                    id="Fill-3" fill="#34A853"> </path>
                                                <path
                                                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                    id="Fill-4" fill="#4285F4"> </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </vee-form>
                    <p class="mt-10 text-center text-xs font-normal text-gray-900">© PT. Sinergi Global Service 2024.
                        All rights reserved.</p>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>

import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { ref } from 'vue';
import { redirectToLoginPage } from '@/services/redirectHandlers';
import { catchToast } from '@/services/toastHandlers';

// const formData = ref({
//     nik: null,
//     fullname: null,
//     phone: null,
//     email: null,
//     username: null,
//     password: null,
//     password_confirmation: null,
// });

export default {
    data() {
        const formValidate = Yup.object().shape({
            nik: Yup.string()
                .required('NIK diperlukan, tidak dapat kosong!')
                .max(20, 'NIK tidak boleh lebih dari 20 karakter'),
            fullname: Yup.string()
                .required('Nama Lengkap diperlukan, tidak dapat kosong!')
                .max(200, 'Nama Lengkap tidak boleh lebih dari 200 karakter'),
            phone: Yup.string()
                .required('Nomor Telepon diperlukan, tidak dapat kosong!')
                .max(20, 'Nomor Telepon tidak boleh lebih dari 20 karakter'),
            email: Yup.string()
                .required('Email diperlukan, tidak dapat kosong!')
                .max(255, 'Email tidak boleh lebih dari 255 karakter')
                .email('Email tidak valid, gunakan format email yang resmi!'),
            username: Yup.string()
                .required('Username diperlukan, tidak dapat kosong!')
                .max(50, 'Username tidak boleh lebih dari 50 karaketer'),
            password: Yup.string()
                .required('Password diperlukan, tidak dapat kosong!')
                .max(100, 'Password tidak boleh lebih dari 100 karakter')
                .min(8, 'Password harus minimal memiliki 8 karakter'),
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
            password_confirmation: Yup.string()
                .required('Password Confirmation is required')
                .min(8, 'Student Unique ID Number should have 8 characters in minimum')
                .oneOf([Yup.ref('password')], 'Password is not same.'),
        });
        return {
            formValidate,
            formData: {
                nik: null,
                fullname: null,
                phone: null,
                email: null,
                username: null,
                password: null,
                password_confirmation: null,
                name : 'Chersma Beb',
            },
        }
    },
    methods: {
        // redirectToHome() {
        //     setTimeout(() => {
        //         this.$router.push({
        //             path: '/tabs/home',
        //         })
        //     }, 500);
        // },
        async register() {
            try {
                await axios.post(`${API_URL.value}/api/v2/auth/register`, this.formData)
                .then((response) => {
                    // this.redirectToHome();
                    
                    console.log('Successfully register new account!', response);
                    catchToast(response,3000);
                    redirectToLoginPage();
                })
            } catch (error) {
                console.log('Failed to register!', error.message);
                throw new Error('Failed to register!', error.message);
            }
          
        }
    }
}
</script>

<style></style>