import { mount, shallowMount } from '@vue/test-utils';
import YSlider from './YSlider.vue';
import { i18n } from '.jest/vue-setup';


describe('YSlider', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YSlider, { i18n });
      expect(wrapper.is(YSlider)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YSlider, { i18n });
      expect(wrapper.is(YSlider)).toBe(true);
   });

});


