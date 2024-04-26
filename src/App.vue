<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';

export default {
  data() {
    return {
      API_URL: `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`,
    };
  },
  components: {
    IonApp,
    IonRouterOutlet,
  }
}
</script>
