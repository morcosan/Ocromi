import { mount, shallowMount } from '@vue/test-utils';
import YFieldPassword from './YFieldPassword.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldPassword', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YFieldPassword, { i18n });
      expect(wrapper.is(YFieldPassword)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YFieldPassword, { i18n });
      expect(wrapper.is(YFieldPassword)).toBe(true);
   });

});


