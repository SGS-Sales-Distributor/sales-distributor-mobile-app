<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Modal -->
      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Link URL Gambar</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p style="user-select: all;">{{ imageUrl }}</p>
        </ion-content>
      </ion-modal>
      <!-- End of Modal -->
      <!-- Header -->
      <header class="bg-blue-500 py-6 px-6 rounded-b-3xl">
        <div class="flex justify-between">
          <div>
            <a href="/home" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/public/1630597076257.jpeg" class="h-12 rounded-full" alt="Sinergi Global Service" />
              <span class="self-center text-md font-semibold whitespace-nowrap dark:text-white">PT. Sinergi Global Service</span>
            </a>
          </div>          
          <div>
            <button type="button" class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <icon-button>
                <ion-icon class="text-2xl" :icon="notificationsOutline"></ion-icon>
              </icon-button>
              <span class="sr-only">Notifications</span>
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-0 border-white rounded-full -top-2 -end-2">20</div>
            </button>
          </div>
        </div>
      </header>
      <!-- End of header -->

      <!-- Card -->
      <div class="flex min-h-full flex-col p-6 space-y-2">
        <!-- Card Header -->
        <ion-card-header>
          <div class="flex flex-col items-center justify-center space-y-2">
            <ion-card-subtitle class="text-md text-gray-900 font-bold">Lokasi Anda Terkini</ion-card-subtitle>
            <li class="list-none">
              <ion-card-title class="text-blue-500 font-bold"><span class="text-gray-900">Latitude: </span>{{ latitude }} | <span class="text-gray-900">Longitude: </span>{{ longitude }}</ion-card-title>
            </li>
          </div>
        </ion-card-header>
        <!-- End of Card Header -->
    
        <!-- Card Content -->
        <ion-card-content>
          <div class="flex flex-col items-center justify-center space-y-2">
            <ion-card-subtitle class="text-md text-gray-900 font-bold">Lokasi Berdasarkan Peta</ion-card-subtitle>
            <li class="list-none">
              <div ref="mapContainer" style="width: 100%; height: 300px;"></div>
            </li>
          </div>
        </ion-card-content>
        <!-- End of Card Content -->

        <div class="flex w-full px-4 pb-2 space-x-4">
          <ion-button
          :disabled="disabledCheckIn"
          @click="takeCheckInPicture" 
          id="check-in-button" 
          class="w-full py-2 rounded-lg text-50 font-bold text-nowrap">
            Check-In
          </ion-button>
          <ion-button 
          :disabled="disabledCheckOut"
          @click="takeCheckOutPicture" 
          id="check-out-button" 
          class="w-full py-2 rounded-lg text-gray-50 font-bold text-nowrap">
            Check-Out
          </ion-button>
        </div>
        <div class="flex w-full px-4 pb-2">
          <img v-if="imageUrl" :src="imageUrl" alt="Captured Photo" style="max-width: 100%; height: auto" />
        </div>
        <ion-button v-if="renderModButton" @click="saveImage">Save</ion-button>
        <ion-button v-if="renderModButton" @click="clearImage">Clear</ion-button>
        <div class="flex flex-col space-y-2">
          <div class="flex space-x-2 items-center px-5">
            <ion-icon class="text-xl" :icon="storefrontOutline"></ion-icon>
            <p class="text-gray-900 font-bold text-md">Daftar Toko</p>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 whitespace-nowrap">
                          ID
                        </th>
                        <th scope="col" class="px-6 py-3 whitespace-nowrap">
                            Nama Toko
                        </th>
                        <th scope="col" class="px-6 py-3 whitespace-nowrap">
                          Check-In Date
                        </th>
                        <th scope="col" class="px-6 py-3 whitespace-nowrap">
                          Check-Out Date
                        </th>
                        <th scope="col" class="px-6 py-3 whitespace-nowrap">
                          Approval
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="store in storeInfoDistri" :key="store.store_id" class="bg-white border-b hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ store.store_id }}
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <router-link :to="{ name: 'storeDetail', params: { id: store.store_id } }">
                            {{ store.store_name }}
                          </router-link>
                        </td>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {{ store.check_in_time }}
                        </td>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {{ store.check_out_time }}
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <span v-if="store.Approval === 1" class="font-medium text-green-600">
                              Disetujui
                            </span>
                            <span v-else class="font-medium text-rose-600">
                              Belum Disetujui
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
// import ExploreContainer from '@/components/ExploreContainer.vue';
import { 
  notificationsOutline,
  storefrontOutline,
} from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ref, shallowRef, markRaw } from 'vue';
import { printCurrentPosition } from '@/services/getCurrentLocation';
import { Map, config } from '@maptiler/sdk';

