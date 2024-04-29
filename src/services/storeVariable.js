import { createStore } from 'vuex';
import { printCurrentPosition } from './getCurrentLocation';

const store = createStore({
    async state() {
        const positions = await printCurrentPosition();
        const [latitude, longitude] = positions;

        return {
            latitude: latitude,
            longitude: longitude,
        };
    },
    getters: {
        getCurrentLatitude(state) {
            return state.latitude;
        },
        getCurrentLongitude(state) {
            return state.longitude;
        },
    },
});

export default store;