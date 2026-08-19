<template>
    <v-navigation-drawer v-model="drawer.show" location="left">
        <v-list>
            <template v-for="item in menus">
                <v-list-group
                    v-if="item.items.length > 0"
                    :value="item.route"
                    expand-icon="fas fa-chevron-down"
                    collapse-icon="fas fa-chevron-up"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            :prepend-icon="item.icon"
                            :title="$t(item.text)"
                        ></v-list-item>
                    </template>

                    <v-list-item
                        v-for="(child, i) in item.items"
                        :key="i"
                        :prepend-icon="child.icon"
                        :title="$t(child.text)"
                        :value="$t(child.text)"
                    ></v-list-item>
                </v-list-group>

                <v-list-item
                    :prepend-icon="item.icon"
                    :title="$t(item.text)"
                    v-if="item.items.length === 0"
                    color="white"
                    :disabled="isActive(item.route)"
                    @click="goToRouteName(item.route)"
                ></v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import router from "../../router/index.js";
import { useRoute } from 'vue-router';
import { useDrawerStore } from "@/store/drawer.js";

const route = useRoute();
const drawer = useDrawerStore();

const menus = [
    { id: 1, text: 'menu.dashboard', route: 'dashboard', icon: 'fa-solid fa-gauge', items: [] },
];

// function listItemClass(item) {
//     return isActive(item.route) ?
//         'v-list-item v-list-item--disabled v-theme--customTheme v-list-item--density-default v-list-item--one-line v-list-item--variant-text text-white' :
//         'v-list-item v-list-item--link v-theme--customTheme v-list-item--density-default v-list-item--one-line v-list-item--variant-text';
// }

function goToRouteName(name) {
    router.push({ name: name });
}

function isActive(name) {
    return name === route.name;
}
</script>

<style scoped lang="scss">
.text-white {
    color: grey !important;
}
</style>
