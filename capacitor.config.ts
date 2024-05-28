import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SGS Sales Distributor',
  webDir: 'dist',
  server: {
    // androidScheme: "https",
    androidScheme: "http",
  }
};

export default config;
