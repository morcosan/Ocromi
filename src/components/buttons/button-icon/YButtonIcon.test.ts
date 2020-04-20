import { mount, shallowMount } from '@vue/test-utils';
import YButtonIcon from './YButtonIcon.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonIcon', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonIcon, { i18n });
      expect(wrapper.is(YButtonIcon)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonIcon, { i18n });
      expect(wrapper.is(YButtonIcon)).toBe(true);
   });

});


