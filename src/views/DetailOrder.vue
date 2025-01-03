<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header -->
      <HeaderSection />
      <div class="text-center">
        <ion-card-header class="text-md text-gray-900 font-bold pb-2">
          <h1>Detail Order</h1>
        </ion-card-header>
      </div>

      <!-- Detail Order -->
      <div class="container mx-auto">
        <div
          v-if="orderData?.order && orderData?.orderDetail.length"
          class="p-4"
        >
          <ion-card>
            <ion-card-header>
              <ion-card-title class="text-xl font-bold">
                {{ orderData.order.uploaded_by }}
                <br />
                No Order: {{ orderData.order.no_order }}
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <dl>Tgl Order: {{ orderData.order.tgl_order }}</dl>
              <dl>Qty Order: {{ orderData.order.totOrderQty }}</dl>
              <dl>Release Order: {{ orderData.order.totReleaseQty }}</dl>
              <dl>
                Status Order:
                {{
                  orderData.order.status_id == 0
                    ? "Draft"
                    : orderData.order.status_id == 1
                    ? "Confirm"
                    : "Approve"
                }}
              </dl>
              <br />
              <div style="max-width: 100%; overflow-x: auto">
                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 600px;
                  "
                >
                  <tbody>
                    <template
                      v-for="(detail, index) in orderData.orderDetail"
                      :key="detail?.id || index"
                    >
                      <!-- Baris Produk -->
                      <tr
                        :style="{
                          backgroundColor:
                            index % 2 === 0 ? '#f9f9f9' : '#eaeaea',
                        }"
                      >
                        <td colspan="3" style="padding: 10px">
                          <span style="color: gray; font-size: 12px">
                            {{ detail.prod_name }}
                          </span>
                          <span
                            style="
                              color: green;
                              font-size: 12px;
                              margin-left: 5px;
                            "
                          >
                            ({{ detail.prod_special_offer }}%)
                          </span>
                        </td>
                      </tr>

                      <!-- Baris Detail -->
                      <tr
                        :style="{
                          backgroundColor:
                            index % 2 === 0 ? '#f9f9f9' : '#eaeaea',
                        }"
                      >
                        <td style="padding: 10px">
                          <span style="color: gray; font-size: 12px">{{
                            detail.itemCode
                          }}</span
                          ><br />
                          {{ detail.qtyOrder }}
                        </td>

                        <td tyle="padding: 10px">
                          <span style="color: gray; font-size: 12px">{{
                            formatCurrency(detail.prod_unit_price)
                          }}</span
                          ><br />
                          <span style="color: gray; font-size: 12px"
                            ></span
                          >
                          <span>
                            {{
                              formatCurrency(
                                calculateDiscountedPrice(
                                  detail.qtyOrder,
                                  detail.prod_unit_price,
                                  detail.prod_special_offer
                                )
                              )
                            }}
                          </span>
                        </td>

                        <td style="padding: 10px; text-align: center">
                          <ion-button
                            v-if="
                              orderData.order.status_id == 0 ||
                              orderData.order.status_id == 1
                            "
                            color="primary"
                            @click="openEditModal(detail)"
                            >Edit</ion-button
                          >
                        </td>
                      </tr>
                    </template>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td
                        style="
                          padding: 10px;
                          text-align: right;
                          font-weight: bold;
                        "
                      >
                        GrandTotal:
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
                    <tr>
                      <td
                        style="
                          padding: 10px;
                          text-align: right;
                          font-weight: bold;
                        "
                      >
                        Total (after 11% reduction):
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
                  </tfoot>
                </table>
              </div>
            </ion-card-content>
            <ion-card>
              <div
                style="display: flex; justify-content: center; margin-top: 16px"
              >
                <ion-button
                  v-if="orderData.order.status_id == 0"
                  style="width: auto; padding: 0 5px"
                  @click="setOpen(true)"
                >
                  Konfirmasi OTP
                </ion-button>
                <ion-button
                  v-if="orderData.order.status_id === 1 && ![1, 8, 9, 15].includes(userRoleId)"
                  @click="openConfirmAlert(orderData.order)"
                >
                  Approve PO
                </ion-button>
              </div>
            </ion-card>
          </ion-card>
          <div></div>
        </div>
        <div v-else>
          <p class="text-center text-gray-500">Loading data detail order...</p>
        </div>
      </div>

      <!-- Modal Edit Detail -->
      <ion-modal :is-open="isEditModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Edit Detail</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeEditModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <!-- Product Name (Read-only) -->
          <ion-item>
            <ion-label position="stacked">Product Name</ion-label>
            <ion-input v-model="editDetail.prod_name" readonly></ion-input>
          </ion-item>

          <!-- Unit Price (Read-only) -->
          <ion-item>
            <ion-label position="stacked">Unit Price</ion-label>
            <ion-input
              type="number"
              v-model="editDetail.prod_unit_price"
              readonly
            ></ion-input>
          </ion-item>

          <!-- Quantity (Editable) -->
          <ion-item>
            <ion-label position="stacked">Quantity</ion-label>
            <ion-input type="number" v-model="editDetail.qtyOrder"></ion-input>
          </ion-item>

          <!-- Update Button -->
          <ion-button expand="block" color="success" @click="updateDetail"
            >Update</ion-button
          >
        </ion-content>
      </ion-modal>

      <!-- Ion Modal for OTP -->
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
    </ion-content>
  </ion-page>
