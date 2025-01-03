<script setup>
import HeaderSection from "@/components/HeaderSection.vue";
import {
  objOrder,
  nomorWhatsappOTP,
  firstOTPNumber,
  secondOTPNumber,
  thirdOTPNumber,
  fourthOTPNumber,
  selectedProduct,
  currentRoute,
} from "@/services/globalVariables";
import axios from "axios";

import {
  redirectToStorePurchaseOrderPage,
  redirectToAbsensiPage,
  redirectToPurchaseOrderPage,
  DetailOrder,
  DaftarPo,
  DetailBeforeOrder,
} from "@/services/redirectHandlers";
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import {
  catchToast,
  catchToastError,
  catchToastInfo,
} from "@/services/toastHandlers";
import { refreshAccessTokenHandler } from "@/services/auth.js";
import { API_URL } from "@/services/globalVariables";
const route = useRoute();
const metodePembayaran = ref("Tunai");
const storeId = ref(route.params.storeId);
const flagOTP = ref(true);
const isOpen = ref(false);
const setOpen = (open) => ((isOpen.value = open), (flagOTP.value = true));
const resendNomorPO = ref(null);
const resendOTP = ref(null);
// const storeId = ref(route.params.id);

// State untuk menyimpan data order
const orderData = ref({
  orderDetail: [], // Menyimpan detail order
});

async function sendOTP(nomorWhatsappOTP) {
  let a = false;
  Object.keys(objOrder.value).forEach((key) => {
    const value = objOrder.value[key];
    if (value.qty == 0) {
      catchToastError(
        "Simpan PO gagal dikarenakan quantity order tidak boleh 0, mohon cek kembali",
        3000
      );
      a = true;
      return false;
    }
  });

  if (a) return false;

  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
    };
    const path = window.location.pathname;

    // Split the path into segments
    const segments = path.split("/");

    // console.log('Store ID:', storeId);
    // Call the backend API to decrease stock

    const response = await axios.post(
      `${API_URL.value}/api/v2/stores/send-otp`,
      {
        nomorWhatsappOTP: nomorWhatsappOTP,
        objOrder: objOrder.value,
        idToko: localStorage.getItem("storeId"),
        metodePembayaran: metodePembayaran.value,
        userNumber: user.number,
      },
      {
        headers: headers,
      }
    );

    flagOTP.value = false;
    console.log(response.data.resource);

    sendOTPIntoWhatsapp(
      response.data.resource.nomor_po,
      response.data.resource.otp,
      nomorWhatsappOTP
    );
    // const response_otp = await axios.post(`${API_URL.value}/api/send-whatsapp`, {
    // 	"to": "+6285217158975",
    // 	"message": `INI ADALAH KODE OTP! ${response.data.resource.otp}`
    // });
    // console.log(response_otp)
    resendNomorPO.value = response.data.resource.nomor_po;
    resendOTP.value = response.data.resource.otp;
  } catch (error) {
    catchToastError("Gagal", 3000);
    console.error(error, error);
  }
}

