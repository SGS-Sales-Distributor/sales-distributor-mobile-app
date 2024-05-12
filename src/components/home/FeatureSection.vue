<template>
  <!-- Main feature -->
  <div class="grid grid-cols-4 gap-6 text-center">
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="absensi-button" href="/absensi">
        <ion-icon class="text-2xl" :icon="camera"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Absensi Visit</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="registrasi-toko-button">
        <ion-icon class="text-2xl" :icon="storefront"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Registrasi Toko</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="katalog-produk-button">
        <ion-icon class="text-2xl" :icon="cube"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Katalog Produk</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="achievement-button">
        <ion-icon class="text-2xl" :icon="trophy"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Ambil Hadiah</ion-label>
    </div>
  </div>
  <!-- End main feature -->
</template>

<script setup>
import { 
  camera,
  storefront,
  trophy,
  cube
} from 'ionicons/icons';
</script>

<style scoped>
#absensi-button {
  --background: #80d2ff;
  --background-hover: #9ce0be;
  --background-activated: #88f4be;
  --background-focused: #88f4be;
  --color: #dff9ff;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

#registrasi-toko-button {
  --background: #7ABA78;
  --background-hover: #9ce0be;
  --background-activated: #88f4be;
  --background-focused: #88f4be;
  --color: #dbffda;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

#katalog-produk-button {
  --background: #B99470;
  --background-hover: #9ce0be;
  --background-activated: #88f4be;
  --background-focused: #88f4be;
  --color: #ffe8d1;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

#achievement-button {
  --background: #ffff83;
  --background-hover: #ffff87;
  --background-activated: #ffff87;
  --background-focused: #ffff87;
  --color: #949400;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}
</style>