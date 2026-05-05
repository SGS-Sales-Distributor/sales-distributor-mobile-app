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
                <h1><b>Kak, {{ user.fullname }}</b></h1>
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <h3>Welcome To
                SiSOPA (SGS Sales Operasional Application)</h3>
        </ion-card-content>
    </ion-card>
</template>



<script setup>
import { ref } from 'vue';

// const isOpen = ref(false);
// const setOpen = (open) => (isOpen.value = open);

const user = ref(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "");
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const tday = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
}));
const formatedDate = days[tday.getDay()] + ', ' + ('0' + (tday.getDate())).slice(-2) + ' ' + bulan[tday.getMonth()] + ' ' + tday.getFullYear();;
</script>
