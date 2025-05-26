<script setup lang="ts">
// Możesz dodać obsługę nawigacji i języka tutaj, jeśli chcesz
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { setLocale } from "./plugins/i18n";

const i18n = useI18n();
const router = useRouter();

const goTo = (route: string) => {
  router.push({ name: route });
};

const languages = [
  { codeIcon: "pl", codeName: "PL", i18nLocale: "pl" },
  { codeIcon: "us", codeName: "EN", i18nLocale: "en" },
];
const currentLanguage = computed(
  () =>
    languages.find(
      (lang) => lang.codeName === i18n.locale.value.toUpperCase()
    ) ?? languages[0]
);
</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar class="px-2">
        <template v-slot:prepend>
          <span class="font-weight-bold text-h6">My Stock by MK</span>
        </template>
        <template v-slot:title>
          <v-btn variant="text" @click="goTo('main')" class="mx-2">
            Dashboard
          </v-btn>
          <v-btn variant="text" @click="goTo('wallet')" class="mx-2">
            Markets
          </v-btn>
          <v-btn variant="text" @click="goTo('wallet')" class="mx-2">
            Wallet
          </v-btn>
          <v-btn variant="text" @click="goTo('wallet')" class="mx-2">
            Watchlist
          </v-btn>
        </template>
        <template v-slot:append>
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props">
                <span :class="`fi fi-${currentLanguage.codeIcon}`"></span>
                {{ currentLanguage.codeName }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="lang in languages"
                :key="lang.codeName"
                @click="setLocale(lang.i18nLocale as 'pl' | 'en')"
              >
                <span :class="`fi fi-${lang.codeIcon}`"></span>
                {{ lang.codeName }}
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props">
                <v-icon>mdi-account</v-icon>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>Zaloguj się</v-list-item>
              <v-list-item>Wyloguj</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-app-bar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
