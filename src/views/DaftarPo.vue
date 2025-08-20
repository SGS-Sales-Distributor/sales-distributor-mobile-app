<template>
  <ion-page>
    <ion-content>
      <HeaderSection />
      <div>
        <ion-card-header class="text-md text-gray-900 font-bold pb-2 text-center">
          <h1>Daftar PO</h1>
        </ion-card-header>
      </div>

      <!-- Filter Date Range -->
      <div>
        <ion-card>
          <ion-card-content>
            <label for="dari">Dari Tanggal :</label>
            <ion-input type="date" v-model="dariTanggal" name="dariTanggal" id="dariTanggal"></ion-input>
            <label for="sampai">Sampai Tanggal :</label>
            <ion-input type="date" v-model="sampaiTanggal" name="sampaiTanggal" id="sampaiTanggal"></ion-input>
            <button type="button" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" @click="fetchOrders">
              Lihat
            </button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- PO List with Edit and Delete Buttons -->
      <div v-for="(order, index) in filteredOrders" :key="index" class="relative overflow-x-auto">
        <ion-card class="py-2 odd:bg-blue-500 even:bg-sky-400">
          <ion-card-header class="bg-gray-50">
            <div class="flex flex-col w-full h-full space-y-2">
              <div class="flex flex-row w-full justify-between space-x-2">
                <label class="flex-initial w-56 font-semibold">Nama Toko</label>
                <p class="flex-initial w-44 text-right">
                  {{ order.store.store_name }}
                </p>
              </div>
              <div class="flex flex-row w-full justify-between space-x-2">
                <label class="flex-initial w-56 font-semibold">Nomor Order</label>
                <p class="flex-initial w-44 text-right">{{ order.no_order }}</p>
              </div>
              <div class="flex flex-row w-full justify-between space-x-2">
                <label class="flex-initial w-56 font-semibold">Tanggal Order</label>
                <p class="flex-initial w-44 text-right">
                  {{ new Date(order.tgl_order).toLocaleDateString("id-ID") }}
                </p>
              </div>
              <div class="flex flex-row w-full justify-between space-x-2">
                <label class="flex-initial w-56 font-semibold">Status Order</label>
                <ion-badge :color="getStatusColor(order.status_id)">{{
                  getStatusText(order.status_id)
                }}</ion-badge>
              </div>
              <div class="flex justify-end space-x-4 mt-2" v-if="order.status_id == 0">
                <ion-button expand="block" @click="
                  () => {
                    getDetOrder(order.id);
                  }
                ">Detail Order</ion-button>
                <ion-button expand="block" color="success" @click="
                  setId(order.id),
                  setObjOrder(order.details),
                  setWhatsapp(order.store),
                  setOpen(true)
                  ">
                  Konfirmasi OTP
                </ion-button>

                <ion-button expand="block" color="danger" @click="softDeleteOrder(order.id)">
                  Batal
                </ion-button>

                <!-- <ion-button color="danger" @click="deleteDataAlert(order.id)">Delete</ion-button> -->
              </div>
              <div class="flex justify-end space-x-4 mt-2" v-else-if="
                order.status_id == 1 &&
                getusers.jabatan_id !=
                15 /*|| getusers.jabatan_id != 1 || getusers.jabatan_id != 8 || getusers.jabatan_id != 9*/
              ">
                <ion-button expand="block" @click="
                  () => {
                    getDetOrder(order.id);
                  }
                ">Detail Order</ion-button>
                <ion-button expand="block" @click="openConfirmAlert(order)">Approve PO</ion-button>
              </div>
              <div class="flex justify-end space-x-4 mt-2" v-else>
                <ion-button expand="block" @click="
                  () => {
                    getDetOrder(order.id);
                  }
                ">Detail Order</ion-button>
              </div>
            </div>
          </ion-card-header>
        </ion-card>
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
            <div v-if="flagOTP" class="relative flex min-h-screen flex-col justify-center overflow-hidden">
              <div class="relative bg-white px-6 mx-auto w-full max-w-lg rounded-2xl">
                <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                  <div class="flex flex-col items-center justify-center text-center space-y-2">
                    <img src="/public/3d-mobile-phone-with-security-code-padlock.jpg" alt="OTP Images" />
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
                      <button @click="sendOtp(nomorWhatsappOTP)"
                        class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Kirim OTP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!flagOTP"
              class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
              <div class="relative bg-white px-6 py-8 mx-auto w-full max-w-lg rounded-2xl">
                <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                  <div class="flex flex-col items-center justify-center text-center space-y-2">
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
                      <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div class="w-16 h-16">
                          <input v-model="firstOTPNumber"
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text" name="" id="" maxlength="1" />
                        </div>
                        <div class="w-16 h-16">
                          <input v-model="secondOTPNumber"
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text" name="" id="" maxlength="1" />
                        </div>
                        <div class="w-16 h-16">
                          <input v-model="thirdOTPNumber"
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text" name="" id="" maxlength="1" />
                        </div>
                        <div class="w-16 h-16">
                          <input v-model="fourthOTPNumber"
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text" name="" id="" maxlength="1" />
                        </div>
                      </div>

                      <div class="flex flex-col space-y-5">
                        <div>
                          <button @click="confirmOTP"
                            class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                            Verifikasi OTP
                          </button>
                        </div>

                        <div
                          class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                          <p>Tidak menerima kode OTP?</p>
                          <a class="flex flex-row items-center text-blue-600" href="javascript:void(0)"
                            @click="resendOTPHandler" rel="noopener noreferrer">Resend</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
              <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
          </ion-content>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { alertController } from "@ionic/vue";
