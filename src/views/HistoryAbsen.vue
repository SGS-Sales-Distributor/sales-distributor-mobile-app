<template>
    <ion-page>
        <HeaderSection />
        <ion-content :fullscreen="true">

            <div class="rekap-container">
                <ion-card color="">
                    <ion-card-content>
                        <label for="dari">Dari Tanggal : </label>
                        <ion-item button @click="showPopover = true" style="color: black">
                            <ion-text slot="start">
                            {{
                                selectedDate ? formatDate(selectedDate,"DD MMMM YYYY") : "Pilih Tanggal"
                            }}</ion-text
                            >
                        </ion-item>

                        <!-- Popover -->
                        <ion-popover
                            :is-open="showPopover"
                            side="bottom"
                            alignment="center"
                            style="--width: 300px; --max-width: 90vw"
                        >
                            <ion-content class="ion-padding" style="width: 300px">
                            <ion-datetime
                                ref="datetimeRef"
                                presentation="date"
                                v-model="selectedDate"
                                @ionChange="showPopover = false"
                            ></ion-datetime>
                            <ion-button expand="block" size="small" @click="confirmDate"
                            >OK</ion-button
                            >
                            </ion-content>
                        </ion-popover>
                        <label for="sampai">Sampai Tanggal : </label>
                        <ion-item button @click="showPopover2 = true" style="color: black">
                            <ion-text slot="start">
                            {{
                                selectedDateEnd ? formatDate(selectedDateEnd,"DD MMMM YYYY") : "Pilih Tanggal"
                            }}</ion-text
                            >
                        </ion-item>

                        <!-- Popover -->
                        <ion-popover
                            :is-open="showPopover2"
                            side="bottom"
                            alignment="center"
                            style="--width: 300px; --max-width: 90vw"
                        >
                            <ion-content class="ion-padding" style="width: 300px">
                            <ion-datetime
                                ref="datetimeRef"
                                presentation="date"
                                v-model="selectedDateEnd"
                                @ionChange="showPopover2 = false"
                            ></ion-datetime>
                            <ion-button expand="block" size="small" @click="confirmDate2"
                            >OK</ion-button
                            >
                            </ion-content>
                        </ion-popover>
                        <br>
                        <button type="button"
                            class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            @click="getDataVisit"><ion-icon slot="start" :icon="checkmarkCircleSharp"></ion-icon> Lihat</button>
                    </ion-card-content>
                </ion-card>
            </div>
            <div v-if="!storeInfoDistri" class="relative overflow-x-auto">
                <ion-card class="py-2 odd:bg-blue-500 even:bg-sky-400">Belum Ada Data</ion-card>
            </div>
            <div v-for="(visit, index) in storeInfoDistri" :key="index + 1" class="relative overflow-x-auto" v-else>
                <ion-card class="py-2 odd:bg-blue-500 even:bg-sky-400">
                    <ion-card-header class="bg-gray-50">
                        <div class="flex flex-col w-full h-full space-y-2">
                            <div class="flex flex-row w-full h-full justify-between space-x-2">
                                <label for="date-day" class="flex-initial w-56 font-semibold">{{ formatDateList(visit.attendee_date) }}</label>
                                <p class="flex-initial w-44 text-right">{{ visit.nama_toko }}</p>
                            </div>
                           
                            <div v-if="visit.idNotVisit !== null"
                                class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Masuk</label>
                                <p>{{ visit.attendee_time_in }}</p>
                               
                            </div>
                           <div class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Pulang</label>
                                <p>{{ visit.attendee_time_out !== null ? visit.attendee_time_out : "Kosong"  }}</p>
                           </div>
                           <div class="flex flex-row w-full h-full justify-center items-center space-x-2">
                                <ion-button @click="lihatData(visit.id)"><ion-icon slot="start" :icon="arrowRedo"></ion-icon> Detail</ion-button>
                           </div>
                        </div>
                        <ion-modal :is-open="showModal" @didDismiss="closeModal">
                            <ion-header>
                            <ion-toolbar>
                                <ion-title>Detail Absen</ion-title>
                                <ion-buttons slot="end">
                                <ion-button @click="closeModal">Tutup</ion-button>
                                </ion-buttons>
                            </ion-toolbar>
                            </ion-header>
                            <ion-content class="ion-padding">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <!-- Foto Absen Masuk -->
                                    <p class="text-center mt-2 font-medium"><b>Absen Masuk</b></p>
                                    <div class="rounded-xl overflow-hidden shadow-lg">
                                    <ion-img
                                        v-if="selectedFotoIn!==null"
                                        :src="selectedFotoIn"
                                        alt="Foto Absen Masuk"
                                    />
                                    <p v-else class="text-center mt-2 font-medium">Foto Tidak Tersedia</p>
                                    <ion-button v-if="locationLat !== null && locationLong !== null" class="flex flex-row justify-center items-center space-x-2"
                                    :href="`https://google.com/maps?q=${locationLong},${locationLat}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    > <ion-icon slot="start" :icon="eye"></ion-icon>
                                    Lihat Lokasi
                                    </ion-button>
                                    <p v-else class="text-center mt-2 font-medium">Lokasi Tidak Tersedia</p>
                                    </div>
                                    <br>
                                    <!-- Foto Absen Pulang -->
                                    <p class="text-center mt-2 font-medium"><b>Absen Pulang</b></p>
                                    <div class="rounded-xl overflow-hidden shadow-lg">
                                    <ion-img
                                        v-if="selectedFotoOut!==null"
                                        :src="selectedFotoOut"
                                        alt="Foto Absen Pulang"
                                    />
                                    <p v-else class="text-center mt-2 font-medium">Foto Tidak Tersedia</p>
                                    <ion-button v-if="locationLatOut !== null && locationLongOut !== null" class="flex flex-row justify-center items-center space-x-2"
                                    :href="`https://google.com/maps?q=${locationLongOut},${locationLatOut}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Lihat Lokasi
                                    </ion-button>
                                    <p v-else class="text-center mt-2 font-medium">Lokasi Tidak Tersedia</p>
                                    </div>
                                </div>
                                </ion-content>
                        </ion-modal>
                    </ion-card-header>
                </ion-card>
            </div>
            <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
                <ion-infinite-scroll-content loading-text="Load more ..."
                    loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll> -->
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
        </ion-content>
    </ion-page>
