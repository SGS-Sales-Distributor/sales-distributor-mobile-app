<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="absensi" href="/tabs/absensi">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="cameraOutline" />
          <ion-label>Absensi</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon class="text-2xl" aria-hidden="true" :icon="personOutline" />
          <ion-label class="text-md">Profile</ion-label>
        </ion-tab-button>

        <!-- <vee-form 
        action="#" 
        method="post"
        @click="logout">
          <ion-tab-button tab="logout">
            <ion-icon class="text-3xl" aria-hidden="true" :icon="logOutOutline" />
            <ion-label>Keluar</ion-label>
          </ion-tab-button>
        </vee-form> -->

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
    redirectToLogin() {
      setTimeout(() => {
        this.$router.push({
          path: '/login'
        })
      }, 500);
    },
    async logout() {
      await this.$axios.post(`${import.meta.env.API_URL}/api/v1/auth/logout`)
      .then((response) => {
          this.redirectToLogin();

          console.log('Successfully logout', response);
      })
      .catch((error) => {
          console.log('Failed to logout', error.message);
          throw new Error('Failed to logout', error.message);
      })
    }
  }
}
</script>

<style scoped>

</style>
