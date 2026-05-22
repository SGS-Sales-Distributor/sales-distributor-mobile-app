<template>
  <ion-page>
    <HeaderSection />
    <ion-content :fullscreen="true">
      <!-- Header -->

      <div class="container">
        <div class="relative overflow-x-auto">
          <div class="py-2 rounded-lg max-w-sm-full w-full">
            <h2 class="text-2xl font-semibold text-center mb-4">Daftar Toko</h2>
            <ion-searchbar :debounce="300" @ionInput="searchStoreHandler" placeholder="Cari nama toko..."
              color="light"></ion-searchbar>
            <div v-for="(store, index) in filteredStores" :key="index + 1" class="relative overflow-x-auto">
              <ion-card class="py-2 bg-lime-500" @click="openEditModal(store)">
                <ion-card-header class="bg-gray-50">
                  <div class="flex flex-col w-full h-full space-y-2">
                    <!-- Store Details -->
                    <div class="flex flex-row w-full h-full justify-between space-x-2">
                      <label class="flex-initial w-56 font-semibold">Nama Toko</label>
                      <p class="flex-initial w-44 text-right">{{ store.store_name }}</p>
                    </div>
                    <div class="flex flex-row w-full h-full justify-between space-x-2">
                      <label class="flex-initial w-56 font-semibold">Alamat Toko</label>
                      <p class="flex-initial w-44 text-right">{{ store.store_address }}</p>
                    </div>
                  </div>
                </ion-card-header>
              </ion-card>
            </div>



            <!-- Edit Modal -->
            <ion-modal :is-open="isEditModalOpen" :key="selectedStore.store_id" @didDismiss="closeEditModal">
              <ion-header translucent>
                <ion-toolbar>
                  <ion-title>Detail Store</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="closeEditModal">Close</ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>

              <ion-content class="ion-padding">

                <ion-card>
                  <ion-card-header>
                    <ion-card-title class="text-center font-bold">
                      Detail Toko
                    </ion-card-title>
                  </ion-card-header>

                  <ion-card-content>

                    <ion-item lines="full">
                      <ion-label position="stacked">Nama Toko</ion-label>
                      <ion-input v-model="selectedStore.store_name" :readonly="!canEditStore" />
                    </ion-item>

                    <ion-item lines="full">
                      <ion-label position="stacked">Alamat Toko</ion-label>
                      <!-- <ion-textarea v-model="selectedStore.store_address" auto-grow /> -->
                      <ion-textarea v-model="selectedStore.store_address" :value="selectedStore.store_address" auto-grow
                        :readonly="!canEditStore" />
                    </ion-item>

                    <ion-item lines="full">
                      <ion-label position="stacked">No HP</ion-label>
                      <ion-input v-model="selectedStore.store_phone" :readonly="!canEditStore" />
                    </ion-item>

                    <ion-item lines="full">
                      <ion-label position="stacked">Owner</ion-label>
                      <ion-input v-model="selectedStore.owner" :readonly="!canEditStore" />
                    </ion-item>

                    <ion-item lines="full">
                      <ion-label position="stacked">NIK</ion-label>
                      <ion-input v-model="selectedStore.nik_owner" :readonly="!canEditStore" />
                    </ion-item>

                    <ion-item lines="full">
                      <ion-label position="stacked">Email</ion-label>
                      <ion-input v-model="selectedStore.email_owner" :readonly="!canEditStore" />
                    </ion-item>

                    <ion-item lines="none">
                      <ion-label position="stacked">Credit Limit</ion-label>
                      <ion-input :value="formattedCreditLimit" readonly />
                    </ion-item>

                    <div class="mt-4">
                      <ion-button v-if="canEditStore" expand="block" color="primary" @click="saveStoreChanges">
                        Simpan
                      </ion-button>

                      <ion-button expand="block" color="medium" fill="outline" @click="closeEditModal">
                        Batal
                      </ion-button>
                    </div>

                  </ion-card-content>
                </ion-card>

              </ion-content>
            </ion-modal>
          </div>
        </div>
      </div>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </ion-content>
  </ion-page>
</template>

