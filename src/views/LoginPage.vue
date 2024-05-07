<template>
  <ion-page>
    <ion-content>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-lg sm:max-w-sm">
          <ion-img class="mx-auto h-32 w-auto" src="/public/1630597076257.jpeg" alt="PT. Sinergi Global Service" />
        </div>
        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormLogin />
          <div class="mt-5 flex items-center justify-end">
            <!-- <div class="text-sm">
                <a href="/registrasi" class="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600">Belum Punya Akun?</a>
            </div> -->
            <div class="text-sm">
              <a href="#" class="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600">Ubah Password</a>
            </div>
          </div>
          <p class="mt-10 text-center align-text-bottom text-xs font-normal text-gray-900">© PT. Sinergi Global Service 2024. All rights reserved.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import FormLogin from '@/components/FormLogin.vue';
</script>

<style scoped>

</style>