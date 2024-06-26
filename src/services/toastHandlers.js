import { toastController } from '@ionic/vue';
import { close } from 'ionicons/icons';

export async function catchToast (responseMsg, duration) {
    const toast = await toastController.create({
        message: `${responseMsg}`,
        duration: duration,
        position: "top",
        color: 'success',
        mode: 'md',
        buttons: [
            {
                icon: close,
                handler: () => {
                    toast.dismiss();
                },
                role: 'cancel',
                htmlAttributes: {
                    'aria-label': 'close',
                },
            },
        ],
    });

    return toast.present();
}

export async function catchToastInfo (responseMsg, duration) {
    const toast = await toastController.create({
        message: `${responseMsg}`,
        duration: duration,
        position: "top",
        color: 'primary',
        mode: 'md',
        buttons: [
            {
                icon: close,
                handler: () => {
                    toast.dismiss();
                },
                role: 'cancel',
                htmlAttributes: {
                    'aria-label': 'close',
                },
            },
        ],
    });

    return toast.present();
}

export async function catchToastError (errorMsg, duration) {
    const toast = await toastController.create({
        message: errorMsg,
        duration: duration,
        position: "top",
        color: "danger",
        mode: 'md',
        buttons: [
            {
                icon: close,
                handler: () => {
                    toast.dismiss();
                },
                role: 'cancel',
                htmlAttributes: {
                    'aria-label': 'close',
                },
            },
        ],
    });

    return toast.present();
}

export async function catchToastWarn (warnMsg, duration) {
    const toast = await toastController.create({
        message: warnMsg,
        duration: duration,
        position: "top",
        color: "warning",
        mode: 'md',
        buttons: [
            {
                icon: close,
                handler: () => {
                    toast.dismiss();
                },
                role: 'cancel',
                htmlAttributes: {
                    'aria-label': 'close',
                },
            },
        ],
    });

    return toast.present();
}