import { mount, shallowMount } from '@vue/test-utils';
import YGroupRadio from './YGroupRadio.vue';
import { i18n } from '.jest/vue-setup';


describe('YGroupRadio', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YGroupRadio, { i18n });
      expect(wrapper.is(YGroupRadio)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YGroupRadio, { i18n });
      expect(wrapper.is(YGroupRadio)).toBe(true);
   });

});


