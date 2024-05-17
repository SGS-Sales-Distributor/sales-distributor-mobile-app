<template>
  <ion-page>
    <ion-content>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[url('/public/14547779_rm222-mind-14.jpg')] bg-cover">
        <div class="p-2.5 bg-white rounded-2xl">
          <div class="sm:mx-auto sm:w-lg sm:max-w-sm">
            <img class="mx-auto h-40 w-auto" src="/public/1630597076257.jpeg" alt="PT. Sinergi Global Service" />
          </div>
          <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm p-2.5">
            <FormLogin />
            <p class="mt-10 text-center align-text-bottom text-xs font-normal text-gray-900">© PT. Sinergi Global
              Service 2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import FormLogin from '@/components/login/FormLogin.vue';
</script>

<style scoped></style>