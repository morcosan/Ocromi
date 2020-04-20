import { mount, shallowMount } from '@vue/test-utils';
import YButtonBack from './YButtonBack.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonBack', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonBack, { i18n });
      expect(wrapper.is(YButtonBack)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonBack, { i18n });
      expect(wrapper.is(YButtonBack)).toBe(true);
   });

});


