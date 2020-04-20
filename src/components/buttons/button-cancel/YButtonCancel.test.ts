import { mount, shallowMount } from '@vue/test-utils';
import YButtonCancel from './YButtonCancel.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonCancel', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonCancel, { i18n });
      expect(wrapper.is(YButtonCancel)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonCancel, { i18n });
      expect(wrapper.is(YButtonCancel)).toBe(true);
   });

});


