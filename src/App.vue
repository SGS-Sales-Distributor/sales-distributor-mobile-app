<template>
  <ion-app>
    <ion-router-outlet />    
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted,ref } from 'vue';
import { redirectToLoginPage } from './services/redirectHandlers';
import { catchToastError } from './services/toastHandlers';
import axios from 'axios';
import { API_URL } from './services/globalVariables';
import { constructOutline } from 'ionicons/icons';
const isOpen = ref(true);
const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

async function authUser() {
  try {

    if (!tokens) {
      console.error("Access Token and Refresh Token not found.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.get(`${API_URL.value}/api/v2/auth/me`, {
      headers: headers,
    });

    const authUserData = response.data.resource.data;

    localStorage.setItem("user", JSON.stringify(authUserData));

    console.log(JSON.parse(localStorage.getItem("user")));
  } catch (error) {
    catchToastError("Akses token telah hangus, mohon login kembali", 3000);

    if (error) {
      redirectToLoginPage();
      isOpen.value = false;
    }

    console.error(`Failed to fetch auth user: ${error.message}`);
  }
}


onMounted(() => {
  authUser();
});
</script>