<script setup>
import axios from "axios";
import { createSharp, checkmarkCircleSharp } from "ionicons/icons";
import HeaderSection from "./../components/HeaderSection.vue";
import { API_URL, currentRoute } from "@/services/globalVariables";
import { computed, onMounted, ref } from "vue";
import { refreshAccessTokenHandler } from "@/services/auth";
import { useRoute } from "vue-router";
import { catchToast, catchToastError } from "@/services/toastHandlers";
import { IonRefresher, IonRefresherContent } from "@ionic/vue";
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const route = useRoute();
const currentPageRouteName = computed(() => route.name);

const storesData = ref([]);
const selectedStore = ref({});
const isEditModalOpen = ref(false);
const lastIndex = ref(20);
const searchQuery = ref("");
const user_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const canEditStore = Number(user_id?.jabatan_id) >= 6;

const formattedCreditLimit = computed(() => {
  if (selectedStore.value.credit_limit) {
    return `Rp. ${new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(selectedStore.value.credit_limit)}`;
  }
  return "";
});

const filteredStores = computed(() => {
  if (!searchQuery.value) {
    return storesData.value.slice(0, lastIndex.value);
  }
  return storesData.value.filter((store) =>
    store.store_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function searchStoreHandler(event) {
  searchQuery.value = event.target.value;
}

const ionInfinite = (event) => {
  if (filteredStores.value.length > lastIndex.value) {
    setTimeout(() => {
      lastIndex.value += 5;
      event.target.complete();
    }, 1000);
  } else {
    event.target.disabled = true;
  }
};

function handleCreditLimitInput(event) {
  const value = event.target.value.replace(/[^0-9]/g, "");
  selectedStore.value.credit_limit = Number(value);
}

async function fetchStoresData() {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    // const response = await axios.get(`${API_URL.value}/api/v2/stores`, { headers });
    const response = await axios.get(`${API_URL.value}/api/v2/storesByUser/${user_id.user_id}`, { headers });
    storesData.value = response.data.resource;
    console.log("USER:", user_id);
console.log("USER ID:", user_id?.user_id);
  } catch (error) {
    console.error("Failed to fetch store data.", error);
  }
}

const handleRefresh = (event) => {
  window.location.reload();
  setTimeout(() => {
    event.target.complete();
  }, 1000);
};

function openEditModal(store) {
  console.log("STORE DATA:", store);

  selectedStore.value = {
    id: store.id ?? null,
    store_id: store.store_id ?? null,
    store_name: store.store_name ?? "",
    store_address: store.store_address ?? store.alamat_toko ?? "",
    store_phone: store.store_phone ?? store.nomor_telepon_toko ?? "",
    owner: store.owner ?? "",
    nik_owner: store.nik_owner ?? "",
    email_owner: store.email_owner ?? "",
    credit_limit: store.credit_limit ?? 0,
  };

  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}

async function saveStoreChanges() {
  try {
    if (!canEditStore) {
      catchToastError("Hanya jabatan 6 ke atas yang bisa edit toko", 3000);
      return;
    }

    if (
      !selectedStore.value.store_name ||
      !selectedStore.value.store_address ||
      //!selectedStore.value.store_phone ||
      !selectedStore.value.owner 
      // !selectedStore.value.nik_owner ||
      // !selectedStore.value.email_owner
    ) {
      catchToastError("Semua field wajib diisi", 3000);
      return;
    }
    await presentLoading();
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const storeData = {
      store_name: selectedStore.value.store_name,
      store_alias: selectedStore.value.store_name,
      store_address: selectedStore.value.store_address,
      store_phone: selectedStore.value.store_phone || null,
      credit_limit: selectedStore.value.credit_limit,
      owner: selectedStore.value.owner,
      nik_owner: selectedStore.value.nik_owner || null,
      email_owner: selectedStore.value.email_owner || null,
      userFullname: user_id.fullname,
    };

    await axios.put(
      `${API_URL.value}/api/v2/stores/${selectedStore.value.store_id}`,
      storeData,
      { headers }
    );

    catchToast("Berhasil update", 2000);

    closeEditModal();
    fetchStoresData();

  } catch (error) {
    console.log(error);
    catchToastError("Gagal update", 2000);
  }
  finally {
    stopLoading();
  }
}


onMounted(() => {
  fetchStoresData();
});
</script>

<style scoped>
.container {
  margin-top: 28%;
  position: flex;
  flex-direction: column;
}

ion-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

ion-item {
  --border-radius: 8px;
  margin-bottom: 8px;
}
</style>
