<template>
    <ion-page>
        <ion-content>
            <HeaderSection />
            <div>
                <ion-card-header class="text-md text-gray-900 font-bold pb-2 text-center">
                    <h1>Cari Daftar Visit</h1>
                </ion-card-header>
            </div>

            <!-- Filter Tanggal -->
            <div>
                <ion-card>
                    <ion-card-content>
                        <label for="dari">Dari Tanggal :</label>
                        <ion-input type="date" v-model="dariTanggal" name="dariTanggal" id="dariTanggal"></ion-input>
                        <label for="sampai">Sampai Tanggal :</label>
                        <ion-input type="date" v-model="sampaiTanggal" name="sampaiTanggal" id="sampaiTanggal"></ion-input>
                        <button type="button" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" @click="getDataVisit">
                            Lihat
                        </button>
                    </ion-card-content>
                </ion-card>
            </div>

            <!-- List of Visits with Edit and Delete Buttons -->
            <div v-for="(visit, index) in storeInfoDistri" :key="index" class="relative overflow-x-auto">
                <ion-card class="py-2 odd:bg-blue-500 even:bg-sky-400">
                    <ion-card-header class="bg-gray-50">
                        <div class="flex flex-col w-full h-full space-y-2">
                            <div class="flex flex-row w-full justify-between space-x-2">
                                <label class="flex-initial w-56 font-semibold">Nama Toko</label>
                                <p class="flex-initial w-44 text-right">{{ visit.nama_toko }}</p>
                            </div>
                            <div class="flex flex-row w-full justify-between space-x-2">
                                <label class="flex-initial w-56 font-semibold">Tanggal Plan</label>
                                <p class="flex-initial w-44 text-right">{{ new Date(visit.tanggal_plan).toLocaleDateString('id-ID') }}</p>
                            </div>
                            <div class="flex flex-row w-full justify-between space-x-2">
                                <label class="flex-initial w-56 font-semibold">Status Visit</label>
                                <ion-badge :color="visit.approval === 1 ? 'success' : 'warning'">{{ visit.approval === 1 ? 'Sudah Visit' : 'Belum Visit' }}</ion-badge>
                            </div>
                            <div class="flex justify-end space-x-4 mt-2">
                                
                                <ion-button expand="block" @click="setOpen(true, visit.callplan_id)">Edit</ion-button>
                                <ion-button color="danger" @click="deleteDataAlert(visit.callplan_id)">Delete</ion-button>
                                <!-- <ion-button color="primary" @click="editVisit(visit)">Edit</ion-button>
                                <ion-button color="danger" @click="deleteVisit(visit.id)">Delete</ion-button> -->
                            </div>
                        </div>
                    </ion-card-header>
                </ion-card>
            </div>

            <!-- Infinite Scroll -->
            <ion-infinite-scroll @ionInfinite="ionInfinite">
                <ion-infinite-scroll-content loading-text="Load more input daftar visit..." loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll>


            <!-- modal -->
            <ion-modal :is-open="isOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Input Plan Visit</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="setOpen(false)">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <div class="mb-4 mt-4">
                        <label
                            for="tanggal"
                            class="block text-gray-700 text-sm font-semibold mb-2"
                            >Tanggal *</label
                        >
                        <ion-input
                            type="date"
                            v-model="tanggal"
                            name="tanggal"
                            id="tanggal"
                            class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-red-500"
                        ></ion-input>
                    </div>
                    
                    <div class="mb-4 mt-4">
                        <label
                            for="toko"
                            class="block text-gray-700 text-sm font-semibold mb-2"
                            >Toko *</label
                        >
                        <select
                            v-model="store_id"
                            id="store_id"
                            name="store_id"
                            class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        >
                            <option disabled selected value="">Pilih Toko</option>
                            <option
                            v-for="store in storeList"
                            :key="store.store_id"
                            :value="store.store_id"
                            >
                            {{ store.store_name }}
                            </option>
                        </select>
                    </div>
                    
                    <button type="button" @click="updateCallPlanDetail(cp_id)" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Save</button>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import HeaderSection from '@/components/HeaderSection.vue';
import { API_URL } from '@/services/globalVariables';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { catchToastError, catchToast } from "@/services/toastHandlers";

import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, alertController } from '@ionic/vue';

  const isOpen = ref(false);
  const storeList = ref([]);
  const cp_id = ref(null)

  const setOpen = (open, id) => {
    (isOpen.value = open)
    if(id != null) {
        // get one row data call plan detail
        getOneCallPlan(id);
        cp_id.value = id;
        // alert(id)
    }
  };

