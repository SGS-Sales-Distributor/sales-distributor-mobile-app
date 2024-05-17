<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- Header -->
            <HeaderSection />
            
            <div class="container mx-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="p-8 rounded-lg max-w-sm-full w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">Daftar Outlet Baru</h2>
                        <p class="text-gray-600 text-center mb-6">Masukkan data yang diperlukan.</p>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import HeaderSection from './../components/HeaderSection.vue'
</script>

<style scoped></style>