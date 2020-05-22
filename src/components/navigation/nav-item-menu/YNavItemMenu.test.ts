import { mount, shallowMount } from '@vue/test-utils';
import YNavItemMenu from './YNavItemMenu.vue';
import { i18n } from '.jest/vue-setup';


describe('YNavItemMenu', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YNavItemMenu, { i18n });
      expect(wrapper.is(YNavItemMenu)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YNavItemMenu, { i18n });
      expect(wrapper.is(YNavItemMenu)).toBe(true);
   });

});
