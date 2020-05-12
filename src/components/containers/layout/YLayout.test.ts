import { mount, shallowMount } from '@vue/test-utils';
import YLayout from './YLayout.vue';
import { i18n } from '.jest/vue-setup';


describe('YLayout', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YLayout, { i18n });
      expect(wrapper.is(YLayout)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YLayout, { i18n });
      expect(wrapper.is(YLayout)).toBe(true);
   });

});
