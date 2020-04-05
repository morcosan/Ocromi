import { mount, shallowMount } from '@vue/test-utils';
import YFieldPassword from './YFieldPassword.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldPassword', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YFieldPassword, { i18n });
      expect(wrapper.is(YFieldPassword)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YFieldPassword, { i18n });
      expect(wrapper.is(YFieldPassword)).toBe(true);
   });

});


