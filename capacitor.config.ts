import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sgs-sales-distributor-app',
  webDir: 'dist',
  server: {
    // androidScheme: "https",
    androidScheme: "http",
  }
};

export default config;
