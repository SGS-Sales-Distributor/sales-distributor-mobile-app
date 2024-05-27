<template>
    <ion-page>
        <ion-content>
            <HeaderSection />

            <div class="flex min-h-full flex-col p-4">
                <div class="relative overflow-x-auto">
                    <div class="py-2 rounded-lg max-w-sm-full w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">List Brand Produk</h2>
                        <p class="text-gray-600 text-center mb-6">Daftar Brand Produk Terkini.</p>

                        <div
                            class="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-6 m-6">
                            <ion-card v-for="(brand, index) in visibleBrands" :key="index + 1"
                                class="max-w-sm shadow-lg hover:scale-105 transition-all">
                                <ion-card-header v-if="brand.brand_name === 'Dewi Sri Spa'">
                                    <router-link :to="routeLinkToProduct(brand.brand_id)">
                                        <img class="object-cover h-64 w-full" src="/public/dewi_sri_spa.jpeg"
                                            alt="Dewi Sri Spa Logo" />
                                    </router-link>
                                </ion-card-header>

                                <ion-card-header v-if="brand.brand_name === 'PAC'">
                                    <router-link :to="routeLinkToProduct(brand.brand_id)">
                                        <img class="object-cover h-64 w-full" src="/public/PAC.jpg" alt="PAC Logo" />
                                    </router-link>
                                </ion-card-header>

                                <ion-card-header v-if="brand.brand_name === 'Raine Beauty'">
                                    <router-link :to="routeLinkToProduct(brand.brand_id)">
                                        <img class="object-cover h-64 w-full" src="/public/raine_beauty.jpeg"
                                            alt="Raine Beauty Logo" />
                                    </router-link>
                                </ion-card-header>

                                <ion-card-header v-if="brand.brand_name === 'Smith'">
                                    <router-link :to="routeLinkToProduct(brand.brand_id)">
                                        <img class="object-cover h-64 w-full" src="/public/smith men supply.jpeg"
                                            alt="Smith Men Supply Logo" />
                                    </router-link>
                                </ion-card-header>
                            </ion-card>
                        </div>
                        <ion-infinite-scroll @ionInfinite="ionInfinite">
                            <ion-infinite-scroll-content loading-text="Load more brands..."
                                loading-spinner="circular"></ion-infinite-scroll-content>
                        </ion-infinite-scroll>
                    </div>
                </div>
            </div>

            <ion-modal :is-open="isOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Daftar Produk --Nama Brand--</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="setOpen(false)">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden">
                        <div class="relative bg-white px-6 mx-auto w-full max-w-lg rounded-2xl">
                            <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                                <div class="flex flex-col items-center justify-center text-center space-y-2">
                                    <img src="/public/3d-mobile-phone-with-security-code-padlock.jpg" alt="OTP Images">
                                    <div class="font-semibold text-3xl">
                                        <p>Kirim OTP Whatsapp</p>
                                    </div>
                                    <div class="flex flex-row text-sm font-medium text-gray-400">
                                        <p>Kami akan mengirimkan kode OTP ke nomor <br />{{ nomorWhatsappOTP }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import HeaderSection from './../components/HeaderSection.vue'
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { catchToastError } from '@/services/toastHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';

const routeLinkToProduct = (brandId) => {
    return `/brand/${brandId}/product`
}

const brandsData = ref([]);

const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open, flagOTP.value = true);

const lastIndex = ref(5);
const visibleBrands = computed(() => {
    return brandsData.value && brandsData.value.length > 0
        ? brandsData.value.slice(0, lastIndex.value)
        : [];
});
const reachedEnd = computed(() => {
    return Array.isArray(brandsData.value) && lastIndex.value >= brandsData.value.length;
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

async function fetchBrandsData(query = '') {
    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/brands`, {
            headers: headers,
            params: {
                q: query
            }
        });

        brandsData.value = response.data.resource.data;

        console.log(brandsData.value);
    } catch (error) {
        catchToastError("Failed to fetch brand data", 3000);

        console.error("Failed to fetch brand data: ", error);
    }
}

onMounted(() => {
    presentLoading();
    fetchBrandsData();
    stopLoading();
});
</script>

<style scoped></style>