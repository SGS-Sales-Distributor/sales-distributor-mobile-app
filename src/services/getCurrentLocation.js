import { Geolocation } from '@capacitor/geolocation';

export async function printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    
    console.log("Your current position: ", coordinates);
    
    return [latitude, longitude];
}