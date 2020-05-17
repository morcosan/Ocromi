import { mount, shallowMount } from '@vue/test-utils';
import YNavBar from './YNavBar.vue';
import { i18n } from '.jest/vue-setup';


describe('YNavBar', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YNavBar, { i18n });
      expect(wrapper.is(YNavBar)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YNavBar, { i18n });
      expect(wrapper.is(YNavBar)).toBe(true);
   });

});
