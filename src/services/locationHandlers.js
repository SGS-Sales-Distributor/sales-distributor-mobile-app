import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { catchToast, catchToastError, catchToastWarn } from "./toastHandlers";
import { isLocationPermissionAllowed, statusGPS } from "./globalVariables";
import { presentLoading, stopLoading } from "./loadingHandlers";

let cachedPosition = null;
let inflightPositionPromise = null;

export async function printCurrentPosition() {
  if (cachedPosition) {
    return cachedPosition;
  }

  if (inflightPositionPromise) {
    return inflightPositionPromise;
  }

  inflightPositionPromise = Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
  })
    .then((coordinates) => {
      const latitude = coordinates.coords.latitude;
      const longitude = coordinates.coords.longitude;

      cachedPosition = [latitude, longitude];
      return cachedPosition;
    })
    .finally(() => {
      inflightPositionPromise = null;
    });

  return inflightPositionPromise;
}

export async function checkLocationAccess() {
  await presentLoading();
  try {
    if (Capacitor.isNativePlatform()) {
      let permission = await Geolocation.checkPermissions();

      if (permission.location === "prompt") {
        permission = await Geolocation.requestPermissions();
      }

      if (permission.location === "granted") {
        await printCurrentPosition();
        catchToast("Akses Lokasi Diterima!", 3000);

        isLocationPermissionAllowed.value = true;
        statusGPS.value = true;
      } else {
        catchToastError(
          "Akses Lokasi Ditolak, mohon nyalakan GPS secara manual!",
          3000
        );
        console.log(permission.location);

        isLocationPermissionAllowed.value = false;
        statusGPS.value = false;
      }
    } else {
      console.warn("Geolocation not supported on web platform.");

      await printCurrentPosition();
      isLocationPermissionAllowed.value = true;
      statusGPS.value = true;
      catchToastWarn("Geolocation not supported on web platform.", 3000);
    }
  } catch (error) {
    console.error(`Error checking location access: ${error.message}`);

    isLocationPermissionAllowed.value = false;
    statusGPS.value = false;
    catchToastError(error.message, 3000);
  } finally {
    await stopLoading();
  }
}
