<template>
    <ion-page>
        <ion-content>
            <HeaderSection />

            <div class="flex min-h-full flex-col px-4 py-4">
                <div class="flex flex-col space-y-2 mb-4">
                    <Bar v-if="loaded" id="bar-chart"
                        aria-label="Sales figures for the years 2022 to 2024. Sales in 2022: 987, Sales in 2023: 1209, Sales in 2024: 825."
                        :options="options" :data="chartData" />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import { API_URL } from '@/services/globalVariables';
import axios from 'axios';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const user = ref(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

const countTotalVisits = ref(null)
const testCount = ref(null);
const loaded = ref(false);
const labels = ref([
    "Januari", 
    "Februari", 
    "Maret", 
    "April", 
    "Mei", 
    "Juni", 
    "Juli", 
    "Agustus", 
    "September", 
    "Oktober", 
    "November", 
    "Desember"
]);

const chartData = ref({
    labels: labels.value,
    datasets: [{
        label: "Total Absensi Bulanan",
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 8],
    }],
});

const options = ref({
    scales: {
        y: {
            beginAtZero: true
        }
    },
    responsive: true,
    maintainAspectRatio: false,
});

async function fetchTotalVisitsData(query = "", userNumber) {
    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/salesmen/${userNumber}/visits`, {
            headers: headers,
            params: {
                q: query
            }
        });

        countTotalVisits.value = response.data.resource;

        loaded.value = true;

        console.log(countTotalVisits.value);

        testCount.value = [0, 0, 0, 0, 8];
        
        console.log(testCount.value);
    } catch (error) {
        console.error('Gagal memuat data total visit pengguna: ', error);
    }
}

onMounted(() => {
    fetchTotalVisitsData("count-every-month", user.value.number);
})
</script>

<style scoped></style>