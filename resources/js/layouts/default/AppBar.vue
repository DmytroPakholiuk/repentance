<template>
    <v-app-bar flat color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon icon="fas fa-bars" @click="drawer.show = !drawer.show"></v-app-bar-nav-icon>
        </template>

        <template v-slot:title>
            <router-link to="/">
                <v-img
                    src="/assets/images/logo/logo_transparent.svg"
                    width="160"
                    class="mx-0"
                />
            </router-link>
        </template>

        <v-spacer/>

        <v-btn
            variant="plain"
            @click="logOut"
        >
            <v-icon start>fas fa-sign-in-alt</v-icon>
            <span class="no-upper">{{ $t('buttons.logout') }}</span>
        </v-btn>
    </v-app-bar>
</template>

<script setup>
import { useDrawerStore } from "@/store/drawer.js";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const drawer = useDrawerStore();

function logOut() {
    window.location.href = '/logout';
}
</script>

<style scoped>

</style>
