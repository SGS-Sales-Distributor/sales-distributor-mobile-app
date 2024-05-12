import { toastController } from '@ionic/vue';
import { close } from 'ionicons/icons';

export async function catchToast (responseMsg, duration) {
    const toast = await toastController.create({
        message: `${responseMsg}`,
        duration: duration,
        position: "top",
        positionAnchor: "header",
        color: 'success',
        mode: 'md',
        buttons: [
            {
                icon: close,
                htmlAttributes: {
                    'aria-label': 'close',
                },
            },
        ],
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
        mode: 'md',
        buttons: [
            {
                icon: close,
                htmlAttributes: {
                    'aria-label': 'close',
                },
            },
        ],
    });

    await toast.present();
}

export async function catchToastWarn (warnMsg, duration) {
    const toast = await toastController.create({
        message: warnMsg,
        duration: duration,
        position: "top",
        positionAnchor: "header",
        color: "warning",
    });

    await toast.present();
}