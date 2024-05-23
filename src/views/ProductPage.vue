<template>
    <ion-page>
        <ion-content>
            <HeaderSection />

            <div class="flex min-h-full flex-col p-4">
                <div class="relative overflow-x-auto">
                    <div class="py-2 rounded-lg max-w-sm-full w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">List Brand Produk</h2>
                        <p class="text-gray-600 text-center mb-6">Daftar Brand Produk Terkini.</p>
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