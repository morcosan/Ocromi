import Vue from 'vue';

// TS checking for custom i18n access variable
declare module 'vue/types/vue' {
   interface Vue {
      $locale: any;
   }
}
