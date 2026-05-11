import { loadingController } from "@ionic/vue";
import { loading } from "./globalVariables";

let activeLoader = null;
let loadingDepth = 0;
let showTimer = null;
let createPromise = null;
let visibleSince = 0;

const SHOW_DELAY_MS = 250;
const MIN_VISIBLE_MS = 250;

export async function presentLoading() {
  loadingDepth += 1;

  if (activeLoader) {
    return activeLoader;
  }

  if (createPromise) {
    return createPromise;
  }

  createPromise = new Promise((resolve) => {
    showTimer = setTimeout(async () => {
      showTimer = null;

      if (loadingDepth <= 0) {
        createPromise = null;
        resolve(null);
        return;
      }

      activeLoader = await loadingController.create({
        message: "Loading...",
      });

      loading.value = activeLoader;
      await activeLoader.present();
      visibleSince = Date.now();
      createPromise = null;
      resolve(activeLoader);
    }, SHOW_DELAY_MS);
  });

  return createPromise;
}

export async function stopLoading(force = false) {
  if (loadingDepth > 0) {
    loadingDepth -= 1;
  }

  if (!force && loadingDepth > 0) {
    return;
  }

  loadingDepth = 0;

  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
  }

  if (!activeLoader) {
    createPromise = null;
    return;
  }

  const loader = activeLoader;
  activeLoader = null;
  loading.value = null;

  try {
    const elapsed = Date.now() - visibleSince;
    if (elapsed < MIN_VISIBLE_MS) {
      await new Promise((resolve) =>
        setTimeout(resolve, MIN_VISIBLE_MS - elapsed)
      );
    }
    await loader.dismiss();
  } catch (error) {
    console.warn("Failed to dismiss loading overlay", error);
  } finally {
    visibleSince = 0;
  }
}
