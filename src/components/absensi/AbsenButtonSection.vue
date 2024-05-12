<template>
    <div v-if="statusGPS" class="flex w-full px-4 pb-2 space-x-4">
        <ion-button :disabled="disabledCheckIn" @click="takeCheckInPicture" id="check-in-button"
            class="w-full py-2 rounded-lg font-bold text-nowrap">
            Check-In
        </ion-button>
        <ion-button :disabled="disabledCheckOut" @click="takeCheckOutPicture" id="check-out-button"
            class="w-full py-2 rounded-lg font-bold text-nowrap">
            Check-Out
        </ion-button>
    </div>
    <div class="flex w-full items-center justify-center px-4 pb-2">
        <img v-if="imageUrl" :src="imageUrl" id="preview-photo" alt="Captured Photo"
            style="max-width: 100%; height: 400px;" />
    </div>
</template>

<script setup>
import { statusGPS } from '@/services/globalVariables';
</script>