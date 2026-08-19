<template>
    <v-app>
        <AppBar />
        <LeftBar />
        <v-main>
            <div class="pa-4">
                <router-view />
            </div>
        </v-main>
        <Footer />
    </v-app>
</template>

<script setup>
import AppBar from "./AppBar.vue";
import LeftBar from "./LeftBar.vue";
import Footer from "./Footer.vue";
</script>

<style scoped>

</style>
