import router from '../router';

export function redirectBackOneStep() {
    setTimeout(() => {
        router.go(-1);
    }, 300);
}

export function redirectOneStep() {
    setTimeout(() => {
        router.go(1);
    }, 300);
}

export function redirectToHomePage() {
    setTimeout(() => {
        router.replace({
            name: 'home',
        });
    }, 300);
}

export function redirectToLoginPage() {
    setTimeout(() => {
        router.push({
            name: 'login',
        });
    }, 300);
}

export function redirectToAbsensiPage() {
    setTimeout(() => {
        router.push({
           name: 'absensi',
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

export function  redirectToPurchaseOrderPage() {
    setTimeout(() => {
        router.replace({
            name: 'purchaseOrder',
        });
    }, 300);
}

export function redirectToStorePurchaseOrderPage(storeId) {
    setTimeout(() => {
        router.push({
            name: 'storePurchaseOrder', params: { id: storeId }
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

export function replaceToOwnerFormPage() {
    setTimeout(() => {
        router.replace({
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

export function redirectToStoreDetailPageFormPO(storeId) {
    setTimeout(() => {
        router.push({
            name: 'storeDetailFromPO', params: { id: storeId }
        });
    }, 300);
}

export function redirectToRegisterAkun() {
    setTimeout(() => {
        router.push({
            name: 'registerAkun'
        });
    }, 300);
}