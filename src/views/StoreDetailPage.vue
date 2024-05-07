<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div v-if="store">
                <p>{{ store.nama_toko }}</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { refreshAccessTokenHandler } from '@/services/auth.js';

const API_URL = `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`;

const route = useRoute();
const storeId = route.params.id;
const store = ref(null);

function refreshToken() {
  refreshAccessTokenHandler();
}

async function fetchStoreDetailData(id) {
	try {
		refreshToken();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

		const headers = {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${tokens.access_token}`
		};

		const response = await axios.get(`${API_URL}/api/v2/stores/${id}`, {
				headers: headers
		});

		store.value = response.data.resource;
		
		console.log(`Successfully fetch store ${id}: `, response);
	} catch (error) {
		console.log(`Failed to fetch store ${id}: `, error);
	}
}

onMounted(() => {
	fetchStoreDetailData(storeId);
});
</script>