<template>
    <div class="location-cont">
        <div class="flex flex-col text-center pt-4">
            <p class="text-xl font-bold">Izinkan kami untuk mengakses lokasimu</p>
            <p class="text-md text-gray-700">Kami membutuhkan data lokasimu untuk memberikan pengalaman yang terbaik.
            </p>
        </div>
        <div class="flex justify-center items-center">
            <img src="/public/location-pin.png" alt="Location Not Allowed." class="w-80 h-80">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.location-cont {
    margin-top: 20%;
    position: flex;
    flex-direction: column;
}
</style>