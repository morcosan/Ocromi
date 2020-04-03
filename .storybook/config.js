/**
 * Setup context for Storybook
 */

import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import '../src/css/app.scss';

import Vue from 'vue';
import Quasar from 'quasar';
import VueI18n from 'vue-i18n';


Vue.use(VueI18n);
Vue.use(Quasar);
