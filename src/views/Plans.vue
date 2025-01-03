<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <HeaderSection />
            <div class="container mx-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="p-8 rounded-lg max-w-sm w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">
                            FORM INPUT CALL PLANS
                        </h2>
                        <p class="text-red-600 text-center mb-6">
                            Call Plan ini dibuat per toko setiap tanggal untuk kunjungan
                            salesman berdasarkan frekuensi yang sudah diatur
                        </p>
                        <Form @submit="storeDataAlert" method="post" novalidate :validation-schema="validation">
                            <div class="mb-4">
                                <label for="salesman" class="block text-gray-700 text-sm font-semibold mb-2">Salesman
                                    *</label>
                                <!-- <Field v-model="formData.user_id" :type="hidden" id="salesman"
                                    name="salesman"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                    aria-label="salesman" aria-describedby="salesman" >
                                </Field> -->
                                <Field v-model="formData.fullname" :type="text" :readonly="user_id.user_id != null"
                                    id="salesmanName" name="salesmanName"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                    aria-label="salesmanName" aria-describedby="salesmanName">
                                </Field>
                                <!-- <Field v-model="formData.user_id" as="select" id="salesman" name="salesman"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled selected value="">Pilih Salesman</option>
                                    <option v-for="item in user" :key="item.user_id" :value="item.user_id">
                                        {{ item.fullname }}
                                    </option>
                                </Field> -->
                                <!-- <ErrorMessage name="salesman" class="text-rose-500" /> -->
                            </div>

                            <div class="mb-4">
                                <label for="month" class="block text-gray-700 text-sm font-semibold mb-2">Bulan
                                    *</label>
                                <Field v-model="formData.month_plan" as="select" id="month" name="month"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled selected value="">Pilih Bulan</option>
                                    <option v-for="item in month" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </option>
                                </Field>
                                <ErrorMessage name="month" class="text-rose-500" />
                            </div>

                            <div class="mb-4">
                                <label for="tahun" class="block text-gray-700 text-sm font-semibold mb-2">Tahun*</label>
                                <Field v-model="formData.year_plan" as="select" id="tahun" name="tahun"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled selected value="">Pilih Tahun</option>
                                    <option v-for="item in year" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </option>
                                </Field>
                                <ErrorMessage name="tahun" class="text-rose-500" />
                            </div>

                            <div class="mb-4">
                                <label for="frekuensi" class="block text-gray-700 text-sm font-semibold mb-2">Frekuensi
                                    *</label>
                                <Field v-model="formData.frekuensi" as="select" id="frekuensi" name="frekuensi"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500">
                                    <option disabled selected value="">Pilih Frekuensi</option>
                                    <option v-for="item in frekuensi" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </option>
                                </Field>
                                <ErrorMessage name="frekuensi" class="text-rose-500" />
                            </div>

                            <hr />
                            <h4>Daily Plan</h4>
                            <div class="container" v-for="(item, index) in formData.daily_plan"
                                :key="index < formData.frekuensi">
                                <div class="mb-4 mt-4">
                                    <label for="tanggal" class="block text-gray-700 text-sm font-semibold mb-2"><span>{{
                                        index + 1 }}</span> Tanggal
                                        *</label>
                                    <ion-input type="date" v-model="item.tanggal" name="tanggal" id="tanggal"
                                        class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-red-500"
                                        :min="dateConstraints.minDate" :max="dateConstraints.maxDate"></ion-input>
                                    <!-- <ErrorMessage name="tanggal" class="text-rose-500" /> -->
                                </div>

                                <div class="mb-4 mt-4">
                                    <label for="cabang" class="block text-gray-700 text-sm font-semibold mb-2">Cabang
                                        *</label>
                                    <select
                                        class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                        v-model="item.cabang" name="cabang" id="cabang"
                                        @change="getTokoByCab(item.cabang)">
                                        <option disabled selected value="">Pilih Cabang</option>
                                        <option v-for="cabang in storeCabang" :key="cabang.id" :value="cabang.id">
                                            {{ cabang.nama_cabang }}
                                        </option>
                                    </select>
                                    <!-- <ErrorMessage name="cabang" class="text-rose-500" /> -->
                                </div>

                                <div class="mb-4 mt-4">
                                    <label for="toko" class="block text-gray-700 text-sm font-semibold mb-2">Toko
                                        *</label>
                                    <select v-model="item.toko" id="toko" name="toko"
                                        class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500">
                                        <option disabled selected value="">Pilih Toko</option>
                                        <option v-for="store in storeList" :key="store.store_id"
                                            :value="store.store_id">
                                            {{ store.store_name }}
                                        </option>
                                    </select>
                                    <!-- <ErrorMessage name="toko" class="text-rose-500" /> -->
                                </div>

                                <button type="button" @click="addDailyPlan(index, formData.frekuensi)"
                                    class="mr-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    v-show="index == formData.daily_plan.length - 1">
                                    Add
                                </button>
                                <button type="button" @click="removeDailyPlan(index)"
                                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    v-show="index || (!index && formData.daily_plan.length > 1)">
                                    Delete
                                </button>
                            </div>

                            <br />
                            <button type="submit"
                                class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Submit
                            </button>
                            <p class="text-gray-600 text-xs text-center mt-4">
                                Dengan menekan tombol Submit, maka bisa Menyimpan Call Plans Anda.
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import { API_URL } from "@/services/globalVariables";
import HeaderSection from "@/components/HeaderSection.vue";
import { presentLoading, stopLoading } from "@/services/loadingHandlers";
import { catchToastError, catchToast } from "@/services/toastHandlers";
import { alertController } from "@ionic/vue";
// import * as Yup from "yup";
import { object, string, array } from "yup";
import { IonPage, IonContent, IonInput } from "@ionic/vue";
import { RedirectInputVisitPage, redirectToHomePage } from "@/services/redirectHandlers";

