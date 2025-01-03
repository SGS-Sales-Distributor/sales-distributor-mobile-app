<template>
  <!-- Main feature -->
  <div class="grid grid-cols-4 gap-6 text-center">
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="absensi-button" shape="default" href="/absensi">
        <ion-icon class="text-4xl" slot="icon-only"  :icon="camera"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Absensi Visit</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="history-visit-button" shape="default" @click="RedirectVisitPage(user.user_id)">
          <ion-icon class="text-4xl" slot="icon-only" :icon="albums"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">History Visit</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <!-- <ion-button id="registrasi-toko-button" shape="default" href="/store/register" > -->
      <ion-button id="registrasi-toko-button" shape="default" @click="registrerClik">
        <ion-icon class="text-4xl" slot="icon-only"  :icon="storefront"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Registrasi Toko</ion-label>
    </div>
    <!-- <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="katalog-produk-button" shape="round">
        <ion-icon class="text-2xl" slot="icon-only" :icon="cube"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Katalog Produk</ion-label>
    </div> -->
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="purchase-order-button" shape="default" href="/order">
        <ion-icon class="text-4xl" slot="icon-only"  :icon="card"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Purchase Order</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2" style="">
      <ion-button id="input-plan-button" shape="default" href="/plans">
        <ion-icon class="text-4xl" slot="icon-only"  :icon ="receipt"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Input Plan Visit</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="daftar-toko-button" shape="default" href="/daftartoko">
        <ion-icon class="text-4xl" slot="icon-only"  :icon ="businessOutline"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Daftar Toko</ion-label>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="daftar-po-button" shape="default"  @click="DaftarPo()">
        <ion-icon class="text-4xl" slot="icon-only"  :icon ="bagCheckOutline"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Daftar Po</ion-label>
    </div>

    <!-- <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="daftar-plan-button" shape="default" href="/daftarplanvisit">
        <ion-icon class="text-4xl" slot="icon-only"  :icon ="pencil"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Daftar Plan Visit</ion-label>
    </div> -->
    <!-- <div class="flex flex-col items-center justify-center space-y-2">
      <ion-button id="achievement-button" shape="round">
        <ion-icon class="text-2xl" slot="icon-only"  :icon="trophy"></ion-icon>
      </ion-button>
      <ion-label class="text-sm font-semibold">Reward</ion-label>
    </div> -->
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
  albums,
  bookmark,
  receipt,
  pencil,
  businessOutline,
  bagCheckOutline,
} from 'ionicons/icons';
import { IonButton } from '@ionic/vue';
import { redirectToOwnerFormPage, redirectToRegisterStorePage ,RedirectVisitPage} from '@/services/redirectHandlers';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { alertController } from '@ionic/vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { data } from '@maptiler/sdk';

const store =localStorage.getItem("store_id") ? JSON.parse(localStorage.getItem("store_id")) : null;
const user =localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

async function registrerClik(){
  if(store == null || store == ""){
    redirectToRegisterStorePage();
  }else{
    redirectToOwnerFormPage();
  }

}


</script>

<style scoped>
#history-visit-button {
  --background: #f49883;
  --background-hover: #9ce0be;
  --background-activated: #A0DEFF;
  --background-focused: #A0DEFF;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}

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

#input-plan-button {
  --background: #FEFF86;
  --background-hover: #FEFF86;
  --background-activated: #FEFF86;
  --background-focused: #FEFF86;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}
#daftar-plan-button {
  --background: #f5bef4;
  --background-hover: #f5bef4;
  --background-activated: #f5bef4;
  --background-focused: #f5bef4;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}
#daftar-toko-button {
  --background: #176af0;
  --background-hover: #176af0;
  --background-activated: #176af0;
  --background-focused: #176af0;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}
#daftar-po-button {
  --background: #f75356;
  --background-hover: #f75356;
  --background-activated: #f75356;
  --background-focused: #f75356;
  --color: #202020;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  --padding-top: 10px;
  --padding-bottom: 10px;
}
</style>