</template>

<script setup>
import HeaderSection from "@/components/HeaderSection.vue";
import { API_URL, objOrder } from "@/services/globalVariables";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { catchToast, catchToastError } from "@/services/toastHandlers";
import { useRoute } from "vue-router";
import { refreshAccessTokenHandler } from "@/services/auth.js";
import {
  firstOTPNumber,
  secondOTPNumber,
  thirdOTPNumber,
  fourthOTPNumber,
  selectedProduct,
  currentRoute,
} from "@/services/globalVariables";
import { alertController } from "@ionic/vue";

import { DaftarPo } from "@/services/redirectHandlers";

// const userRoleId = 3; // Misal: ambil dari API atau state login pengguna
// State untuk menyimpan data order

const orderData = ref({
  order: null,
  orderDetail: [],
});

// State Modal OTP
const isOpen = ref(false);
const flagOTP = ref(true);
const nomorWhatsappOTP = ref(""); // Nomor tujuan OTP
const resendNomorPO = ref(null);
const resendOTP = ref(null);

const isEditModalOpen = ref(false);
const editDetail = ref({});
const newStatusId = ref(null);
const selectedOrder = ref(null);

const metodePembayaran = ref("");

// Fungsi untuk membuka/menutup modal
const setOpen = (open) => ((isOpen.value = open), (flagOTP.value = true));

const formatDecimal = (value) => Math.round(value);

// Membuka modal edit
const openEditModal = (detail) => {
  editDetail.value = { ...detail };
  isEditModalOpen.value = true;
};

// Menutup modal edit
const closeEditModal = () => {
  isEditModalOpen.value = false;
  editDetail.value = {};
};

// Mengupdate data
// Mengupdate data
const updateDetail = async () => {
  try {
    const idDetail = editDetail.value.id;
    await axios.put(
      `${API_URL.value}/api/v2/updateDetail/${idDetail}`,
      editDetail.value
    );
    catchToast("Detail berhasil diupdate", 3000);

    // Cari item yang diupdate dan perbarui di state lokal
    const index = orderData.value.orderDetail.findIndex(
      (d) => d.id === editDetail.value.id
    );
    if (index !== -1) {
      orderData.value.orderDetail[index].qtyOrder = editDetail.value.qtyOrder;
    }

    updateTotalQuantity(); // Perbarui total Qty Order
    closeEditModal();
  } catch (error) {
    console.error("Gagal update detail:", error.message);
    catchToastError("Gagal mengupdate detail", 3000);
  }
};

// Fungsi untuk mengambil data detail order
const getDetail = async () => {
  try {
    const idDetail = localStorage.getItem("orderId");
    if (!idDetail) {
      catchToastError("Order ID tidak ditemukan di localStorage", 3000);
      return;
    }

    const { data } = await axios.get(
      `${API_URL.value}/api/v2/detailOrder/${idDetail}`
    );
    orderData.value = data.resource;

    console.log("Fetched order data:", orderData.value); // Debugging

    metodePembayaran.value = orderData.value.order.keterangan;
    nomorWhatsappOTP.value = orderData.value.order.store_phone;
    objOrder.value = orderData.value.orderDetail;
  } catch (error) {
    console.error("Error fetching order detail:", error.message);
    catchToastError("Gagal memuat detail order", 3000);
  }
};

// Fungsi untuk mengirim OTP melalui WhatsApp
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
        idToko: orderData.value.order.store_id,
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
        nomorWhatsappOTP: nomerWA,
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

// Fungsi untuk menangani konfirmasi OTP
// const handleConfirmOTP = () => {
//   setOpen(true); // Membuka modal
// };

// Total setelah diskon
// const totalAfterDiscount = computed(() => {
//   if (!orderData.value.orderDetail.length) return 0;
//   const total = orderData.value.orderDetail.reduce((sum, detail) => {
//     return sum + detail.qtyOrder * parseFloat(detail.prod_unit_price);
//   }, 0);
//   return total + total * 0.11; // Diskon 11%
// });

