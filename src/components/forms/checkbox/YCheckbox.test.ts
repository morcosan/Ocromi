import { mount, shallowMount } from '@vue/test-utils';
import YCheckbox from './YCheckbox.vue';
import { i18n } from '.jest/vue-setup';


describe('YCheckbox', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YCheckbox, { i18n });
      expect(wrapper.is(YCheckbox)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YCheckbox, { i18n });
      expect(wrapper.is(YCheckbox)).toBe(true);
   });

});


