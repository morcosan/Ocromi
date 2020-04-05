import { mount, shallowMount } from '@vue/test-utils';
import YSliderRange from './YSliderRange.vue';
import { i18n } from '.jest/vue-setup';


describe('YSliderRange', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YSliderRange, { i18n });
      expect(wrapper.is(YSliderRange)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YSliderRange, { i18n });
      expect(wrapper.is(YSliderRange)).toBe(true);
   });

});


