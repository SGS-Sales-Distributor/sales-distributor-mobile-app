import { Geolocation } from '@capacitor/geolocation';

export async function printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    
    return [latitude, longitude];
}