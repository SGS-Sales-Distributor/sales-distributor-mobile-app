<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';

export default {
  data() {
    return {
      API_URL: `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`,
    };
  },
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {
    redirectToLoginPage() {
      setTimeout(() => {
          this.$router.push({
            path: '/login'
          })
      }, 100);
    },
    async refreshToken(token) {
      try {
        const response = await this.$axios.post(`${this.API_URL}/api/v1/auth/refresh`, {
          refresh_token: token
        });

        const newAccessToken = response.data.resource.access_token;
        console.log("Successfully refresh access token: ", newAccessToken);

        return newAccessToken;
      } catch (error) {
        console.log('Failed to refresh access token', error.message);
        throw new Error('Failed to refresh access token', error.message);
      }
    },
    async handleExpirationToken() {
      const refreshToken = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')).refresh_token : null;

      if (!refreshToken) {
        console.error('Refresh token not found in local storage.');
        return;
      }

      const newAccessToken = await this.refreshToken(refreshToken);
      localStorage.setItem('accessToken', newAccessToken);
      console.log("Successfully refresh access token: ", newAccessToken);
    },
    async getAuthUserData() {
      const accessToken = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')).accessToken : null; 
      
      if (!accessToken) {
        console.log("No access token available.");
        this.redirectToLoginPage();
        return null;
      }

      try {
        const header = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }

        const response = await this.$axios.get(`${this.API_URL}/api/v1/auth/me`, { headers: header });
        
        const authUserData = response.data.resource.data;
        console.log("Authenticated user:", authUserData);

        localStorage.setItem('authUser', JSON.stringify(authUserData));

        return authUserData;
      } catch (error) {
        console.log('Failed to salesman data', error.message);
        throw new Error('Failed to salesman data', error.message);
      }
    },
  },
  mounted() {
    this.getAuthUserData();
  }
}
</script>