const user = ref([]);
const storeCabang = ref([]);
const storeList = ref([]);
const user_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

// Add dateConstraints reactive reference
const dateConstraints = ref({
    minDate: "",
    maxDate: "",
});

const formData = ref({
    user_id: user_id.user_id,
    fullname: user_id.fullname,
    month_plan: null,
    year_plan: null,
    frekuensi: null,
    created_by: user_id.fullname,
    daily_plan: [
        {
            tanggal: "",
            cabang: "",
            toko: "",
        },
    ],
});
// const requiredTanggal = date.required("Tanggal is required");
// const requiredCbg = string().required("Tanggal is required");
// const requiredTko = string().required("Tanggal is required");

const validation = object().shape({
    // salesman: Yup.string().required("Pilih Salesman Terlebih Dahulu"),
    month: string().required("Bulan Belum Dipilih!"),
    tahun: string().required("Tahun Belum Dipilih!"),
    frekuensi: string().required("Mohon Pilih Frekuensi Terlebih Dahulu!"),

    // cabang: array().of(requiredCbg), //array of booleans
    // toko: array().of(requiredTko),  // array of objects
});

const frekuensi = [
    { value: 8, label: "F8" },
    { value: 6, label: "F6" },
    { value: 4, label: "F4" },
    { value: 2, label: "F2" },
];

const date = new Date().getFullYear();
const year = [
    // { value: date - 2, label: date - 2 },
    // { value: date - 1, label: date - 1 },
    { value: date, label: date },
    { value: date + 1, label: date + 1 },
    { value: date + 2, label: date + 2 },
];

const month = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
];

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const formatDateString = (year, month, day) => {
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
};

watch(
    [() => formData.value.month_plan, () => formData.value.year_plan],
    ([newMonth, newYear]) => {
        if (newMonth && newYear) {
            dateConstraints.value.minDate = formatDateString(newYear, newMonth, 1);

            const lastDay = getDaysInMonth(newYear, newMonth);
            dateConstraints.value.maxDate = formatDateString(newYear, newMonth, lastDay);

            formData.value.daily_plan.forEach((plan) => {
                if (plan.tanggal) {
                    const planDate = new Date(plan.tanggal);
                    if (
                        planDate < new Date(dateConstraints.value.minDate) ||
                        planDate > new Date(dateConstraints.value.maxDate)
                    ) {
                        plan.tanggal = "";
                    }
                }
            });
        }
    },
    { immediate: true }
);

