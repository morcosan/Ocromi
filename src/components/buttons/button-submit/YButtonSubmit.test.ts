import { mount, shallowMount } from '@vue/test-utils';
import YButtonSubmit from './YButtonSubmit.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonSubmit', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YButtonSubmit, { i18n });
      expect(wrapper.is(YButtonSubmit)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YButtonSubmit, { i18n });
      expect(wrapper.is(YButtonSubmit)).toBe(true);
   });

});