</template>
<script setup>
import { eye,arrowRedo,checkmarkCircleSharp } from 'ionicons/icons';
import { refreshAccessTokenHandler } from '@/services/auth';
import HeaderSection from '@/components/HeaderSection.vue';
import { IonInput, IonSearchbar } from '@ionic/vue';
import { onMounted, ref, computed } from 'vue';
import { catchToastError, catchToastWarn, catchToastInfo,catchToast } from '@/services/toastHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { useRoute } from 'vue-router';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { IonDatetime, IonDatetimeButton, IonModal, IonRefresher, IonRefresherContent, IonPopover,IonAlert} from '@ionic/vue';

const route = useRoute();
const currentPageRouteName = computed(() => route.name);
const storeInfoDistri = ref([]);
const visitData = ref([]);
const lastIndex = ref(5);
const visiter = computed(() => {
    return storeInfoDistri.value && storeInfoDistri.value.length > 0
        ? storeInfoDistri.value.slice(0, lastIndex.value)
        : [];
});
const today = new Date();
const m = String(today.getMonth() + 1).padStart(2, '0');
const d = String(today.getDate()).padStart(2, '0');
const y = String(today.getFullYear());
const selectedDate = ref(null);
const selectedDateEnd = ref(null);
const showPopover = ref(false);
const showPopover2 = ref(false);
const detailAbsence = ref();
const showModal = ref(false);
const selectedFotoIn = ref("");
const selectedFotoOut = ref("");
const locationLat =  ref("");
const locationLong =  ref("");
const locationLatOut =  ref("");
const locationLongOut =  ref("");

const confirmDate = () => {
  showPopover.value = false; 
};

const confirmDate2 = () => {
  showPopover2.value = false; 
};

const formatDate = (dateStr, format = "YYYY-MM-DD") => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;

    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;

    case "DD MMMM YYYY":
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

    case "dddd, DD MMMM YYYY":
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

    default:
      return date.toDateString(); // fallback
  }
};

const formatDateList = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);

    const date = new Date(year, month - 1, day);

      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
};

const closeModal = () => {
  showModal.value = false;
  selectedFotoIn.value = "";
  selectedFotoOut.value = "";
};

const reachedEnd = computed(() => {
    return Array.isArray(storeInfoDistri.value) && lastIndex.value >= storeInfoDistri.value.length;
});

const ionInfinite = (event) => {
    if (!reachedEnd.value) {
        setTimeout(() => {
            lastIndex.value += 5;

            event.target.complete();
        }, 1000);
    } else {
        event.target.disabled = true;
    }
}

async function lihatData(id) {
    try {
        const response = await axios.get(`${API_URL.value}/api/v2/getById/${id}`,{
        });
        
        showModal.value = true
        detailAbsence.value = response.data.resource;
        selectedFotoIn.value =detailAbsence.value.images_in;
        selectedFotoOut.value =detailAbsence.value.images_out;
        locationLat.value = detailAbsence.value.attendee_latitude_in ;
        locationLong.value = detailAbsence.value.attendee_longitude_in ;
        locationLatOut.value = detailAbsence.value.attendee_latitude_out ;
        locationLongOut.value = detailAbsence.value.attendee_longitude_out ;
        catchToast(response.data.message, 3000);

    } catch (error) {
        // if (error.response && error.response.data.status == 404 || error.response.data.status == 500) {
        //         catchToastError(error.response.data.message, 3000);
        //     }
            console.log(error.message);
        }
}


const handleRefresh = () => {
    window.location.reload();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
};


async function getDataVisit() {
    if (!selectedDate.value) {
        catchToastError("Dari Tanggal Belum Dipilih",2000);
  } else if (!selectedDateEnd.value) {
        catchToastError("Sampai Tanggal Belum Dipilih",2000);
  } else {

      try {
          presentLoading();
          const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
          const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
          const mulai = formatDate(selectedDate.value,"YYYY-MM-DD");
          const sampai = formatDate(selectedDateEnd.value,"YYYY-MM-DD");
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };
        

        const response = await axios.get(`${API_URL.value}/api/v2/RekapAbsen/${userId.user_id}`, {
            headers: headers,
            "userId": userId.user_id,
            params: {
                date_start: mulai,
                date_end: sampai,
            },
        });
        
        storeInfoDistri.value = response.data.resource;
        catchToast(response.data.message, 3000);
        console.log(storeInfoDistri.value);
        
    } catch (error) {
        if (error.response && error.response.data.status == 404 || error.response.data.status == 500) {
                catchToastError(error.response.data.message, 3000);
            }
            console.log(error.message);
        }
        finally {
            stopLoading();
        }
    }
    }

onMounted(() => {
    // getDataVisit();

})
</script>
<style scoped>
.rekap-container {
    margin-top: 28%;
    position: flex;
    flex-direction: column;
}

.foto-absen {
  max-width: 100%;
  border-radius: 8px;   /* lebih besar dari 8px */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15); /* shadow lembut */
}
</style>