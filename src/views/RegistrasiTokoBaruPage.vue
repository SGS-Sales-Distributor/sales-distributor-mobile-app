<template>
    <ion-page>
        <HeaderSection />
        <ion-content :fullscreen="true">
            <div class="container">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="p-8 rounded-lg max-w-sm w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">Daftar Outlet Baru</h2>
                        <p class="text-gray-600 text-center mb-6">Masukkan data yang diperlukan.</p>
                        <Form @submit="storeDataAlert" method="post" novalidate :validation-schema="validation">
                            <div class="mb-4">
                                <label for="store_name" class="block text-gray-700 text-sm font-semibold mb-2">Nama Toko
                                    *</label>
                                <Field v-model="formData.store_name" :type="fieldTypes.text" id="store_name"
                                    name="store_name"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                    placeholder="Masukkan nama toko" aria-label="store_name"
                                    aria-describedby="store_name" />
                                <ErrorMessage name="store_name" class="text-rose-500" />
                            </div>
                            <div class="mb-4">
                                <label for="store_alias" class="block text-gray-700 text-sm font-semibold mb-2">Nama
                                    Alias Toko *</label>
                                <Field v-model="formData.store_alias" :type="fieldTypes.text" id="store_alias"
                                    name="store_alias"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                    placeholder="Masukkan nama alias toko" aria-label="store_alias"
                                    aria-describedby="store_alias" />
                                <ErrorMessage name="store_alias" class="text-rose-500" />
                            </div>
                            <div class="mb-4">
                                <label for="store_address" class="block text-gray-700 text-sm font-semibold mb-2">Alamat
                                    Toko
                                    *</label>
                                <Field v-model="formData.store_address" name="store_address" as="textarea"
                                    id="store_address"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                    placeholder="Masukkan alamat toko" cols="20" rows="10" aria-label="store_address"
                                    aria-describedby="store_address">
                                </Field>
                                <ErrorMessage name="store_address" class="text-rose-500" />
                            </div>
                            <div class="mb-4">
                                <label for="store_phone" class="block text-gray-700 text-sm font-semibold mb-2">Nomor
                                    Telepon Toko *</label>
                                <Field v-model="formData.store_phone" :type="fieldTypes.phone" id="store_phone"
                                    name="store_phone"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                    placeholder="Masukkan Nomer Telepon Toko" aria-label="store_phone"
                                    aria-describedby="store_phone" />
                                <ErrorMessage name="store_phone" class="text-rose-500" />
                            </div>
                            <div class="mb-4">
                                <label for="store_fax" class="block text-gray-700 text-sm font-semibold mb-2">Nomor Fax
                                    Toko</label>
                                <Field v-model="formData.store_fax" :type="fieldTypes.phone" id="store_fax"
                                    name="store_fax"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                    placeholder="Masukkan Nomer Fax Toko" aria-label="store_fax"
                                    aria-describedby="store_fax" />
                                <ErrorMessage name="store_fax" class="text-rose-500" />
                            </div>
                            <div class="mb-4">
                                <label for="store_type" class="block text-gray-700 text-sm font-semibold mb-2">Tipe Toko
                                    *</label>
                                <Field v-model="formData.store_type_id" as="select" id="store_type" name="store_type"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled selected value="">Pilih Tipe Toko</option>
                                    <option v-for="type in storeTypes" :key="type.code"
                                        :value="type.code">
                                        {{ type.label }}
                                    </option>
                                </Field>
                                <ErrorMessage name="store_type" class="text-rose-500" />
                            </div>
                            <div class="mb-4">
                                <label for="subcabang_id" class="block text-gray-700 text-sm font-semibold mb-2">Cabang
                                    Toko*</label>
                                <Field v-model="formData.subcabang_id" as="select" id="subcabang_id" name="subcabang_id"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled selected value="">Pilih Cabang Toko</option>
                                    <option v-for="cabang in storeCabangs" :key="cabang.id" :value="cabang.id">
                                        {{ cabang.nama_cabang }}
                                    </option>
                                </Field>
                                <ErrorMessage name="subcabang_id" class="text-rose-500" />
                            </div>
                            <br>
                            <button type="submit"
                                class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"><ion-icon slot="start" :icon="checkmarkCircleSharp"></ion-icon> Daftarkan
                            </button>
                            <p class="text-gray-600 text-xs text-center mt-4">
                                Dengan menekan tombol Daftarkan, maka toko bisa terdaftar dalam Call Plan Anda.
                            </p>
                        </Form>
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
import * as Yup from 'yup';
import {checkmarkCircleSharp} from 'ionicons/icons';
import HeaderSection from './../components/HeaderSection.vue'
import { onMounted, ref } from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import axios from 'axios';
import { API_URL, fieldTypes, savedStoreData } from '@/services/globalVariables';
import { redirectToOwnerFormPage, redirectToRegisterStorePage } from '@/services/redirectHandlers';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { alertController,IonIcon,IonRefresher,IonRefresherContent } from '@ionic/vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

