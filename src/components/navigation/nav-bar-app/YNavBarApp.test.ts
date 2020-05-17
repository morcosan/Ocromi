import { mount, shallowMount } from '@vue/test-utils';
import YNavBarApp from './YNavBarApp.vue';
import { i18n } from '.jest/vue-setup';


describe('YNavBarApp', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YNavBarApp, { i18n });
      expect(wrapper.is(YNavBarApp)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YNavBarApp, { i18n });
      expect(wrapper.is(YNavBarApp)).toBe(true);
   });

});
