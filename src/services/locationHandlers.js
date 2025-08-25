import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { catchToast, catchToastError, catchToastWarn } from './toastHandlers';
import { isLocationPermissionAllowed, statusGPS } from './globalVariables';
import { presentLoading, stopLoading } from './loadingHandlers';

export async function printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;

    return [latitude, longitude];
}

export async function checkLocationAccess() {
    try {
        presentLoading();
        if (Capacitor.isNativePlatform) {
            const hasPermission = await Geolocation.checkPermissions();
            const coordinates = await Geolocation.getCurrentPosition();
            if (hasPermission.location === 'granted') {
                catchToast("Akses Lokasi Diterima!", 3000);

                isLocationPermissionAllowed.value = true;
                statusGPS.value = true;
            } else if (hasPermission.location === "prompt") {
                console.log('Current PositionL', coordinates);
                console.log(hasPermission.location);

                catchToast("Lokasi Terakhir Ditemukan", 3000);
                isLocationPermissionAllowed.value = true;
                statusGPS.value = true;
            } else {
                catchToastError("Akses Lokasi Ditolak, mohon nyalakan GPS secara manual!", 3000);
                catchToastError(hasPermission.location);

                isLocationPermissionAllowed.value = false;
                statusGPS.value = false;
            }
        } else {
            console.warn('Geolocation not supported on web platform.');

            catchToastWarn('Geolocation not supported on web platform.', 3000);
        }
        stopLoading();
    } catch (error) {
        console.error(`Error checking location access: ${error.message}`);

        catchToastError(error.message, 3000);
    } 
    finally {
        stopLoading();
    }
}