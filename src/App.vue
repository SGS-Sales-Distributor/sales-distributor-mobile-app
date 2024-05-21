<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { redirectToLoginPage } from './services/redirectHandlers';
import { catchToastError } from './services/toastHandlers';
import axios from 'axios';
import { API_URL } from './services/globalVariables';

async function authUser() {
  try {
    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    if (!tokens) {
      console.error("Access Token and Refresh Token not found.");
      
      redirectToLoginPage();
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
    }

    console.error(`Failed to fetch auth user: ${error.message}`);
  }
}

onMounted(() => {
  authUser();
});
</script>