const router = useRouter();
const storeInfoDistri = ref([]);
const dariTanggal = ref(null);
const sampaiTanggal = ref(null);
const lastIndex = ref(5);
const reachedEnd = computed(() => lastIndex.value >= storeInfoDistri.value.length);
const today = new Date();
const formatedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const ionInfinite = (event) => {
    if (!reachedEnd.value) {
        setTimeout(() => {
            lastIndex.value += 5;
            event.target.complete();
        }, 1000);
    } else {
        event.target.disabled = true;
    }
};


// const fetchStoresData = async () => {
//     try {
//         presentLoading();
//         const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
//         const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
//         const headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${tokens.access_token}`
//         };
//         const response = await axios.get(`${API_URL.value}/api/sgs/profil_visit/user/${userId.user_id}`, { headers });
//         storeInfoDistri.value = response.data.resource;
//     } catch (error) {
//         console.error('Failed to fetch Visit data:', error);
//     } finally {
//         stopLoading();
//     }
// };

const getDataVisit = async () => {
    try {
        presentLoading();
        const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
        const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.access_token}`
        };
        const response = await axios.get(`${API_URL.value}/api/sgs/profil_visit/user/${userId.user_id}/filter`, {
            headers,
            params: {
                dariTanggal: dariTanggal.value,
                sampaiTanggal: sampaiTanggal.value
            }
        });
        storeInfoDistri.value = response.data.resource;
    } catch (error) {
        console.error('Failed to fetch Visit data:', error);
    } finally {
        stopLoading();
    }
};

// const editVisit = (visit) => {
//     // Navigasi ke halaman edit atau tampilkan modal edit
//     router.push({ name: 'EditVisitPage', params: { id: visit.id } });
// };

// const deleteVisit = async (visitId) => {
//     try {
//         presentLoading();
//         const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
//         const headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${tokens.access_token}`
//         };
//         await axios.delete(`${API_URL.value}/api/sgs/profil_visit/${visitId}`, { headers });
//         storeInfoDistri.value = storeInfoDistri.value.filter((visit) => visit.id !== visitId);
//     } catch (error) {
//         console.error('Error deleting visit:', error);
//     } finally {
//         stopLoading();
//     }
// };


const getOneCallPlan = async (id) => {
    try {
        presentLoading();
        const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.access_token}`
        };
        const response = await axios.get(`${API_URL.value}/api/sgs/call-plans/detail/${id}`, { headers });
        store_id.value = response.data.resource.store_id;
        tanggal.value = response.data.resource.date;
        // storeInfoDistri.value = storeInfoDistri.value.filter((visit) => visit.id !== visitId);
    } catch (error) {
        console.error('Error deleting visit:', error);
    } finally {
        stopLoading();
    }
}

const fetchToko = async () => {
  try {
    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.get(`${API_URL.value}/api/v2/distri`, {
      headers: headers,
    });

    storeList.value = response.data.resource;
  } catch (error) {
    catchToastError("Failed to fetch store list", 3000);
    console.error("Failed to fetch store list", error);
  }
}

const updateCallPlanDetail = async (id) => {
    presentLoading();
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
    try {
        const tokens = localStorage.getItem("tokens")
        ? JSON.parse(localStorage.getItem("tokens"))
        : null;

        const headers = {
        Authorization: `Bearer ${tokens.access_token}`,
        };

        const response = await axios.put(`${API_URL.value}/api/sgs/call-plans/detail/${id}`,
        {
            tanggal: tanggal.value,
            store_id: store_id.value,
            update_by: userId.user_id
        }, 
        {
        headers: headers,
        });


        stopLoading();
        catchToast(response.data.message, 3000);
        setOpen(false);
        getDataVisit();
    } catch (error) {
        catchToastError("Failed to fetch store list", 3000);
        console.error("Failed to fetch store list", error);
    }
}


async function deleteDataAlert(id) {
  const alert = await alertController.create({
    header: "Delete Data",
    message: "Are you sure?",
    buttons: [
      {
        text: "No",
        cssClass: "alert-button-cancel",
        handler: () => {
          console.log("Pembuatan outlet dibatalkan.");
        },
      },
      {
        text: "Yes",
        cssClass: "alert-button-confirm",
        handler: async () => {
          await deleteCallPlanDetail(id);
        },
      },
    ],
  });

  return alert.present();
}

const deleteCallPlanDetail = async (id) => {
    presentLoading();
    try {
        const tokens = localStorage.getItem("tokens")
        ? JSON.parse(localStorage.getItem("tokens"))
        : null;

        const headers = {
        Authorization: `Bearer ${tokens.access_token}`,
        };

        const response = await axios.delete(`${API_URL.value}/api/sgs/call-plans/detail/${id}`,{
            headers: headers,
        });


        stopLoading();
        catchToast(response.data.message, 3000);
        setOpen(false);
        getDataVisit();
    } catch (error) {
        catchToastError("Failed to fetch store list", 3000);
        console.error("Failed to fetch store list", error);
    }
}

onMounted(() => {
    fetchToko();
    // fetchStoresData();
});
</script>