export default {
  data() {
    const isOpen = ref(false);
    const setOpen = (open) => {
      isOpen.value = open;
    };
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);

    return {
      isOpen,
      setOpen,
      renderModButton: false,
      disabledCheckIn: false,
      disabledCheckOut: true,
      imageUrl: null,
      notificationsOutline,
      storefrontOutline,
      storeInfoDistri: [],
      latitude: null,
      longitude: null,
      mapContainer,
      map,
    } 
  },
  methods: {
    async takeCheckInPicture() {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          source: CameraSource.Camera,
          resultType: CameraResultType.Uri,
        });

        if (image && image.webPath) {
          this.renderModButton = true;
          this.imageUrl = image.webPath.toString();
          console.log(`Captured photo path: ${this.imageUrl}`);

          setTimeout(() => {
            this.setOpen(true);
          }, 1000);

          // disabled check in button;
          this.disabledCheckIn = true;
          this.disabledCheckOut = false;
        } else {
          console.error('Failed to capture photo or image path is missing');
          throw new Error('Failed to capture photo or image path is missing');
        }
      } catch (error) {
        console.error('Error capturing photo:', error);
        throw new Error('Error capturing photo:', error);
      }
    },
    async takeCheckOutPicture() {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          source: CameraSource.Camera,
          resultType: CameraResultType.Uri,
        });

        if (image && image.webPath) {
          this.renderModButton = true;
          this.imageUrl = image.webPath.toString();
          console.log(`Captured photo path: ${this.imageUrl}`);

          setTimeout(() => {
            this.setOpen(true);
          }, 1000);

          // disabled check out button;
          this.disabledCheckIn = false;
          this.disabledCheckOut = true;
        } else {
          console.error('Failed to capture photo or image path is missing');
        }
      } catch (error) {
          console.error('Error capturing photo:', error);
      }      
    },  
    convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    },
    async saveImage() {
      const response = await fetch(this.imageUrl);
      const blob = await response.blob();
      const base64Data = await this.convertBlobToBase64(blob);
      console.log("url", base64Data);
      this.imageUrl = base64Data;

      // disabled check out button
      this.disabledCheckIn = false;
      this.disabledCheckOut = true;
      this.renderModButton = false;
      await Filesystem.writeFile({
        path: new Date().getTime() + ".jpeg",
        data: base64Data,
        directory: Directory.Documents,
      });
    },
    async clearImage() {
      this.imageUrl = null;
      this.renderModButton = false;
      this.disabledCheckIn = false;
      this.disabledCheckOut = true;
      console.log("Successfully clear image.", this.imageUrl);
    },
    redirectToLoginPage() {
      setTimeout(() => {
          this.$router.push({
            path: '/login'
          })
      }, 100);
    },
    async getCurrentPositon() {
      try {
        const positions = await printCurrentPosition();
        const [latitude, longitude] = positions;

        this.latitude = latitude;
        this.longitude = longitude;

        console.log("Your latitude: ", latitude);
        console.log("Your longitude: ", longitude); 
      } catch (error) {
        console.error('Error getting current position:', error);
        throw new Error('Error getting current position:', error);
      }
    },
    async renderMap() {
      const myApiKey = "92vPHD425v86EvVguUsq"; 

      config.apiKey = "92vPHD425v86EvVguUsq";

      const initialState = { lng: this.longitude, lat: this.latitude, zoom: 15 };

      this.map.value = markRaw(new Map({
        container: this.$refs.mapContainer,
        style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${myApiKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      }));
    },
    async getStoreData() {
      //   const accessToken = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')).accessToken : null;

      //   if (!accessToken) {
      //     console.log("No access token available.");
      //     this.redirectToLoginPage();
      //     return null;
      //   }

      //   const header = {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${accessToken}`,
      //   }
      await this.$axios.get(`${this.$root.API_URL}/api/v1/stores`)
			.then((response) => {
				this.storeInfoDistri = response.data.resource.data;

				console.log("Successfully fetch store data: ", this.storeInfoDistri);
				return this.storeInfoDistri;
			})
			.catch((error) => {
				console.log('Failed to fetch store data', error.message);
				throw new Error('Failed to fetch store data', error.message);
			});
    },
  },
  mounted() {
    this.getStoreData();
    this.getCurrentPositon();
    this.renderMap();
    printCurrentPosition();
  }
}
</script>

<style scoped>
ion-content {
  --background: white;
}

ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}
</style>
