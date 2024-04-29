<template>
    <ion-page>
        <ion-content>
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-lg sm:max-w-sm">
                    <ion-img 
                    class="mx-auto h-32 w-auto"
                    src="/public/1630597076257.jpeg"
                    alt="PT. Sinergi Global Service"
                    ></ion-img>
                </div>
                <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <vee-form 
                    novalidate 
                    class="space-y-6" 
                    method="post"
                    @submit="login"
                    :validation-schema="formValidate">
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
                    </vee-form>
                    <div class="mt-10 flex items-center justify-between">
                        <div class="text-sm">
                            <a href="/registrasi" class="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600">Belum Punya Akun?</a>
                        </div>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600">Ubah Password</a>
                        </div>
                    </div>
                    <p class="mt-10 text-center text-xs font-normal text-gray-900">© PT. Sinergi Global Service 2024. All rights reserved.</p>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import * as Yup from 'yup';

export default {
    data() {
        const formValidate = Yup.object().shape({
            email: Yup.string()
                .required('Email diperlukan, tidak dapat kosong!')
                .max(255, 'Email tidak boleh lebih dari 255 karakter')
                .email('Email tidak valid, gunakan format email yang resmi!'),
            password: Yup.string()
                .required('Password diperlukan, tidak dapat kosong!')
                .max(100, 'Password tidak boleh lebih dari 100 karakter')
                .min(8, 'Password harus minimal memiliki 8 karakter')
                // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        });

        return {
            formValidate,
            formData: {
                email: null,
                password: null,
            },
        }
    },
    methods: {
        redirectToHomePage() {
            setTimeout(() => {
                this.$router.push({
                    path: '/home'
                })
            }, 100);
        },
        async login() {
            try {
                const response = await this.$axios.post(`${this.$root.API_URL}/api/v1/auth/login`, this.formData);
                
                const tokens = response.data.resource.tokens;
                localStorage.setItem('tokens', JSON.stringify(tokens));
                console.log("Successfully logged in: ", tokens);

                this.redirectToHomePage();

                return tokens;
            } catch (error) {
                console.log('Failed to logged in', error.message);
                throw new Error('Failed to logged in', error.message);
            }
        }
    }
}
</script>

<style>

</style>