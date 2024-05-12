<template>
    <ion-card-header>
        <div v-if="checkLocationAccess" class="flex flex-col items-center justify-center pb-3"
          id="geo-address">
          <ion-card-subtitle class="text-md text-gray-900 font-bold pb-2 text-center">Lokasi Anda Terkini</ion-card-subtitle>
          <li class="list-none">
            <ion-card-subtitle class="text-blue-500 font-bold text-center">
              <span class="text-gray-900 font-semibold text-md">{{ currentAddress }}</span>
            </ion-card-subtitle>
          </li>
        </div>
    </ion-card-header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { catchToastError } from '@/services/toastHandlers';
import { printCurrentPosition, checkLocationAccess } from '@/services/locationHandlers';

const currentAddress = ref('');

async function renderPositionToAddress() {
  const currentPositions = await printCurrentPosition();
  const [currentLatitude, currentLongitude] = currentPositions;

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${currentLatitude}&lon=${currentLongitude}`);
    
    const data = await response.json();

    currentAddress.value = data.display_name;
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error('Error when getting address: ', error);
  }
}

onMounted(() => {
  renderPositionToAddress();
})
</script>

<style scoped>

</style>