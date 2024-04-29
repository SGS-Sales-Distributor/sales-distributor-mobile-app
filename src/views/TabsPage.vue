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

<script>
import { 
  cameraOutline, 
  homeOutline, 
  settingsOutline,
  logOutOutline,
  menuOutline,
  personOutline,
} from 'ionicons/icons';

export default {
  data() {
    return {
      cameraOutline, 
      homeOutline, 
      settingsOutline,
      logOutOutline,
      menuOutline,
      personOutline,
    }
  },
  methods: {
    redirectToLoginPage() {
      setTimeout(() => {
        this.$router.push({
          path: '/login'
        })
      }, 100);
    },
    async logout() {
      try {
        localStorage.removeItem('tokens');
        this.redirectToLoginPage();
        
        console.log("Successfully logout");
      } catch (error) {
        console.log('Failed to logout', error.message);
        throw new Error('Failed to logout', error.message);
      }
    },
  }
}
</script>

<style scoped>

</style>
