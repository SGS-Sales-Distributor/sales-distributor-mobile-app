<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile Page</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Profile Page" />
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from '@/components/ExploreContainer.vue';

export default {
  components: {
    ExploreContainer,
  }
}
</script>
