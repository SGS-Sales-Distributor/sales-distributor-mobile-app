<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card>
        <div class="flex flex-col items-center justify-center space-y-2">
          <ion-card-header>
            <div class="flex flex-col items-center justify-center space-y-2">
              <ion-card-subtitle class="text-xs">Lokasi Saat Ini</ion-card-subtitle>
              <ion-card-title class="text-blue-500 font-bold">Jl. Pulo Kambing 2</ion-card-title>
            </div>
          </ion-card-header>
      
          <ion-card-content>
            <div class="flex flex-col items-center justify-center space-y-2">
              <ion-card-subtitle class="text-xs">Nearest Store</ion-card-subtitle>
              <ion-card-title class="text-2xl font-bold">PT. Sinergi Global Service</ion-card-title>
            </div>
          </ion-card-content>
          <div class="flex justify-between w-full px-4 pb-2">
            <ion-button id="check-in-button" class="w-full py-2 rounded-lg text-50 font-bold">
              Check-In
            </ion-button>
            <ion-button :disabled="true" id="check-out-button" class="w-full py-2 rounded-lg text-gray-50 font-bold">
              Check-Out
            </ion-button>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="flex space-x-2 items-center px-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
              </svg>
              <p class="font-bold text-md">Absensi History</p>
            </div>
            <table class="min-w-full divide-y divide-gray-200">
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="store in storeInfoDistri" :key="store.store_id">
                  <td class="px-6 py-4 whitespace-nowrap">{{ store.store_name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">Jane</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
// import ExploreContainer from '@/components/ExploreContainer.vue';

export default {
  data() {
    return {
      masterCallPlan: [],
      storeInfoDistri: [],
    } 
  },
  components: {},
  methods: {
    async getMasterCallPlanData() {
      await this.$axios.get(`${this.$root.API_URL}/api/v1/master-call-plan`)
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
      await this.$axios.get(`${this.$root.API_URL}/api/v1/store-info-distri`)
      .then((response) => {
				this.storeInfoDistri = response.data.resource.data;

        console.log(this.storeInfoDistri);
				// console.log(response.message, this.masterCallPlan);
				// return this.students;
			})
			.catch((error) => {
				console.log('Failed to fetch master call plan data', error.message);
				throw new Error('Failed to fetch master call plan data', error.message);
			});
    }
  },
  mounted() {
    this.getMasterCallPlanData();
    this.getStoreData();
  }
}
</script>

<style scoped>
ion-content {
  --background: rgb(59, 130, 246);
}
</style>
