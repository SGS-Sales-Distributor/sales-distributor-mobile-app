import { toastController } from '@ionic/vue';

export async function catchToast (responseMsg, duration) {
    const toast = await toastController.create({
        message: `${responseMsg}`,
        duration: duration,
        position: "top",
        positionAnchor: "header",
        color: 'success',
    });

    await toast.present();
}

export async function catchToastError (errorMsg, duration) {
    const toast = await toastController.create({
        message: errorMsg,
        duration: duration,
        position: "top",
        positionAnchor: "header",
        color: "danger",
    });

    await toast.present();
}