// Fungsi untuk mengambil data detail order
const getDetail = async () => {
  console.log("====================================", objOrder);
  try {
    const responses = [];
    for (let index = 0; index < objOrder.value.length; index++) {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/sgs/product_info_do_2/${objOrder.value[index].prodNumber}`
      );
      data.resource.qty = objOrder.value[index].qty;
      responses.push(data.resource);
    }
    // Simpan data hasil looping ke state orderData
    orderData.value.orderDetail = responses;
    console.log("Order Details:", orderData.value.orderDetail);
  } catch (error) {
    console.error("Error fetching order detail:", error.message);
  }
};

async function simpanPO() {
  let a = false;
  Object.keys(objOrder.value).forEach((key) => {
    const value = objOrder.value[key];
    if (value.qty == 0) {
      catchToastError(
        "Simpan PO gagal dikarenakan quantity order tidak boleh 0, mohon cek kembali",
        3000
      );
      a = true;
      return false;
    }
  });

  if (a) return false;

  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
    };
    const path = window.location.pathname;

    // Split the path into segments
    const segments = path.split("/");

    // console.log("Store ID:", storeId);
    // Call the backend API to decrease stock

    const response = await axios.post(
      `${API_URL.value}/api/v2/stores/send-otp`,
      {
        nomorWhatsappOTP: null,
        objOrder: objOrder.value,
        idToko: localStorage.getItem("storeId"),
        metodePembayaran: metodePembayaran.value,
        userNumber: user.number,
      },
      {
        headers: headers,
      }
    );

    flagOTP.value = false;
    console.log(response.data.resource);
    // DetailOrder();
    DaftarPo();
    // sendOTPIntoWhatsapp(
    // 	response.data.resource.nomor_po,
    // 	response.data.resource.otp,
    // 	nomorWhatsappOTP,
    // );
    // const response_otp = await axios.post(`${API_URL.value}/api/send-whatsapp`, {
    // 	"to": "+6285217158975",
    // 	"message": `INI ADALAH KODE OTP! ${response.data.resource.otp}`
    // });
    // console.log(response_otp)
    // resendNomorPO.value = response.data.resource.nomor_po;
    // resendOTP.value = response.data.resource.otp;
  } catch (error) {
    catchToastError("Gagal", 3000);
    console.error(error, error);
  }
}

// Format angka ke mata uang IDR
const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

// Lifecycle Hook
onMounted(getDetail);

// Format angka desimal
const formatDecimal = (value) => parseFloat(value).toFixed(2);

// Total setelah diskon reguler (20%) dan sebelum pengurangan 11%
const totalAfterDiscount = computed(() => {
  if (!orderData.value || !orderData.value.orderDetail) return 0;

  const total = orderData.value.orderDetail.reduce((sum, detail) => {
    const subtotal =
      detail.qty * parseFloat(detail.prod_unit_price) * (1 - 0.2); // Diskon reguler 20%
    return sum + subtotal;
  }, 0);

  return total; // Total setelah diskon reguler 20%
});

// Grand Total setelah 11% pengurangan
const grandTotal = computed(() => {
  const total = totalAfterDiscount.value;
  return total + total * 0.11; // Mengurangi 11%
});

async function confirmOTP() {
  if (
    firstOTPNumber.value == null ||
    secondOTPNumber.value == null ||
    thirdOTPNumber.value == null ||
    fourthOTPNumber.value == null
  ) {
    alert("Kode OTP tidak boleh kosong");
    return false;
  }

  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null;

    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const response = await axios.post(
      `${API_URL.value}/api/v2/stores/confirm-otp`,
      {
        nomorPO: resendNomorPO.value,
        inputOtp:
          firstOTPNumber.value +
          secondOTPNumber.value +
          thirdOTPNumber.value +
          fourthOTPNumber.value,
      },
      {
        headers: headers,
      }
    );

    catchToast(response.data.message, 3000);

    objOrder.value = [];

    isOpen.value = false;

    // redirectToAbsensiPage();
    DaftarPo();
  } catch (error) {
    catchToastError("Kode OTP salah", 3000);

    console.error("Kode OTP salah", error);
  }
}

async function sendOTPIntoWhatsapp(nomorPO, otp, nomorWhatsappOTP) {
  const fonteUniqueToken = "Up#YVpLNfcEkqw3PCpBH";
  // const fonteUniqueToken = "!GQUJzvQaWe#QqxpC#@1";

  try {
    refreshAccessTokenHandler();

    let formData = new FormData();
    formData.append("target", nomorWhatsappOTP);
    formData.append(
      "message",
      `Kode OTP untuk nomor PO ${nomorPO} Anda adalah ${otp}`
    );
    formData.append("countryCode", "62");

    const headers = {
      Authorization: fonteUniqueToken,
    };

    await axios.post("https://api.fonnte.com/send", formData, {
      headers: headers,
    });

    catchToast("OTP berhasil terkirim", 3000);
  } catch (error) {
    catchToastError("OTP gagal terkirim", 3000);

    console.error("OTP gagal terkirim", error);
  }
}

async function simpandraft(){
  const usernew=localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  const response = await axios.post(`${API_URL.value}/api/v2/stores/save-draft`, {
			"objOrder": objOrder.value,
			"idToko":  localStorage.getItem("storeId"),
			"metodePembayaran": metodePembayaran.value,
			"userNumber" : usernew.numbe,
		} );
    DaftarPo();
}

// Total keseluruhan
// const grandTotal = computed(() => {
//   if (!orderData.value || !orderData.value.orderDetail) return 0;

//   const total = orderData.value.orderDetail.reduce((sum, detail) => {
//     const subtotal = detail.qty * parseInt(detail.prod_unit_price, 10);
//     return sum + subtotal;
//   }, 0);

//   return total;
// });
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>OTP Whatsapp</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div
            v-if="flagOTP"
            class="relative flex min-h-screen flex-col justify-center overflow-hidden"
          >
            <div
              class="relative bg-white px-6 mx-auto w-full max-w-lg rounded-2xl"
            >
              <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div
                  class="flex flex-col items-center justify-center text-center space-y-2"
                >
                  <img
                    src="/public/3d-mobile-phone-with-security-code-padlock.jpg"
                    alt="OTP Images"
                  />
                  <div class="font-semibold text-3xl">
                    <p>Kirim OTP Whatsapp</p>
                  </div>
                  <div class="flex flex-row text-sm font-medium text-gray-400">
                    <p>
                      Kami akan mengirimkan kode OTP ke nomor <br />{{
                        nomorWhatsappOTP
                      }}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col space-y-5">
                  <div>
                    <button
                      @click="sendOTP(nomorWhatsappOTP)"
                      class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Kirim OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="!flagOTP"
            class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12"
          >
            <div
              class="relative bg-white px-6 py-8 mx-auto w-full max-w-lg rounded-2xl"
            >
              <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div
                  class="flex flex-col items-center justify-center text-center space-y-2"
                >
                  <div class="font-semibold text-3xl">
                    <p>Verifikasi OTP Whatsapp</p>
                  </div>
                  <div class="flex flex-row text-sm font-medium text-gray-400">
                    <p>
                      Kami telah mengirim kode OTP ke nomor
                      {{ nomorWhatsappOTP }}
                    </p>
                  </div>
                </div>

                <div>
                  <div class="flex flex-col space-y-16">
                    <div
                      class="flex flex-row items-center justify-between mx-auto w-full max-w-xs"
                    >
                      <div class="w-16 h-16">
                        <input
                          v-model="firstOTPNumber"
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          maxlength="1"
                        />
                      </div>
                      <div class="w-16 h-16">
                        <input
                          v-model="secondOTPNumber"
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          maxlength="1"
                        />
                      </div>
                      <div class="w-16 h-16">
                        <input
                          v-model="thirdOTPNumber"
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          maxlength="1"
                        />
                      </div>
                      <div class="w-16 h-16">
                        <input
                          v-model="fourthOTPNumber"
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          maxlength="1"
                        />
                      </div>
                    </div>

                    <div class="flex flex-col space-y-5">
                      <div>
                        <button
                          @click="confirmOTP"
                          class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        >
                          Verifikasi OTP
                        </button>
                      </div>

                      <div
                        class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500"
                      >
                        <p>Tidak menerima kode OTP?</p>
                        <a
                          class="flex flex-row items-center text-blue-600"
                          href="javascript:void(0)"
                          @click="resendOTPHandler"
                          rel="noopener noreferrer"
                          >Resend</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ion-content>
      </ion-modal>
      <!-- Header -->
      <HeaderSection />
      <div class="text-center">
        <ion-card-header class="text-md text-gray-900 font-bold pb-2">
          <h1>Detail Order</h1>
        </ion-card-header>
      </div>

      <!-- Detail Order -->
      <div class="container mx-auto">
        <div v-if="orderData.orderDetail.length" class="p-4">
          <ion-card>
            <ion-card-content>
              <div style="max-width: 100%; overflow-x: auto">
                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 600px;
                  "
                >
                  <!-- <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Produk</th>
                      <th>Harga Satuan</th>
                      <th>Diskon Reg</th>
                      <th>Qty</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead> -->
                  <tbody>
                    <tr
                      v-for="(detail, index) in orderData.orderDetail"
                      :key="index"
                    >
                      <td style="padding: 10px">{{ index + 1 }}</td>
                      <td style="padding: 10px">{{ detail.prod_name }}</td>
                      <td style="padding: 10px">
                        {{ formatCurrency(detail.prod_unit_price) }}
                      </td>
                      <td style="padding: 10px">20%</td>
                      <td style="padding: 10px">{{ detail.qty }}</td>
                      <td style="padding: 10px">
                        {{
                          formatCurrency(
                            detail.qty * detail.prod_unit_price * (1 - 0.2)
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colspan="5"
                        style="
                          padding: 10px;
                          text-align: right;
                          font-weight: bold;
                        "
                      >
                        Grand Total :
                      </td>
                      <td
                        style="
                          padding: 10px;
                          text-align: right;
                          font-weight: bold;
                        "
                      >
                        {{ formatCurrency(totalAfterDiscount) }}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="5"
                        style="
                          padding: 10px;
                          text-align: right;
                          font-weight: bold;
                        "
                      >
                        Total (After 11% Reduction):
                      </td>
                      <td
                        style="
                          padding: 10px;
                          text-align: right;
                          font-weight: bold;
                        "
                      >
                        {{ formatCurrency(grandTotal) }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- Konfirmasi OTP -->
          <div style="display: flex; justify-content: center; margin-top: 16px">
            <ion-button
              style="width: auto; padding: 0 5px"
              @click="simpandraft()"
            >
              Simpan Sebagai Draft
            </ion-button>
          </div>
        </div>
        <div v-else>
          <p class="text-center text-gray-500">Loading data detail order...</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-col {
  background-color: rgb(244, 248, 255);
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>
