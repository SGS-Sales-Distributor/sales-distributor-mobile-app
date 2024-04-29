<template>
  <ion-page>
    <ion-content :fullscreen="true">
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
      <div class="flex min-h-full flex-col p-6 space-y-2">
        <ion-card-header>
          <div class="flex flex-col items-center justify-center space-y-2">
            <ion-card-subtitle class="text-xs">Lokasi Saat Ini</ion-card-subtitle>
            <li class="list-none" v-for="store in storeInfoDistri.slice(0, 1)" :key="store.store_id">
              <ion-card-title  class="text-blue-500 font-bold">{{ store.store_address }}</ion-card-title>
            </li>
          </div>
        </ion-card-header>
    
        <ion-card-content>
          <div class="flex flex-col items-center justify-center space-y-2">
            <ion-card-subtitle class="text-xs">Sedang Berada di Toko</ion-card-subtitle>
            <li class="list-none" v-for="store in storeInfoDistri.slice(1, 2)" :key="store.store_id">
              <ion-card-title  class="text-2xl font-bold text-center">{{ store.store_name }}</ion-card-title>
            </li>
          </div>
        </ion-card-content>
        <div class="flex w-full px-4 pb-2 space-x-4">
          <ion-button
          @click="takePicture" 
          id="check-in-button" 
          class="w-full py-2 rounded-lg text-50 font-bold text-nowrap">
            Check-In
          </ion-button>
          <!-- <ion-button 
          id="check-in-button" 
          class="w-full py-2 rounded-lg text-50 font-bold text-nowrap">
            Check-In
          </ion-button> -->
          <ion-button :disabled="true" id="check-out-button" class="w-full py-2 rounded-lg text-gray-50 font-bold text-nowrap">
            Check-Out
          </ion-button>
          <ion-button v-if="render" @click="saveImage">Save</ion-button>
        </div>
        <div class="flex flex-col space-y-2">
          <div class="flex space-x-2 items-center px-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clock-history text-gray-900 font-bold" viewBox="0 0 16 16">
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
            </svg>
            <p class="text-gray-900 font-bold text-md">Absensi History</p>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 whitespace-nowrap">
                          Pengguna
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
                        <th v-if="authUser.fullname === store.user" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ store.user }}
                        </th>
                        <td v-if="authUser.fullname === store.user" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {{ store.store_name }}
                        </td>
                        <td v-if="authUser.fullname === store.user" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {{ store.time_in }}
                        </td>
                        <td v-if="authUser.fullname === store.user" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {{ store.time_out }}
                        </td>
                        <td v-if="authUser.fullname === store.user" class="flex items-center px-6 py-4">
                            <span v-if="store.approval === 1" class="font-medium text-green-600">
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
} from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default {
  data() {
    const authUser = JSON.parse(localStorage.getItem('userData'));

    return {
      render: false,
      imageUrl: '',
      notificationsOutline,
      masterCallPlan: [],
      storeInfoDistri: [],
      authUser,
    } 
  },
  components: {},
  methods: {
    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri,
      }).then((image) => {
        this.render = true;
        this.imageUrl = image.webPath.toString();
      })

      const filename = Date.now() + '.jpeg';
      await this.savePicture(image, filename);

      console.log(`Captured photo path ${image.webPath}`);
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
      
      await Filesystem.writeFile({
        path: new Date().getTime() + ".jpeg",
        data: base64Data,
        directory: Directory.Documents,
      });
    },
    async getMasterCallPlanData() {
      await this.$axios.get(`${this.$root.API_URL}/api/v1/master-call-plans`)
      .then((response) => {
				this.masterCallPlan = response.data.resource.data;

        console.log(this.masterCallPlan);
				// console.log(response.message, this.masterCallPlan);
				// return this.students;
			})
			.catch((error) => {
				console.log('Failed to fetch master call plan data', error.message);
				throw new Error('Failed to fetch master call plan data', error.message);
			});
    },
    async getStoreData() {
      await this.$axios.get(`${this.$root.API_URL}/api/v1/stores/visits`)
      .then((response) => {
				this.storeInfoDistri = response.data.resource.data;

        console.log(this.storeInfoDistri);
			})
			.catch((error) => {
				console.log('Failed to fetch master call plan data', error.message);
				throw new Error('Failed to fetch master call plan data', error.message);
			});
    },
  },
  mounted() {
    // this.getMasterCallPlanData();
    this.getStoreData();
  }
}
</script>

<style scoped>
ion-content {
  --background: white;
}
</style>
