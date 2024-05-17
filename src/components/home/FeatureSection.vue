<template>
  <!-- Main feature -->
  <div class="grid grid-cols-4 gap-6 text-center">
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="absensi-button" shape="round" href="/absensi">
        <ion-icon class="text-2xl" slot="icon-only"  :icon="camera"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Absensi Visit</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="registrasi-toko-button" shape="round" href="/store/register">
        <ion-icon class="text-2xl" slot="icon-only"  :icon="storefront"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Registrasi Toko</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="katalog-produk-button" shape="round">
        <ion-icon class="text-2xl" slot="icon-only" :icon="cube"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Katalog Produk</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="purchase-order-button" shape="round" href="/order">
        <ion-icon class="text-2xl" slot="icon-only"  :icon="card"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Purchase Order</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="achievement-button" shape="round">
        <ion-icon class="text-2xl" slot="icon-only"  :icon="trophy"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Reward</ion-label>
    </div>
  </div>
  <!-- End main feature -->
</template>

<script setup>
import { 
  camera,
  storefront,
  trophy,
  cube,
  card,
} from 'ionicons/icons';
import { IonButton } from '@ionic/vue';
</script>

<style scoped>
#absensi-button {
  --background: #A0DEFF;
  --background-hover: #9ce0be;
  --background-activated: #A0DEFF;
  --background-focused: #A0DEFF;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

#registrasi-toko-button {
  --background: #B0EBB4;
  --background-hover: #9ce0be;
  --background-activated: #B0EBB4;
  --background-focused: #B0EBB4;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

#katalog-produk-button {
  --background: #B99470;
  --background-hover: #B99470;
  --background-activated: #B99470;
  --background-focused: #B99470;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

#purchase-order-button {
  --background: #B5C0D0;
  --background-hover: #B5C0D0;
  --background-activated: #B5C0D0;
  --background-focused: #B5C0D0;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

#achievement-button {
  --background: #FEFF86;
  --background-hover: #FEFF86;
  --background-activated: #FEFF86;
  --background-focused: #FEFF86;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}
</style>