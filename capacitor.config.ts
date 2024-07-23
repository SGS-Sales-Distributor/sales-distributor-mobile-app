import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Sidia',
  webDir: 'dist',
  server: {
    // androidScheme: "https",
    androidScheme: "http",
  }
,
    android: {
       buildOptions: {
          keystorePath: 'd:\SGS\Tri\Document\Tri Murdani\x2024\keyStore sidia\sidia.keystore',
          keystoreAlias: 'sidiaapp',
       }
    }
  };

export default config;
