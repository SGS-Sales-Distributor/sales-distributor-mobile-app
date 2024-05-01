<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script>
import { Map, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw, ref } from 'vue';
import { printCurrentPosition } from '@/services/getCurrentLocation';
import '@maptiler/sdk/dist/maptiler-sdk.css';

export default {
  name: 'MapComponent',
  setup() {
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);
    const latitude = ref(0);
    const longitude = ref(0);

    onMounted(async () => {
      const currentPositions = await printCurrentPosition();

      const [currentLatitude, currentLongitude] = currentPositions;
      const myApiKey = import.meta.env.VITE_MAPTILER_API_KEY;

      config.apiKey = myApiKey;

      latitude.value = currentLatitude;
      longitude.value = currentLongitude;

      map.value = markRaw(
        new Map({
          container: mapContainer.value,
          style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${myApiKey}`,
          center: [longitude, latitude],
          zoom: 16,
        })
      );

      // map.value.addControl(new NavigationControl(), "top-right");

      new Marker({ color: "#FF0000" })
        .setLngLat([longitude, latitude])
        .addTo(map.value);
    }),
    onUnmounted(() => {
      map.value?.remove();
    });

    return {
      map,
      mapContainer,
    };
  },
};
</script>

<style scoped>
/* @import "../../../node_modules/maplibre-gl/dist/maplibre-gl.css"; */

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(
    100vh - 77px
  ); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 50%;
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>
