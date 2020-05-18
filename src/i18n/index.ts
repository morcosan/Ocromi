import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us';


Vue.use(VueI18n);

// create config after adding plugin
const i18n = new VueI18n({
   locale: 'en-us',
   fallbackLocale: 'en-us',
   messages: {
      'en-us': { locale: enUS },
   },
});

export default i18n;
