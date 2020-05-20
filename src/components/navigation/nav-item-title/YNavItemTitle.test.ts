import { mount, shallowMount } from '@vue/test-utils';
import YNavItemTitle from './YNavItemTitle.vue';
import { i18n } from '.jest/vue-setup';


describe('YNavItemTitle', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YNavItemTitle, { i18n });
      expect(wrapper.is(YNavItemTitle)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YNavItemTitle, { i18n });
      expect(wrapper.is(YNavItemTitle)).toBe(true);
   });

});
