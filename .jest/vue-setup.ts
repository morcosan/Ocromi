import * as Vue from 'vue';
import * as Quasar from 'quasar';
import * as VueI18n from 'vue-i18n';
import enUS from '../src/i18n/en-us';


// @ts-ignore
Vue.use(VueI18n);
// @ts-ignore
Vue.use(Quasar);

// create global mixin
// @ts-ignore
Vue.mixin({
   computed: {
      // @ts-ignore
      $locale() {
         // @ts-ignore
         return this.$t('locale');
      },
   },
});

// @ts-ignore
export const i18n = new VueI18n({
   locale: 'en-us',
   fallbackLocale: 'en-us',
   messages: {
      'en-us': { locale: enUS },
   },
});
