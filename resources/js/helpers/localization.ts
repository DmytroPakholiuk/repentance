import { useLocalizationStore } from "@/store/localization";

export function translation(string) {
    const localizationStore = useLocalizationStore();

    if (typeof string === 'string') {
        return string;
    }

    if (typeof string !== 'object' || string === null) {
        return '';
    }

    return string[localizationStore.locale]
        ? string[localizationStore.locale]
        : (string[Object.keys(string)[0]] ?? '');
}
