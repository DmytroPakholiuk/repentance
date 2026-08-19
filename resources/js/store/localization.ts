import { defineStore } from 'pinia';

export const useLocalizationStore = defineStore('localization', {
    state: () => ({
        localizations: [
            { code: 'en', name: 'EN', icon: '' },
            { code: 'es', name: 'ES', icon: '' },
            { code: 'fr', name: 'FR', icon: '' },
            { code: 'it', name: 'IT', icon: '' }
        ],
        locale: 'en',
        fallbackLocale: 'en'
    }),
    actions: {}
});
