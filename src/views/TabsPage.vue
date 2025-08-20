<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="absensi" href="/absensi">
          <ion-icon class="text-2xl active" aria-hidden="true" :icon="camera" />
          <ion-label>Visit</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="profile" href="/profile">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="person" />
          <ion-label class="text-md">Profile</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="historyVisit" href="/historyVisit">
          <ion-icon class="text-2xl active" aria-hidden="true" :icon="newspaperSharp" />
          <ion-label class="text-md">Rekap Visit</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="logout" @click="AlertLogout">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="logOut" />
          <ion-label class="text-md">Logout</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import {
  camera,
  home,
  logOut,
  person,
  newspaper,
  newspaperSharp,
} from 'ionicons/icons';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { redirectToLoginPage } from '@/services/redirectHandlers';
import { alertController } from '@ionic/vue';
import { RedirectVisitPage } from '@/services/redirectHandlers';

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

async function AlertLogout() {
  const alert = await alertController.create({
    header: "Konfirmasi Logout",
    message: "Yakin Logout ?",
    buttons: [
      {
        text: "Ya",
        cssClass: "alert-button-confirm",
        handler: async () => {
          logout();
        },
      },
      {
        text: "Tidak",
        cssClass: "alert-button-cancel",
        handler: () => {
          console.log("Pembatalan Logout");
        },
      },
    ],
  });

  return alert.present();
}

async function logout() {
  try {
    localStorage.clear();

    catchToast("Logout berhasil, sampai bertemu kembali!", 3000);

    redirectToLoginPage();
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error(`Failed to logout: ${error.message}`);
  }
}
</script>

<style scoped>
ion-tab-bar {
  --background: rgb(255, 255, 255);
}

ion-tab-button {
  --color: rgb(188, 192, 199);
  --background-focused: rgb(59 130 246);
  --color-selected: rgb(59 130 246);
  --padding-end: 0px;
  --padding-start: 0px;
  --padding-bottom: 0px;
  --margin-left: 0px;
  --margin-right: 0px;
}
</style>
