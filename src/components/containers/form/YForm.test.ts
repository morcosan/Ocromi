import { mount, shallowMount } from '@vue/test-utils';
import YForm from './YForm.vue';
import { i18n } from '.jest/vue-setup';


describe('YForm', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YForm, { i18n });
      expect(wrapper.is(YForm)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YForm, { i18n });
      expect(wrapper.is(YForm)).toBe(true);
   });

});
