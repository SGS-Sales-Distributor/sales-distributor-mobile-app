<template>
    <ion-card color="light">
        <ion-card-header>
            <ion-card-title>
                <div class="text-right">
                    <p>{{ formatedDate }}</p>
                </div>
                <table>
                    <tr>
                        <td><img src="/public/hand-thumbnail.png" class="h-12 default" alt="hand"></td>
                        <td>
                            <img src="/public/Hello.png" class="h-10 default" alt="">
                        </td>
                    </tr>
                </table>
            </ion-card-title>
            <ion-card-subtitle>
                <h1><b>Kak, {{ user.fullname }} 
                    <ion-text v-if="checkError === 404" color="danger">(Anda Belum Absen)</ion-text> 
                    <ion-text v-else-if="detAbsen.attendee_time_in !== null && detAbsen.attendee_time_out === null" color="primary">(Absen Masuk Jam {{detAbsen.attendee_time_in}}) </ion-text>
                     <ion-text v-else color="secondary">(Absen Pulang Jam {{detAbsen.attendee_time_out}})</ion-text></b> </h1>
                
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <h3>Welcome To
                SiSOPA (SGS Sales Operasional Application)</h3>
        </ion-card-content>
    </ion-card>
</template>



<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { IonText } from '@ionic/vue';
import { catchToastError }from '@/services/toastHandlers';

// const isOpen = ref(false);
// const setOpen = (open) => (isOpen.value = open);

const user = ref(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "");
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const tday = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
}));
const m = String(tday.getMonth() + 1).padStart(2, '0');
const d = String(tday.getDate() - 3).padStart(2, '0');
const y = String(tday.getFullYear());

const formatedDate = days[tday.getDay()] + ', ' + ('0' + (tday.getDate())).slice(-2) + ' ' + bulan[tday.getMonth()] + ' ' + tday.getFullYear();;
const tokenset = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
const detAbsen = ref([]);
const checkError = ref(null);


async function getAbsenDay() {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenset.access_token}`,
    };

    const response = await axios.get(`${API_URL.value}/api/v2/getAbsen/${userId.user_id}/`, {
      headers: headers,
    });

     detAbsen.value= response.data.resource;

  } catch (error) {
    console.log(error.message, 3000);
    checkError.value=error.response.data.status;
  }
}


onMounted(() => {
    getAbsenDay();
});
</script>