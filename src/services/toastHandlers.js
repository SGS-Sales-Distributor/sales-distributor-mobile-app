import { toastController } from '@ionic/vue';
import { close } from 'ionicons/icons';

export async function catchToast (responseMsg, duration = 3000) {
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

export async function catchToastInfo (responseMsg, duration = 3000) {
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

export async function catchToastError (responseMsg, duration = 3000) {
    const toast = await toastController.create({
        message: responseMsg,
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

export async function catchToastWarn (responseMsg, duration = 3000) {
    const toast = await toastController.create({
        message: responseMsg,
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