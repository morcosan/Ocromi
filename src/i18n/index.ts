import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us';


// add plugin
Vue.use(VueI18n);

// create config after adding plugin
const i18n = new VueI18n({
   locale: 'en-us',
   fallbackLocale: 'en-us',
   messages: {
      'en-us': { locale: enUS },
   },
});

// create global mixin
Vue.mixin({
   computed: {
      $locale(): any {
         // @ts-ignore
         return this.$t('locale');
      },
   },
});


export default i18n;