// Grand total
// const grandTotal = computed(() => {
//   if (!orderData.value.orderDetail.length) return 0;
//   return orderData.value.orderDetail.reduce((sum, detail) => {
//     return sum + detail.qtyOrder * parseFloat(detail.prod_unit_price);
//   }, 0);
// });

// Fungsi untuk menghitung total dengan diskon
// Fungsi untuk menghitung total dengan diskon
const calculateDiscountedPrice = (qty, unitPrice, discountPercentage) => {
  const discount = (discountPercentage / 100) * unitPrice;
  return qty * (unitPrice - discount);
};

// Grand total setelah diskon diterapkan ke semua item
const grandTotal = computed(() => {
  if (!orderData.value.orderDetail.length) return 0;
  return orderData.value.orderDetail.reduce((sum, detail) => {
    const discountPercentage = parseFloat(detail.prod_special_offer) || 0;
    return (
      sum +
      calculateDiscountedPrice(
        detail.qtyOrder,
        detail.prod_unit_price,
        discountPercentage
      )
    );
  }, 0);
});

// Total setelah pengurangan tambahan 11% dari GrandTotal
const totalAfterDiscount = computed(() => {
  const grandTotalValue = grandTotal.value;
  return grandTotalValue + grandTotalValue * 0.11; // Kurangi 11% dari GrandTotal
});

// Fungsi format mata uang
const formatCurrency = (value) => {
  // Format angka tanpa desimal
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Tidak ada desimal
    maximumFractionDigits: 0, // Tidak ada desimal
  }).format(value);
};

// Fungsi format angka desimal
// const formatDecimal = (value) => parseFloat(value).toFixed(2);

// Fungsi untuk menghitung ulang total Qty Order
const updateTotalQuantity = () => {
  orderData.value.order.totOrderQty = orderData.value.orderDetail.reduce(
    (sum, detail) => sum + parseInt(detail.qtyOrder),
    0
  );
};

const getStatusText = (statusId) => {
  switch (statusId) {
    case 0:
      return "Draft";
    case 1:
      // return "Deliv - Sent to SPV";
      return "Delivery By Salesman";
    case 2:
      // return "Confirm - Ready for Approval";
      return "Approved By SPV";
    case 3:
      // return "Approve - Approved by Finance";
      return "Approved By Finance";
    default:
      return "Unknown";
  }
};

const getStatusColor = (statusId) => {
  switch (statusId) {
    case 0:
      return "warning";
    case 1:
      return "primary";
    case 2:
      return "tertiary";
    case 3:
      return "success";
    default:
      return "medium";
  }
};

const confirmChangeStatus = async () => {
  try {
    if (!selectedOrder.value || !selectedOrder.value.id) {
      alert("Order data is missing or invalid!");
      return;
    }

    console.log("Sending request to API with ID:", selectedOrder.value.id);

    await axios.put(
      `${API_URL.value}/api/sgs/orders/${selectedOrder.value.id}/confirm`,
      { status_id: newStatusId.value }
    );

    selectedOrder.value.status_id = newStatusId.value;
    alert("Order status updated successfully!");

    // Navigasi ke halaman sebelumnya
    router.back(); // Atau gunakan router.push("/orders");
  } catch (error) {
    console.error("Error updating status:", error.response || error);
    alert("Failed to update order status.");
  }
};

const changeStatus = async (order) => {
  let newStatusId = order.status_id;
  if (order.status_id === 0) {
    newStatusId = 1;
  } else if (order.status_id === 1) {
    newStatusId = 2;
  } else if (order.status_id === 2) {
    newStatusId = 3;
  }

  try {
    await axios.put(`${API_URL.value}/api/sgs/orders/${order.id}/confirm`, {
      status_id: newStatusId,
    });
    order.status_id = newStatusId;
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const openConfirmAlert = async (order) => {
  // Tentukan status baru berdasarkan status saat ini
  newStatusId.value = order.status_id === 0 ? 1 : order.status_id === 1 ? 2 : 3;
  selectedOrder.value = order;

  // Tampilkan alert konfirmasi
  const alert = await alertController.create({
    header: "Konfirmasi Status",
    message: `Anda akan mengubah status order ke: ${getStatusText(
      newStatusId.value
    )}. Lanjutkan?`,
    buttons: [
      {
        text: "Batal",
        role: "cancel",
      },
      {
        text: "Lanjutkan",
        handler: () => confirmChangeStatus(),
      },
    ],
  });

  await alert.present();
};


// Lifecycle Hook
onMounted(() => {
  getDetail().then(updateTotalQuantity);
  // Pastikan total Quantity dihitung saat data diambil

});
</script>

<style scoped>
ion-col {
  background-color: rgb(244, 248, 255);
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
/* .geser{
  overflow: hidden;
} */
</style>
