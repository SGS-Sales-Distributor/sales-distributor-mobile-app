import { ref } from "vue";

export const API_URL = ref(`${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`);
