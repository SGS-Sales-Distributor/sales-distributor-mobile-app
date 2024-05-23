<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';
import { onBeforeMount, onMounted } from 'vue';
import { App } from '@capacitor/app';

const ionRouter = useIonRouter();

const backBtnHandler = () => {
  App.addListener('backButton', () => {
    if (!ionRouter.canGoBack()) {
      App.exitApp();
    } else {
      ionRouter.back();
    }
  });
};

onMounted(() => {
  backBtnHandler();
});

onBeforeMount(() => {
  App.removeAllListeners();
});

</script>