function addDailyPlan(index, frekuensi) {
    if (index + 1 < frekuensi) {
        formData.value.daily_plan.push({
            tanggal: "",
            cabang: "",
            toko: "",
        });
        // catchToastError(frekuensi,3000);
    } else {
        // catchToastError(index, 3000);
        catchToastError("Upps, Frekuensi Belum Dipilih atau Melebihi yang Dipilih!", 3000);
    }
}

function removeDailyPlan(index) {
    formData.value.daily_plan.splice(index, 1);
}

async function storeDataAlert() {
    const alert = await alertController.create({
        header: "Konfirmasin Input Call Plan",
        message: "Apakah Kamu Yakin?",
        buttons: [
            {
                text: "No",
                cssClass: "alert-button-cancel",
                handler: () => {
                    console.log("Pembuatan Call Plan dibatalkan.");
                },
            },
            {
                text: "Yes",
                cssClass: "alert-button-confirm",
                handler: async () => {
                    await saveCallPlan();
                },
            },
        ],
    });

    return alert.present();
}

function clearForm() {
    formData.value = {
        user_id: user_id.user_id,
        fullname: user_id.fullname,
        month_plan: null,
        year_plan: null,
        frekuensi: null,
        daily_plan: [{ tanggal: "", cabang: "", toko: "" }],
    };
    // presentLoading();
    // fetchAllUser();
    fetchStoreCabang();
    // stopLoading();
}

async function saveCallPlan() {
    try {
        presentLoading();
        const tokens = localStorage.getItem("tokens")
            ? JSON.parse(localStorage.getItem("tokens"))
            : null;

        const headers = {
            Authorization: `Bearer ${tokens.access_token}`,
        };

        const response = await axios.post(
            `${API_URL.value}/api/sgs/call-plans`,
            formData.value,
            { headers: headers }
        );

        stopLoading();
        catchToast(response.data.message, 3000);
        clearForm();

    } catch (error) {
        if (error.response && error.response.data.status === 401) {
            catchToastError(error.response.data.message, 3000);
        } else {
            catchToastError(error.response.data.message, 3000);
        }
    } finally {
        stopLoading();
    }
}

async function fetchAllUser() {
    try {
        const tokens = localStorage.getItem("tokens")
            ? JSON.parse(localStorage.getItem("tokens"))
            : null;

        const headers = { Authorization: `Bearer ${tokens.access_token}` };
        const response = await axios.get(`${API_URL.value}/api/v2/salesmen`, {
            headers: headers,
        });

        user.value = response.data.resource;
    } catch (error) {
        catchToastError("Failed to fetch users", 3000);
        console.error("Failed to fetch users", error);
    }
}

async function fetchStoreCabang() {
    try {
        const tokens = localStorage.getItem("tokens")
            ? JSON.parse(localStorage.getItem("tokens"))
            : null;

        const headers = { Authorization: `Bearer ${tokens.access_token}` };
        const response = await axios.get(`${API_URL.value}/api/v2/cabangsByUser/${user_id.user_id}`, {
            // const response = await axios.get(`${API_URL.value}/api/v2/cabangsAll`, {
            headers: headers,
        });

        storeCabang.value = response.data.resource;
    } catch (error) {
        catchToastError(error.response.data.message, 3000);
        console.error(error.response.data.message, error);
    }
}

async function getTokoByCab(idCab) {
    try {
        const tokens = localStorage.getItem("tokens")
            ? JSON.parse(localStorage.getItem("tokens"))
            : null;

        const headers = { Authorization: `Bearer ${tokens.access_token}` };
        const response = await axios.get(`${API_URL.value}/api/v2/distriByCbg/${idCab}`, {
            headers: headers,
        });

        storeList.value = response.data.resource;
    } catch (error) {
        catchToastError(error.response.data.message, 3000);
        formData.toko = null
    }
}

onMounted(() => {
    presentLoading();
    // fetchAllUser();
    fetchStoreCabang();
    stopLoading();
});
</script>

<style scoped></style>