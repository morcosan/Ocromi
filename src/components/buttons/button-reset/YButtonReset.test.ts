import { mount, shallowMount } from '@vue/test-utils';
import YButtonReset from './YButtonReset.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonReset', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonReset, { i18n });
      expect(wrapper.is(YButtonReset)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonReset, { i18n });
      expect(wrapper.is(YButtonReset)).toBe(true);
   });

});


