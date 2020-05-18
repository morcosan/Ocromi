import { mount, shallowMount } from '@vue/test-utils';
import YPage from './YPage.vue';
import { i18n } from '.jest/vue-setup';


describe('YPage', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YPage, { i18n });
      expect(wrapper.is(YPage)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YPage, { i18n });
      expect(wrapper.is(YPage)).toBe(true);
   });

});
