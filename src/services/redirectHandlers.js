import router from '../router';

export function redirectToHomePage() {
    setTimeout(() => {
        router.push({
            path: '/home',
        });
    }, 300);
}

export function redirectToLoginPage() {
    setTimeout(() => {
        router.push({
            path: '/login',
        });
    }, 300);
}

export function redirectToAbsensiPage() {
    setTimeout(() => {
        router.push({
            path: '/absensi',
        });
    }, 300);
}

export function redirectToStoreDetailPage(storeId) {
    setTimeout(() => {
        router.push({
            name: 'storeDetail', params: { id: storeId }
        });
    }, 300);
}

export function redirectToPurchaseOrderPage(storeId) {
    setTimeout(() => {
        router.push({
            name: 'purchaseOrder', params: { id: storeId }
        });
    }, 300);
}

export function redirectToOwnerFormPage() {
    setTimeout(() => {
        router.push({
            name: 'registerOwnerStore'
        });
    }, 300);
}

export function redirectToRegisterStorePage() {
    setTimeout(() => {
        router.push({
            name: 'registerNewStore'
        });
    }, 300);
}