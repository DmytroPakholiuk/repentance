// import { createInertiaApp } from '@inertiajs/vue3';
// import { initializeTheme } from '@/composables/useAppearance';
// import AppLayout from '@/layouts/AppLayout.vue';
// import AuthLayout from '@/layouts/AuthLayout.vue';
// import SettingsLayout from '@/layouts/settings/Layout.vue';
// import { initializeFlashToast } from '@/lib/flashToast';
//
// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
//
// createInertiaApp({
//     title: (title) => (title ? `${title} - ${appName}` : appName),
//     layout: (name) => {
//         switch (true) {
//             case name === 'Welcome':
//                 return null;
//             case name.startsWith('auth/'):
//                 return AuthLayout;
//             case name.startsWith('settings/'):
//                 return [AppLayout, SettingsLayout];
//             default:
//                 return AppLayout;
//         }
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });
//
// // This will set light / dark mode on page load...
// initializeTheme();
//
// // This will listen for flash toast data from the server...
// initializeFlashToast();

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { createI18n } from 'vue-i18n';

import 'vuetify/styles'

import App from './App.vue'
import router from './router'
import localizations from "../../lang/vue/dashboard.localizations";

const app = createApp(App)

const pinia = createPinia()

const vuetify = createVuetify()

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: localizations
});

app
    .use(pinia)
    .use(router)
    .use(vuetify)
    .use(i18n)
    .mount('#app')
