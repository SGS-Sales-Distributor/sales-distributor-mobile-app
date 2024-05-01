<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="absensi" href="/absensi">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="cameraOutline" />
          <ion-label>Absensi</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="personOutline" />
          <ion-label class="text-md">Profile</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="logout" @click="logout">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="logOutOutline" />
          <ion-label class="text-md">Logout</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import router from '@/router';
import { 
  cameraOutline, 
  homeOutline, 
  logOutOutline,
  personOutline,
} from 'ionicons/icons';
import { toastController } from '@ionic/vue';

function redirectToLoginPage() {
  setTimeout(() => {
    router.push({
      path: '/login'
    })
  }, 1000);
}

async function logout() {
  try {
    localStorage.clear();
    
    const toast = await toastController.create({
      message: "Terima kasih, telah menggunakan aplikasi kami. Sampai berjumpa kembali...",
      duration: 3000,
      position: "top",
      color: 'primary',
    });

    await toast.present();
    redirectToLoginPage();
    
    console.log("Successfully logout");
  } catch (error) {
    console.error(`Failed to logout: ${error.message}`);
    throw new Error(`Failed to logout: ${error.message}`);
  }
}
</script>

<style scoped>

</style>
