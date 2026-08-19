import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
    state: () => ({
        hasErrors: false,
        errors: []
    }),
    actions: {
        setErrors(errors) {
            this.errors = [];
            this.hasErrors = true;

            for (const field in errors) {
                this.errors[field] = errors[field][0];
            }
        },
        cleanErrors() {
            this.hasErrors = false;
            this.errors = [];
        }
    }
});
