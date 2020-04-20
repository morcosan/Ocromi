import Vue from 'vue';
import Quasar from 'quasar';
import VueI18n from 'vue-i18n';
import enUS from '../src/i18n/en-us';


Vue.use(VueI18n);
// @ts-ignore
Vue.use(Quasar);

// create global mixin
Vue.mixin({
   computed: {
      YLocale(): any {
         // @ts-ignore
         return this.$t('locale');
      },
   },
});

export const i18n = new VueI18n({
   locale: 'en-us',
   fallbackLocale: 'en-us',
   messages: {
      'en-us': { locale: enUS },
   },
});
