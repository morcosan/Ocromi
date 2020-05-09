import { mount, shallowMount } from '@vue/test-utils';
import YButton from './YButton.vue';
import { i18n } from '.jest/vue-setup';


describe('YButton', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButton, { i18n });
      expect(wrapper.is(YButton)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButton, { i18n });
      expect(wrapper.is(YButton)).toBe(true);
   });

});


