<template>
    <ion-card-content>
        <!-- Map -->
        <div v-if="checkLocationAccess" class="flex flex-col items-center justify-center pb-3" id="geo-map">
            <ion-card-subtitle v-if="statusGPS" class="text-md text-gray-900 font-bold pb-2 text-center">Lokasi Berdasarkan Peta</ion-card-subtitle>
            <li class="list-none map-wrap flex">
                <div class="map" ref="mapContainer"></div>
            </li>
        </div>
        <!-- End of Map -->
    </ion-card-content>
</template>

<script setup>
import { statusGPS, mapContainer, map, latitude, longitude } from '@/services/globalVariables';
import { checkLocationAccess, printCurrentPosition } from '@/services/locationHandlers';
import { catchToastError } from '@/services/toastHandlers';
import { Map, GeolocateControl, Marker, NavigationControl } from 'maplibre-gl';
import { onMounted } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

async function renderMap() {
  const currentPositions = await printCurrentPosition();
  const [currentLatitude, currentLongitude] = currentPositions;
  
  const myApiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  latitude.value = currentLatitude;
  longitude.value = currentLongitude;
  
  try {
    map.value = new Map({
      container: mapContainer.value,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${myApiKey}`,
      center: [currentLongitude, currentLatitude],
      zoom: 16,
      hash: false
    })
      .addControl(
        new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true
        })
      ).addControl(
        new NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: true,
        })
      )

    new Marker({
      color: "#FF0000"
    })
      .setLngLat([
        currentLongitude,
        currentLatitude
      ])
      .addTo(map.value);
  } catch (error) {
    catchToastError(error.message, 3000);

    console.error('Failed to render map: ', error);
  }
}

onMounted(() => {
    renderMap();
})
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 300px;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: #fff 0px solid;
}
</style>