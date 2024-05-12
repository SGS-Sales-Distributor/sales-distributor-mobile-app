import { Geolocation } from "@capacitor/geolocation";
import { ref, shallowRef } from "vue";

// API URL
export const API_URL = ref(`${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`);

// Used for Map Content.
export const hasLocationAccessPermission = Geolocation.checkPermissions();
export const isLocationPermissionAllowed = ref(false);
export const statusGPS = ref(false);
export const mapContainer = shallowRef(null);
export const map = shallowRef(null);

// Used for get Detail Store.
export const detailStoreInfoDistri = ref(null);

// Used for Loading.
export const loading = ref(null);

export const objOrder = ref([]);
export const nomorWhatsappOTP = ref(null);
export const firstOTPNumber = ref(null);
export const secondOTPNumber = ref(null);
export const thirdOTPNumber = ref(null);
export const fourthOTPNumber = ref(null);