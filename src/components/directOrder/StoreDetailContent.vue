<template>
    <ion-card-content class="bg-white">
        <div>
            <dl>
                <div class="bg-lime-50 p-2.5 sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt class="text-md font-bold text-gray-900">
                        Nama Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ namaToko }}
                    </dd>
                </div>
                <div class="bg-lime-100 p-2.5 sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt class="text-md font-bold text-gray-900">
                        Nama Alias Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ aliasToko }}
                    </dd>
                </div>
                <div class="bg-lime-50 p-2.5 sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt class="text-md font-bold text-gray-900">
                        Alamat Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ alamatToko }}
                    </dd>
                </div>
                <div class="bg-lime-100 p-2.5 sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt class="text-md font-bold text-gray-900">
                        Nomor Telepon Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ nomorTelepon }}
                    </dd>
                </div>
                <div class="bg-lime-50 p-2.5 sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt class="text-md font-bold text-gray-900">
                        Nomor Fax Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ nomorFax }}
                    </dd>
                </div>
                <div class="bg-lime-100 p-2.5 sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt class="text-md font-bold text-gray-900">
                        Kode Unik Toko
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ kodeToko }}
                    </dd>
                </div>
            </dl>
        </div>
    </ion-card-content>
</template>

<script setup>
defineProps({
    namaToko: String,
    aliasToko: String,
    alamatToko: String,
    nomorTelepon: String,
    nomorFax: String,
    kodeToko: String,
});
</script>

<style scoped>

</style>