const storeTypes = ref([]);
const storeCabangs = ref([]);

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const formData = ref({
    store_name: null,
    store_alias: null,
    store_address: null,
    store_phone: null,
    store_fax: null,
    store_type_id: null,
    subcabang_id: null,
    userFullname: user.fullname
});

const validation = Yup.object().shape({
    store_name: Yup.string()
        .required('Nama toko tidak boleh kosong!')
        .max(100, 'Nama toko tidak boleh lebih dari 100 karakter'),
    store_alias: Yup.string()
        .required('Nama alias toko tidak boleh kosong!')
        .max(200, 'Nama alias toko tidak boleh lebih dari 200 karakter'),
    store_address: Yup.string()
        .required("Alamat toko tidak boleh kosong!"),
    store_phone: Yup.string()
        .required('Nomor Telepon toko tidak boleh kosong!')
        .min(11, 'Nomor Telepon toko tidak boleh kurang dari 11 digit')
        .matches(/^[0-9]{11,12}$/, 'Nomor telepon harus terdiri dari 11-12 digit angka'),
    store_fax: Yup.string()
        .required('Nomor fax toko tidak boleh kosong!')
        .max(10, 'Nomor fax toko tidak boleh lebih dari 10-11 Digit')
        .matches(/^[0-9]{1,12}$/, 'Nomor Fax harus terdiri dari 1-12 digit angka'),
    store_type: Yup.string()
        .required('Mohon Pilih Tipe Terlebih Dahulu!'),
    subcabang_id: Yup.string()
        .required('Mohon Pilih Cabang Terlebih Dahulu!'),

});

const handleRefresh = () => {
  window.location.reload();
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};

async function storeDataAlert() {
    const alert = await alertController.create({
        header: "Konfirmasi pembuatan outlet baru",
        message: "Apakah kamu yakin?",
        buttons: [
            {
                text: "Tidak",
                cssClass: "alert-button-cancel",
                handler: () => {
                    console.log("Pembuatan outlet dibatalkan.");
                },
            },
            {
                text: "Lanjutkan",
                cssClass: "alert-button-confirm",
                handler: async () => {
                    await saveStoreData();
                },
            },
        ],
    });

    return alert.present();
}

function clearForm() {
    formData.value = {
        store_name: null,
        store_alias: null,
        store_address: null,
        store_phone: null,
        store_fax: null,
        store_type_id: null,
        subcabang_id: null,
        userFullname: null,
    };
}

async function saveStoreData() {
    try {
        refreshAccessTokenHandler();

        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Authorization': `Bearer ${tokens.access_token}`,
        }

        presentLoading();

        const response = await axios.post(`${API_URL.value}/api/v2/stores`, formData.value, {
            headers: headers,
        });

        stopLoading();

        savedStoreData.value = response.data.resource.store_id;

        console.log(savedStoreData.value);
        sessionStorage.setItem('store_id', savedStoreData.value);
        catchToast(response.data.message, 3000);
        clearForm();
        // this.formData.reset();
        redirectToOwnerFormPage(savedStoreData.value);
    } catch (error) {
        if (error.response && error.response.data.status == 401) {
            catchToastError(error.response.data.message, 3000);
            //catchToastError("Gagal membuat data toko baru", 3000);
            redirectToRegisterStorePage();
        }
        // else if(error.response.data.status == 422){   
        //     catchToastError(error.response.data.message, 3000);
        //     redirectToRegisterStorePage();
        // } 
        else {
            // catchToastError('Terjadi Kesalahan Server! Silahkan Coba Beberapa Saat Lagi', 3000);
            catchToastError("Gagal Menyimpan data toko baru", 3000);
            redirectToRegisterStorePage();
            console.error(error.response);

        }
    } finally {
        stopLoading();
    }
}

async function fetchStoreTypes(query = '') {
    try {

        const response = await axios.get(`${API_URL.value}/api/v2/getStype`, {
            // headers: headers,
            // params: {
            //     q: query
            // },
        });

        storeTypes.value = await response.data;
    } catch (error) {
        catchToastError("Failed to fetch store types", 3000);

        console.error("Failed to fetch store types", error.message);
    }
}

async function fetchStoreCabangs(query = '') {
    try {
        refreshAccessTokenHandler();

        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Authorization': `Bearer ${tokens.access_token}`,
        }

        const response = await axios.get(`${API_URL.value}/api/v2/store-cabangs`, {
            headers: headers,
            params: {
                q: query
            },
        });

        storeCabangs.value = response.data.resource;
    } catch (error) {
        catchToastError("Failed to fetch store cabangs", 3000);

        console.error(error);
    }
}


onMounted(() => {
    presentLoading();

    refreshAccessTokenHandler();
    fetchStoreTypes();
    fetchStoreCabangs();

    stopLoading();
});
</script>

<style scoped>
.container {
    margin-top: 28%;
    flex-direction: column;
    /* background-color: white; */
    align-items: center;
    padding-left: 0px;
    padding-right: 0px;
}
</style>