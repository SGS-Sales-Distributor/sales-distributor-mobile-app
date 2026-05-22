<template>
  <ion-page>
    <HeaderSection />
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="flex items-center justify-center min-h-screen">
          <div class="p-8 rounded-lg max-w-sm w-full">
            <h2 class="text-2xl font-semibold text-center mb-4">Request Outlet Baru</h2>
            <p class="text-gray-600 text-center mb-6">Request akan dikirim ke Supervisor kamu.</p>

            <Form @submit="submitAlert" novalidate :validation-schema="validation">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">Nama Toko *</label>
                <Field v-model="formData.store_name" name="store_name" type="text"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700"
                  placeholder="Masukkan nama toko" />
                <ErrorMessage name="store_name" class="text-rose-500 text-xs" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">Nama Alias Toko *</label>
                <Field v-model="formData.store_alias" name="store_alias" type="text"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" placeholder="Alias Toko" />
                <ErrorMessage name="store_alias" class="text-rose-500 text-xs" />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">Alamat Toko *</label>
                <Field v-model="formData.store_address" name="store_address" as="textarea"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" placeholder="Masukkan alamat toko"
                  rows="4" />
                <ErrorMessage name="store_address" class="text-rose-500 text-xs" />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">
                  No HP Toko
                  <span class="text-gray-400 font-normal text-xs">(Diisi jika ada)</span>
                </label>
                <Field v-model="formData.store_phone" name="store_phone" type="text"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" placeholder="Diisi jika ada" />
                <ErrorMessage name="store_phone" class="text-rose-500 text-xs" />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">Tipe Toko *</label>
                <Field v-model="formData.store_type_id" name="store_type_id" as="select"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700">
                  <option disabled value="">Pilih Tipe Toko</option>
                  <option v-for="type in storeTypes" :key="type.code" :value="type.code">
                    {{ type.label }}
                  </option>
                </Field>
                <ErrorMessage name="store_type_id" class="text-rose-500 text-xs" />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">Cabang *</label>
                <Field v-model="formData.subcabang_id" name="subcabang_id" as="select"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700">
                  <option disabled value="">Pilih Cabang</option>
                  <option v-for="cabang in storeCabangs" :key="cabang.id" :value="cabang.id">
                    {{ cabang.nama_cabang }}
                  </option>
                </Field>
                <ErrorMessage name="subcabang_id" class="text-rose-500 text-xs" />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">Nama Owner *</label>
                <Field v-model="formData.owner" name="owner" type="text"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700"
                  placeholder="Masukkan nama owner" />
                <ErrorMessage name="owner" class="text-rose-500 text-xs" />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">
                  NIK Owner
                  <span class="text-gray-400 font-normal text-xs">(Diisi jika ada)</span>
                </label>
                <Field v-model="formData.nik_owner" name="nik_owner" type="text"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" placeholder="Diisi jika ada"
                  maxlength="16" />
                <ErrorMessage name="nik_owner" class="text-rose-500 text-xs" />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2">
                  Email Owner
                  <span class="text-gray-400 font-normal text-xs">(Diisi jika ada)</span>
                </label>
                <Field v-model="formData.email_owner" name="email_owner" type="email"
                  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" placeholder="Diisi jika ada" />
                <ErrorMessage name="email_owner" class="text-rose-500 text-xs" />
              </div>

              <br>
              <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Kirim Request
              </button>
            </Form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import * as Yup from 'yup';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { alertController } from '@ionic/vue';
import HeaderSection from './../components/HeaderSection.vue';
import { API_URL } from '@/services/globalVariables';
import { refreshAccessTokenHandler } from '@/services/auth';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { redirectToHomePage } from '@/services/redirectHandlers';

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const storeTypes = ref([]);
const storeCabangs = ref([]);

const formData = ref({
  store_name: null,
  store_alias: null,
  store_address: null,
  store_phone: null,
  store_type_id: '',
  subcabang_id: '',
  owner: null,
  nik_owner: null,
  email_owner: null,
});

const validation = Yup.object().shape({
  store_name: Yup.string().required('Nama toko tidak boleh kosong!').max(100),
  store_alias: Yup.string()
    .required('Nama alias toko tidak boleh kosong!')
    .max(200, 'Maksimal 200 karakter'),
  store_address: Yup.string().required('Alamat toko tidak boleh kosong!'),
  store_phone: Yup.string().nullable()
    .transform(v => v === '' ? null : v)
    .matches(/^[0-9]{10,13}$/, { message: 'Format nomor tidak valid', excludeEmptyString: true }),
  store_type_id: Yup.string().required('Pilih tipe toko!'),
  subcabang_id: Yup.string().required('Pilih cabang!'),
  owner: Yup.string().required('Nama owner tidak boleh kosong!').max(255),
  nik_owner: Yup.string().nullable()
    .transform(v => v === '' ? null : v)
    .matches(/^[0-9]{16}$/, { message: 'NIK harus 16 digit', excludeEmptyString: true }),
  email_owner: Yup.string().nullable()
    .transform(v => v === '' ? null : v)
    .email('Format email tidak valid'),
});

async function submitAlert() {
  const alert = await alertController.create({
    header: 'Konfirmasi',
    message: 'Kirim request outlet baru ke Supervisor?',
    buttons: [
      { text: 'Batal', role: 'cancel' },
      {
        text: 'Kirim',
        handler: async () => await submitRequest(),
      },
    ],
  });
  await alert.present();
}

async function submitRequest() {
  try {
    refreshAccessTokenHandler();
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const headers = { Authorization: `Bearer ${tokens.access_token}` };

    await presentLoading();

    await axios.post(`${API_URL.value}/api/v2/outlet-request`, {
      ...formData.value,
      userFullname: user.fullname,
      userId: user.user_id,
    }, { headers });

    catchToast("Request outlet berhasil dikirim ke Supervisor!", 3000);
    redirectToHomePage();
  } catch (error) {
    catchToastError("Gagal mengirim request outlet", 3000);
    console.error(error);
  } finally {
    stopLoading();
  }
}

async function fetchStoreTypes() {
  try {
    const response = await axios.get(`${API_URL.value}/api/v2/getStype`);
    storeTypes.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchStoreCabangs() {
  try {
    refreshAccessTokenHandler();
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const headers = { Authorization: `Bearer ${tokens.access_token}` };
    const response = await axios.get(`${API_URL.value}/api/v2/cabangsByUser/${user.user_id}`, { headers });
    storeCabangs.value = response.data.resource;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  fetchStoreTypes();
  fetchStoreCabangs();
});
</script>

<style scoped>
.container {
  margin-top: 28%;
  flex-direction: column;
}
</style>