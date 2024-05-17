<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- Header -->
            <header class="bg-transparent p-4 rounded-b-3xl">
                <div class="flex justify-between">
                    <div>
                        <button type="button"
                            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                            @click="redirectToRegisterStorePage">
                            <ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
                        </button>
                    </div>
                    <div class="flex items-center justify-center">
                        <h2 class="text-center">
                            Form Purchase Order
                        </h2>
                    </div>
                    <div class="text-md">
                        <button type="button"
                            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <icon-button>
                                <ion-icon class="text-2xl" :icon="ellipsisVerticalOutline" color="dark"></ion-icon>
                            </icon-button>
                        </button>
                    </div>
                </div>
            </header>
            <div class="container mx-auto">
                <div class="flex items-center justify-center min-h-screen">

                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ellipsisVerticalOutline, chevronBackOutline } from 'ionicons/icons';
</script>

<style scoped></style>