import { mount, shallowMount } from '@vue/test-utils';
import YNavItemLink from './YNavItemLink.vue';
import { i18n } from '.jest/vue-setup';


describe('YNavItemLink', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YNavItemLink, { i18n });
      expect(wrapper.is(YNavItemLink)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YNavItemLink, { i18n });
      expect(wrapper.is(YNavItemLink)).toBe(true);
   });

});