import HeaderSection from "@/components/HeaderSection.vue";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonInput,
  IonPage,
  IonRefresher,
  IonRefresherContent
} from "@ionic/vue";
import { presentLoading, stopLoading } from "@/services/loadingHandlers";
import { useRoute } from "vue-router";
import {
  API_URL,
  nomorWhatsappOTP,
  firstOTPNumber,
  secondOTPNumber,
  thirdOTPNumber,
  fourthOTPNumber,
  selectedProduct,
  currentRoute,
} from "@/services/globalVariables";
import { refreshAccessTokenHandler } from "@/services/auth";
import { DetailOrder, DaftarPo } from "@/services/redirectHandlers";
import {
  catchToast,
  catchToastError,
  catchToastInfo,
} from "@/services/toastHandlers";


export default {
  name: "DaftarPo",
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonInput,
    IonPage,
    HeaderSection,
  },
  setup() {
    const route = useRoute(); // Use route to get store ID from URL params if available
    const orders = ref([]);
    const firstDay =
      new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + "01";
    const today =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    const dariTanggal = ref(firstDay);
    const sampaiTanggal = ref(today);
    // const storeId = route.params.id; // Assuming storeId comes from route parameter

    const newStatusId = ref(null);
    const selectedOrder = ref(null);
    const showAlert = ref(false);



    const objOrder = ref([]);
    const orderId = ref(null);
    const store_id = ref(null);
    const resendNomorPO = ref(null);
    const resendOTP = ref(null);
    const flagOTP = ref(true);


    const isOpen = ref(false);
    const setOpen = (open) => ((isOpen.value = open), (flagOTP.value = true));

    const getusers = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    const fetchOrders = async () => {
      try {
        presentLoading();
        // Use template literals to insert sto reId into the URL
        // const response = await axios.get(`/api/v2/stores/${storeId}/orders`, {
        const response = await axios.get(
          `${API_URL.value}/api/sgs/orders-by-date-range`,
          {
            params: {
              dariTanggal: dariTanggal.value,
              sampaiTanggal: sampaiTanggal.value,
            },
          }
        );
        orders.value = response.data.data.data || []; // Ensure orders is an array
        console.log(response.data.data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        stopLoading();
      }
    };

    const filteredOrders = computed(() => {
      if (!dariTanggal.value || !sampaiTanggal.value) return orders.value;
      const start = new Date(dariTanggal.value);
      const end = new Date(sampaiTanggal.value);
      return orders.value.filter((order) => {
        const orderDate = new Date(order.tgl_order);
        return orderDate >= start && orderDate <= end;
      });
    });

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

    const openConfirmAlert = async (order) => {
      // Tentukan status baru berdasarkan status saat ini
      newStatusId.value =
        order.status_id === 0 ? 1 : order.status_id === 1 ? 2 : 3;
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

    const confirmChangeStatus = async () => {
      try {
        await axios.put(
          `${API_URL.value}/api/sgs/orders/${selectedOrder.value.id}/confirm`,
          { status_id: newStatusId.value }
        );
        selectedOrder.value.status_id = newStatusId.value;
        alert("Order status updated successfully!");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to update order status.");
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

    const deleteDataAlert = async (id) => {
      if (confirm("Are you sure you want to delete this order?")) {
        try {
          await axios.delete(`/api/sgs/order_customer_sales/${id}`);
          orders.value = orders.value.filter((order) => order.id !== id);
        } catch (error) {
          console.error("Failed to delete order:", error);
        }
      }
    };

    const confOtp = async (nomerWA, idOrde, no_order) => {
      console.log(nomerWA, idOrde, no_order);
      const fonteUniqueToken = "Up#YVpLNfcEkqw3PCpBH";
      // const fonteUniqueToken = "!GQUJzvQaWe#QqxpC#@1";

      try {
        refreshAccessTokenHandler();

        let formData = new FormData();
        formData.append("target", nomerWA);
        formData.append(
          "message",
          `Kode OTP untuk nomor PO ${no_order} Anda adalah ${otp}`
        );
        formData.append("countryCode", "62");

        const headers = {
          Authorization: fonteUniqueToken,
        };

        const response = await axios.post(
          `${API_URL.value}/api/v2/stores/kirimOTP`,
          {
            nomorWhatsappOTP: nomerWA,
            id_table: idOrde,
            // idToko: segments[segments.length - 1],
            // metodePembayaran: metodePembayaran.value,
            // userNumber: user.number,
          },
          {
            headers: headers,
          }
        );

        flagOTP.value = false;
        console.log(response.data.resource);

        await axios.post("https://api.fonnte.com/send", formData, {
          headers: headers,
        });

        catchToast("OTP berhasil terkirim", 3000);
      } catch (error) {
        catchToastError("OTP gagal terkirim", 3000);

        console.error("OTP gagal terkirim", error);
      }
    };

    const getDetOrder = async (id) => {
      localStorage.setItem("orderId", id);
      DetailOrder(id);
    };

    const handleRefresh = () => {
      window.location.reload();
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    };

    async function sendOtp(nomorWhatsappOTP) {
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
          `${API_URL.value}/api/v2/stores/change-draft-to-deliv`,
          {
            id: orderId.value,
            nomorWhatsappOTP: nomorWhatsappOTP,
            objOrder: objOrder.value,
            userNumber: user.number,
            idToko: store_id.value, //segments[segments.length - 1]
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

    function setWhatsapp(store_info) {
      console.log(store_info);
      nomorWhatsappOTP.value = store_info.store_phone;
      store_id.value = store_info.store_id;
    }
    function setObjOrder(objOrd) {
      console.log(objOrd);
      objOrder.value = objOrd;
    }
    function setId(id) {
      console.log(id);
      orderId.value = id;
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

    const softDeleteOrder = async (orderId) => {
      try {
        const confirmDelete = confirm("Apakah Anda yakin ingin membatalkan draft PO ini?");
        if (!confirmDelete) return;

        const tokens = localStorage.getItem("tokens")
          ? JSON.parse(localStorage.getItem("tokens"))
          : null;

        const headers = {
          Authorization: `Bearer ${tokens.access_token}`,
        };

        // Pastikan orderId dikonversi menjadi number
        const response = await axios.delete(`${API_URL.value}/api/v2/stores/delete-draft/${(orderId)}`, {
          headers: headers,
        });

        if (response.status === 200 && response.data.success) {
          orders.value = orders.value.filter((order) => order.id !== orderId);
          alert("Draft PO berhasil dibatalkan.");
        } else {
          alert("Gagal membatalkan draft PO. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Error saat membatalkan draft PO:", error);
        alert("Terjadi kesalahan saat mencoba membatalkan draft PO.");
      }
    };



    onMounted(() => {
      // fetchOrders();
      // softDeleteOrder;
    });

    return {
      fetchOrders,
      dariTanggal,
      sampaiTanggal,
      filteredOrders,
      getStatusText,
      getStatusColor,
      changeStatus,
      deleteDataAlert,
      openConfirmAlert,
      confOtp,
      getDetOrder,
      setOpen,
      isOpen,
      flagOTP,
      sendOtp,
      setWhatsapp,
      nomorWhatsappOTP,
      setObjOrder,
      objOrder,
      setId,
      orderId,
      sendOTPIntoWhatsapp,
      confirmOTP,
      firstOTPNumber,
      secondOTPNumber,
      thirdOTPNumber,
      fourthOTPNumber,
      selectedProduct,
      currentRoute,
      getusers,
      softDeleteOrder,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles here */
</style>
