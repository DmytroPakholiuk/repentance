import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawerStore', {
    state: () => ({
        show: true
    }),
});
