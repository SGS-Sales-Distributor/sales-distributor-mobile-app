import { loadingController } from "@ionic/vue";
import { loading } from "./globalVariables";

export function presentLoading() {
  loading.value = loadingController
    .create({
      message: "Loading...",
    })
    .then((a) => a.present());

  return loading.value;
}

export function stopLoading() {
  setTimeout(() => {
    loadingController.dismiss();
  }, 300);
}
