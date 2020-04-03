import * as Vue from 'vue';
import * as Quasar from 'quasar';
import * as VueI18n from 'vue-i18n';
import messages from 'src/i18n';


// @ts-ignore
Vue.use(VueI18n);
// @ts-ignore
Vue.use(Quasar, { config: {}, directives: {} });


// @ts-ignore
export const i18n = new VueI18n({
	locale: 'en-us',
	fallbackLocale: 'en-us',
	messages,
});
