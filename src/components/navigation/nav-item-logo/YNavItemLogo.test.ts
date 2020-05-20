import { mount, shallowMount } from '@vue/test-utils';
import YNavItemLogo from './YNavItemLogo.vue';
import { i18n } from '.jest/vue-setup';


describe('YNavItemLogo', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YNavItemLogo, { i18n });
      expect(wrapper.is(YNavItemLogo)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YNavItemLogo, { i18n });
      expect(wrapper.is(YNavItemLogo)).toBe(true);
   });

});
