import { useErrorStore } from "@/store/error";

export function messageFieldError(field) {
    const errorStore = useErrorStore();

    if (errorStore.errors[field]) {
        return errorStore.errors[field];
    }

    return '';
}

export function cleanErrors() {
    const errorStore = useErrorStore();

    errorStore.cleanErrors();
}
