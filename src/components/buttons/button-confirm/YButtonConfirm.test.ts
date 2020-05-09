import { mount, shallowMount } from '@vue/test-utils';
import YButtonConfirm from './YButtonConfirm.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonConfirm', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonConfirm, { i18n });
      expect(wrapper.is(YButtonConfirm)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonConfirm, { i18n });
      expect(wrapper.is(YButtonConfirm)).toBe(true);
   });

});


