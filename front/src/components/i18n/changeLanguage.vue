<template>
    <div>
      <select v-model="selectedLocale" @change="changeLanguage">
        <option v-for="locale in locales" :key="locale.code" :value="locale.code">
          {{ locale.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  export default defineComponent({
    setup() {
      const { locale } = useI18n();
      const selectedLocale = ref(locale.value);
      const locales = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español (Argentina)' }
      ];
  
      const changeLanguage = () => {
        locale.value = selectedLocale.value;
      };
  
      return {
        locales,
        selectedLocale,
        changeLanguage
      };
    }
  });
  </script>
  