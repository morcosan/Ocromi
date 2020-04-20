import { mount, shallowMount } from '@vue/test-utils';
import YToggleSwitch from './YToggleSwitch.vue';
import { i18n } from '.jest/vue-setup';


describe('YToggleSwitch', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YToggleSwitch, { i18n });
      expect(wrapper.is(YToggleSwitch)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YToggleSwitch, { i18n });
      expect(wrapper.is(YToggleSwitch)).toBe(true);
   });

});


