import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { 
  IonicVue,
  IonMenu,
  IonPage,
  IonTitle,
  IonCardTitle,
  IonBackButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonToolbar,
  IonHeader,
  IonFooter,
  IonCardSubtitle,
  IonCardHeader,
  IonImg,
  IonAvatar,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonList,
  IonItem,
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  IonLabel, 
  IonIcon, 
  IonRouterOutlet,
  IonModal,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonProgressBar,
  IonBadge,
  IonInput
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import './tailwind.css';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { catchToastError } from '@/services/toastHandlers';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.config.errorHandler = function (error, vm, info) {
  console.error("Error: ", error);
  console.log("Vue Instance: ", vm);
  console.log("Info", info);

  catchToastError(error, 3000);
}

// ionic components
app.component('ion-page', IonPage);
app.component('ion-modal', IonModal);
app.component('ion-title', IonTitle);
app.component('ion-card-title', IonCardTitle);
app.component('ion-back-button', IonBackButton);
app.component('ion-content', IonContent);
app.component('ion-grid', IonGrid);
app.component('ion-row', IonRow);
app.component('ion-col', IonCol);
app.component('ion-icon', IonIcon);
app.component('ion-buttons', IonButtons);
app.component('ion-button', IonButton);
app.component('ion-label', IonLabel);
app.component('ion-card', IonCard);
app.component('ion-card-content', IonCardContent);
app.component('ion-toolbar', IonToolbar);
app.component('ion-header', IonHeader);
app.component('ion-footer', IonFooter);
app.component('ion-card-subtitle', IonCardSubtitle);
app.component('ion-card-header', IonCardHeader);
app.component('ion-avatar', IonAvatar);
app.component('ion-menu-button', IonMenuButton);
app.component('ion-segment', IonSegment);
app.component('ion-segment-button', IonSegmentButton);
app.component('ion-fab', IonFab);
app.component('ion-fab-button', IonFabButton);
app.component('ion-list', IonList);
app.component('ion-item', IonItem);
app.component('ion-tab-bar', IonTabBar);
app.component('ion-tab-button', IonTabButton);
app.component('ion-tabs', IonTabs);
app.component('ion-router-outlet', IonRouterOutlet);
app.component('ion-menu', IonMenu);
app.component('ion-img', IonImg);
app.component('ion-input', IonInput);
app.component('ion-infinite-scroll', IonInfiniteScroll);
app.component('ion-infinite-scroll-content', IonInfiniteScrollContent);
app.component('ion-progress-bar', IonProgressBar);
app.component('ion-badge', IonBadge);

// vee-validate components
app.component('vee-form', Form);
app.component('vee-field', Field);
app.component('vee-error-message', ErrorMessage);

defineCustomElements(window);

router.isReady().then(() => {
  app.mount('#app');
});