import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fba8adbb42f84bc8b6df27ddb378dfd5',
  appName: 'witness-ai-insight',
  webDir: 'dist',
  server: {
    url: 'https://fba8adbb-42f8-4bc8-b6df-27ddb378dfd5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    VoiceRecorder: {
      permissions: {
        microphone: 'This app uses the microphone to record court testimony for analysis.'
      }
    }
  }
};

export default config;